const contributionLevelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const createJsonResponse = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'cache-control': 'no-store, max-age=0',
      'content-type': 'application/json; charset=utf-8',
    },
  })

const buildYearRange = (year) => {
  const currentYear = new Date().getUTCFullYear()
  const from = `${year}-01-01T00:00:00Z`
  const to =
    year === currentYear
      ? new Date().toISOString()
      : `${year}-12-31T23:59:59Z`

  return { from, to }
}

const contributionCalendarQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    viewer {
      login
    }
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        hasAnyRestrictedContributions
        restrictedContributionsCount
        earliestRestrictedContributionDate
        latestRestrictedContributionDate
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

export async function handleGitHubContributions(request, env = process.env) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')?.trim()
  const year = Number.parseInt(searchParams.get('year') ?? '', 10)

  if (!username || !Number.isInteger(year)) {
    return createJsonResponse(
      { error: 'Missing or invalid username/year query parameters.' },
      400,
    )
  }

  const githubToken =
    env.GITHUB_CLASSIC_TOKEN ??
    env.GITHUB_READ_TOKEN ??
    env.GITHUB_TOKEN

  if (!githubToken) {
    return createJsonResponse(
      { error: 'Missing GITHUB_READ_TOKEN, GITHUB_CLASSIC_TOKEN, or GITHUB_TOKEN server environment variable.' },
      503,
    )
  }

  const { from, to } = buildYearRange(year)
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${githubToken}`,
      'content-type': 'application/json',
      'user-agent': 'portfolio-github-calendar',
    },
    body: JSON.stringify({
      query: contributionCalendarQuery,
      variables: {
        login: username,
        from,
        to,
      },
    }),
    cache: 'no-store',
  })

  const payload = await response.json()
  const apiErrors = Array.isArray(payload.errors) ? payload.errors : []

  if (!response.ok || apiErrors.length > 0) {
    return createJsonResponse(
      {
        error:
          apiErrors[0]?.message ??
          `GitHub GraphQL request failed with status ${response.status}.`,
      },
      response.ok ? 502 : response.status,
    )
  }

  const viewerLogin = payload.data?.viewer?.login ?? null
  const contributionsCollection = payload.data?.user?.contributionsCollection
  const contributionCalendar = contributionsCollection?.contributionCalendar

  if (!contributionCalendar) {
    return createJsonResponse(
      { error: `Contribution calendar for "${username}" was not returned by GitHub.` },
      404,
    )
  }

  const contributions = contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: contributionLevelMap[day.contributionLevel] ?? 0,
    })),
  )

  return createJsonResponse({
    source: 'github-graphql',
    diagnostics: {
      viewerLogin,
      tokenMatchesUser:
        typeof viewerLogin === 'string' &&
        viewerLogin.toLowerCase() === username.toLowerCase(),
      hasAnyRestrictedContributions:
        contributionsCollection?.hasAnyRestrictedContributions ?? false,
      restrictedContributionsCount:
        contributionsCollection?.restrictedContributionsCount ?? 0,
      earliestRestrictedContributionDate:
        contributionsCollection?.earliestRestrictedContributionDate ?? null,
      latestRestrictedContributionDate:
        contributionsCollection?.latestRestrictedContributionDate ?? null,
    },
    total: {
      count: contributionCalendar.totalContributions,
      year,
    },
    contributions,
  })
}

export async function GET(request) {
  return handleGitHubContributions(request, process.env)
}
