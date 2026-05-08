import React, { useEffect, useMemo, useState } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'

const githubContributionDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

const currentCalendarYear = new Date().getFullYear()
const pollingIntervalMs = 1000 * 60
const fallbackApiBaseUrl = 'https://github-contributions-api.jogruber.de/v4/'
const millisecondsPerDay = 24 * 60 * 60 * 1000

const normalizeContribution = (activity = {}) => ({
  date: activity.date,
  count: Number(activity.count ?? 0),
  level: Number(activity.level ?? 0),
})

const getIsoDateString = (value) => value.toISOString().slice(0, 10)

const buildYearContributionRange = (year, activities) => {
  const activityMap = new Map(activities.map((activity) => [activity.date, activity]))
  const normalizedActivities = []
  const cursor = new Date(Date.UTC(year, 0, 1))
  const endDate = new Date(Date.UTC(year, 11, 31))

  while (cursor <= endDate) {
    const date = getIsoDateString(cursor)
    normalizedActivities.push(
      activityMap.get(date) ?? {
        date,
        count: 0,
        level: 0,
      },
    )
    cursor.setTime(cursor.getTime() + millisecondsPerDay)
  }

  return normalizedActivities
}

const normalizeContributionPayload = (payload = {}) => {
  const rawContributions = Array.isArray(payload.contributions)
    ? payload.contributions.map(normalizeContribution)
    : []
  const payloadYear = Number.parseInt(payload.year ?? '', 10)
  const contributions = Number.isInteger(payloadYear)
    ? buildYearContributionRange(payloadYear, rawContributions)
    : rawContributions

  return {
    contributions,
    source: payload.source ?? null,
  }
}

const fetchGitHubContributionPayload = async ({ username, year, signal }) => {
  const encodedUsername = encodeURIComponent(username)
  const encodedYear = encodeURIComponent(String(year))
  const fetchFallbackPayload = async () => {
    const fallbackResponse = await fetch(`${fallbackApiBaseUrl}${encodedUsername}?y=${encodedYear}`, {
      signal,
      cache: 'no-store',
      headers: {
        accept: 'application/json',
      },
    })

    if (!fallbackResponse.ok) {
      throw new Error(`GitHub contribution fallback returned ${fallbackResponse.status}.`)
    }

    return normalizeContributionPayload({
      ...(await fallbackResponse.json()),
      year,
      source: 'public-fallback',
    })
  }

  try {
    const response = await fetch(`/api/github-contributions?username=${encodedUsername}&year=${encodedYear}`, {
      signal,
      cache: 'no-store',
      headers: {
        accept: 'application/json',
      },
    })

    if (response.ok) {
      const contentType = response.headers.get('content-type') ?? ''

      if (!contentType.includes('application/json')) {
        return fetchFallbackPayload()
      }

      return normalizeContributionPayload({
        ...(await response.json()),
        year,
      })
    }

    if (response.status !== 404) {
      const errorPayload = await response.json().catch(() => null)
      throw new Error(
        errorPayload?.error ?? `GitHub contribution function returned ${response.status}.`,
      )
    }
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }

    return fetchFallbackPayload()
  }

  return fetchFallbackPayload()
}

const GitHubContributionCalendar = ({
  username,
  year,
  className,
  colorScheme,
  blockSize,
  blockMargin,
  fontSize,
  showWeekdayLabels,
  theme,
  labels,
  errorMessage,
}) => {
  const [contributions, setContributions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [dataSource, setDataSource] = useState(null)
  const isCurrentYear = year === currentCalendarYear

  useEffect(() => {
    let isCancelled = false
    let activeRequest = null

    const loadContributions = async ({ isBackground = false } = {}) => {
      if (!isBackground) {
        setIsLoading(true)
      }

      activeRequest?.abort()
      const controller = new AbortController()
      activeRequest = controller

      try {
        const payload = await fetchGitHubContributionPayload({
          username,
          year,
          signal: controller.signal,
        })

        if (isCancelled || controller.signal.aborted) {
          return
        }

        setContributions(payload.contributions)
        setDataSource(payload.source)
        setError('')
      } catch (fetchError) {
        if (isCancelled || controller.signal.aborted) {
          return
        }

        if (!isBackground) {
          setContributions([])
        }

        setError(errorMessage)
      } finally {
        if (!isCancelled && !controller.signal.aborted && !isBackground) {
          setIsLoading(false)
        }
      }
    }

    loadContributions()

    if (!isCurrentYear) {
      return () => {
        isCancelled = true
        activeRequest?.abort()
      }
    }

    const pollContributions = () => {
      void loadContributions({ isBackground: true })
    }

    const intervalId = window.setInterval(pollContributions, pollingIntervalMs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        pollContributions()
      }
    }
    const handleWindowFocus = () => {
      pollContributions()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleWindowFocus)

    return () => {
      isCancelled = true
      activeRequest?.abort()
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [errorMessage, isCurrentYear, username, year])

  const calendarLabels = useMemo(
    () => ({
      totalCount: '{{count}} contributions in {{year}}',
      ...labels,
    }),
    [labels],
  )

  if (error && contributions.length === 0) {
    return <div className={className}>{error}</div>
  }

  return (
    <div className={`${className} min-w-max`} data-source={dataSource ?? undefined}>
      <ActivityCalendar
        data={contributions}
        loading={isLoading && contributions.length === 0}
        colorScheme={colorScheme}
        blockSize={blockSize}
        blockMargin={blockMargin}
        fontSize={fontSize}
        showWeekdayLabels={showWeekdayLabels}
        theme={theme}
        labels={calendarLabels}
        maxLevel={4}
        tooltips={{
          activity: {
            text: (activity) =>
              `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${githubContributionDateFormatter.format(new Date(activity.date))}`,
          },
        }}
      />
    </div>
  )
}

export default GitHubContributionCalendar
