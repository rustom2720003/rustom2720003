import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from './portfolioData'

const REMARKS_STORAGE_KEY = 'rustom-portfolio-remarks'
const MAX_REMARKS = 12
const MAIL_SUBJECT_PREFIX = 'Portfolio remarks by '

const routeLabels = {
  '/': 'Overview',
  '/contact': 'Contact',
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/resume': 'Resume',
  '/skills': 'Skills',
}

const remarkMailTimestampFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function createRemarkId() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `remark-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function formatRouteLabel(pathname) {
  const fallbackLabel = pathname.replace('/', '').replaceAll('-', ' ')

  return routeLabels[pathname] ?? (fallbackLabel || 'Overview')
}

function normaliseStoredRemarks(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => {
      const path = typeof item.path === 'string' ? item.path : '/'
      const senderName =
        typeof item.senderName === 'string' ? item.senderName.trim() : 'Visitor'
      const message = typeof item.message === 'string' ? item.message.trim() : ''

      return {
        id: typeof item.id === 'string' ? item.id : createRemarkId(),
        senderName: senderName || 'Visitor',
        message,
        createdAt:
          typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
        path,
        pageLabel:
          typeof item.pageLabel === 'string' && item.pageLabel
            ? item.pageLabel
            : formatRouteLabel(path),
      }
    })
    .filter((item) => item.message.length > 0)
    .slice(0, MAX_REMARKS)
}

function readStoredRemarks() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(REMARKS_STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    return normaliseStoredRemarks(JSON.parse(storedValue))
  } catch {
    return []
  }
}

function writeStoredRemarks(remarks) {
  window.localStorage.setItem(REMARKS_STORAGE_KEY, JSON.stringify(remarks))
}

function buildMailtoHref({ senderName, message, pageLabel, pageUrl, createdAt }) {
  const subject = `${MAIL_SUBJECT_PREFIX}${senderName}`
  const body = [
    'Hi Rustom,',
    '',
    'You received a new portfolio remark.',
    '',
    `Name: ${senderName}`,
    `Page: ${pageLabel}`,
    `Submitted at: ${remarkMailTimestampFormatter.format(new Date(createdAt))}`,
    `Page URL: ${pageUrl}`,
    '',
    'Remark:',
    message,
  ].join('\n')

  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function useRemarks() {
  const location = useLocation()
  const [remarks, setRemarks] = useState(() => readStoredRemarks())
  const [senderName, setSenderNameValue] = useState('')
  const [draft, setDraftValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const setSenderName = (value) => {
    setSenderNameValue(value)

    if (statusMessage) {
      setStatusMessage('')
    }
  }

  const setDraft = (value) => {
    setDraftValue(value)

    if (statusMessage) {
      setStatusMessage('')
    }
  }

  const openPanel = () => setIsOpen(true)
  const closePanel = () => setIsOpen(false)
  const togglePanel = () => setIsOpen((current) => !current)
  const canWriteRemark = Boolean(senderName.trim())
  const canSubmitRemark = canWriteRemark && Boolean(draft.trim())

  const submitRemark = () => {
    const trimmedSenderName = senderName.trim()
    const message = draft.trim()

    if (!trimmedSenderName) {
      setStatusMessage('Please enter your name before adding a remark.')
      setIsOpen(true)
      return false
    }

    if (!message) {
      setStatusMessage('Please enter a remark before submitting.')
      setIsOpen(true)
      return false
    }

    const createdAt = new Date().toISOString()
    const pathname = location.pathname || '/'
    const pageLabel = formatRouteLabel(pathname)
    const remarkEntry = {
      id: createRemarkId(),
      senderName: trimmedSenderName,
      message,
      createdAt,
      path: pathname,
      pageLabel,
    }
    const nextRemarks = [
      remarkEntry,
      ...remarks,
    ].slice(0, MAX_REMARKS)

    try {
      writeStoredRemarks(nextRemarks)
      setRemarks(nextRemarks)
      setDraftValue('')
      setSenderNameValue(trimmedSenderName)
      setStatusMessage('Opening your email app with the remark details.')
    } catch {
      setStatusMessage('Opening your email app. Local save was not available.')
    }

    setIsOpen(true)

    if (typeof window !== 'undefined') {
      const mailtoHref = buildMailtoHref({
        senderName: trimmedSenderName,
        message,
        pageLabel,
        pageUrl: window.location.href,
        createdAt,
      })

      window.location.href = mailtoHref
    }

    return true
  }

  const remarksSummary = useMemo(
    () => ({
      remarks,
      remarksCount: remarks.length,
      storageLabel:
        'Saved locally in this browser using localStorage after submit.',
    }),
    [remarks],
  )

  return {
    ...remarksSummary,
    draft,
    isOpen,
    senderName,
    statusMessage,
    canWriteRemark,
    canSubmitRemark,
    setSenderName,
    setDraft,
    openPanel,
    closePanel,
    togglePanel,
    submitRemark,
  }
}
