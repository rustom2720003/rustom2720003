import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const REMARKS_STORAGE_KEY = 'rustom-portfolio-remarks'
const MAX_REMARKS = 12

const routeLabels = {
  '/': 'Overview',
  '/contact': 'Contact',
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/resume': 'Resume',
  '/skills': 'Skills',
}

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
      const message = typeof item.message === 'string' ? item.message.trim() : ''

      return {
        id: typeof item.id === 'string' ? item.id : createRemarkId(),
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

export function useRemarks() {
  const location = useLocation()
  const [remarks, setRemarks] = useState(() => readStoredRemarks())
  const [draft, setDraftValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const setDraft = (value) => {
    setDraftValue(value)

    if (statusMessage) {
      setStatusMessage('')
    }
  }

  const openPanel = () => setIsOpen(true)
  const closePanel = () => setIsOpen(false)
  const togglePanel = () => setIsOpen((current) => !current)

  const submitRemark = () => {
    const message = draft.trim()

    if (!message) {
      setStatusMessage('Please enter a remark before submitting.')
      setIsOpen(true)
      return false
    }

    const pathname = location.pathname || '/'
    const nextRemarks = [
      {
        id: createRemarkId(),
        message,
        createdAt: new Date().toISOString(),
        path: pathname,
        pageLabel: formatRouteLabel(pathname),
      },
      ...remarks,
    ].slice(0, MAX_REMARKS)

    try {
      writeStoredRemarks(nextRemarks)
      setRemarks(nextRemarks)
      setDraftValue('')
      setStatusMessage('Remark saved in this browser.')
      setIsOpen(true)
      return true
    } catch {
      setStatusMessage('Unable to save the remark right now.')
      setIsOpen(true)
      return false
    }
  }

  const remarksSummary = useMemo(
    () => ({
      remarks,
      remarksCount: remarks.length,
      storageLabel: 'Saved locally in this browser using localStorage.',
    }),
    [remarks],
  )

  return {
    ...remarksSummary,
    draft,
    isOpen,
    statusMessage,
    setDraft,
    openPanel,
    closePanel,
    togglePanel,
    submitRemark,
  }
}
