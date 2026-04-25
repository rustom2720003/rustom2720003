import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ANALYTICS_STORAGE_KEY = 'rustom-portfolio-visitor-analytics'
const SESSION_STORAGE_KEY = 'rustom-portfolio-visitor-session'
const LAST_TRACKED_VIEW_KEY = 'rustom-portfolio-last-tracked-view'

const routeLabels = {
  '/': 'Overview',
  '/contact': 'Contact',
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/resume': 'Resume',
  '/skills': 'Skills',
}

function buildDefaultAnalytics() {
  return {
    totalVisits: 0,
    totalPageViews: 0,
    firstVisitedAt: '',
    lastVisitedAt: '',
    pageViews: {},
    recentViews: [],
  }
}

function normaliseAnalytics(value) {
  if (!value || typeof value !== 'object') {
    return buildDefaultAnalytics()
  }

  return {
    totalVisits:
      typeof value.totalVisits === 'number' && value.totalVisits >= 0
        ? value.totalVisits
        : 0,
    totalPageViews:
      typeof value.totalPageViews === 'number' && value.totalPageViews >= 0
        ? value.totalPageViews
        : 0,
    firstVisitedAt: typeof value.firstVisitedAt === 'string' ? value.firstVisitedAt : '',
    lastVisitedAt: typeof value.lastVisitedAt === 'string' ? value.lastVisitedAt : '',
    pageViews:
      value.pageViews && typeof value.pageViews === 'object' ? value.pageViews : {},
    recentViews: Array.isArray(value.recentViews) ? value.recentViews : [],
  }
}

function readAnalytics() {
  if (typeof window === 'undefined') {
    return buildDefaultAnalytics()
  }

  try {
    const storedValue = window.localStorage.getItem(ANALYTICS_STORAGE_KEY)

    if (!storedValue) {
      return buildDefaultAnalytics()
    }

    return normaliseAnalytics(JSON.parse(storedValue))
  } catch {
    return buildDefaultAnalytics()
  }
}

function writeAnalytics(analytics) {
  window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics))
}

function formatRouteLabel(pathname) {
  const fallbackLabel = pathname.replace('/', '').replaceAll('-', ' ')

  return routeLabels[pathname] ?? (fallbackLabel || 'Overview')
}

function shouldSkipDuplicateTrack(locationKey, pathname) {
  try {
    const now = Date.now()
    const rawValue = window.sessionStorage.getItem(LAST_TRACKED_VIEW_KEY)
    const parsedValue = rawValue ? JSON.parse(rawValue) : null
    const isDuplicate =
      parsedValue &&
      parsedValue.key === locationKey &&
      parsedValue.pathname === pathname &&
      now - parsedValue.trackedAt < 900

    if (!isDuplicate) {
      window.sessionStorage.setItem(
        LAST_TRACKED_VIEW_KEY,
        JSON.stringify({
          key: locationKey,
          pathname,
          trackedAt: now,
        }),
      )
    }

    return Boolean(isDuplicate)
  } catch {
    return false
  }
}

function buildTimestampLabel(value) {
  if (!value) {
    return 'Not available yet'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function useVisitorAnalytics() {
  const location = useLocation()
  const [visitorAnalytics, setVisitorAnalytics] = useState(() => readAnalytics())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const pathname = location.pathname || '/'
    const locationKey = location.key || pathname

    if (shouldSkipDuplicateTrack(locationKey, pathname)) {
      return
    }

    const nowIso = new Date().toISOString()
    const storedAnalytics = readAnalytics()
    const hasActiveSession = window.sessionStorage.getItem(SESSION_STORAGE_KEY) === 'active'

    const nextAnalytics = {
      ...storedAnalytics,
      totalVisits: hasActiveSession
        ? storedAnalytics.totalVisits
        : storedAnalytics.totalVisits + 1,
      totalPageViews: storedAnalytics.totalPageViews + 1,
      firstVisitedAt: storedAnalytics.firstVisitedAt || nowIso,
      lastVisitedAt: nowIso,
      pageViews: {
        ...storedAnalytics.pageViews,
        [pathname]: (storedAnalytics.pageViews[pathname] ?? 0) + 1,
      },
      recentViews: [
        {
          path: pathname,
          label: formatRouteLabel(pathname),
          viewedAt: nowIso,
        },
        ...storedAnalytics.recentViews.filter((item) => item?.path !== pathname),
      ].slice(0, 5),
    }

    if (!hasActiveSession) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'active')
    }

    writeAnalytics(nextAnalytics)
    setVisitorAnalytics(nextAnalytics)
  }, [location.key, location.pathname])

  const analyticsSummary = useMemo(() => {
    const pageViewsEntries = Object.entries(visitorAnalytics.pageViews)
      .map(([path, views]) => ({
        path,
        label: formatRouteLabel(path),
        views,
      }))
      .sort((left, right) => right.views - left.views)

    const topPage = pageViewsEntries[0]

    return {
      ...visitorAnalytics,
      firstVisitedLabel: buildTimestampLabel(visitorAnalytics.firstVisitedAt),
      lastVisitedLabel: buildTimestampLabel(visitorAnalytics.lastVisitedAt),
      topPageLabel: topPage ? topPage.label : 'No page views yet',
      topPageViews: topPage ? topPage.views : 0,
      pageViewsEntries,
      storedInLabel: 'Stored locally in this browser using localStorage.',
    }
  }, [visitorAnalytics])

  return analyticsSummary
}
