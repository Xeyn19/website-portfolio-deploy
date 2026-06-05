import reactIconsManifest from '../data/reactIconsManifest'
import { searchableReactIconPacks } from './reactIconsLibrary'

const preferredSkillIconAliases = {
  expressjs: 'si:SiExpress',
  'express js': 'si:SiExpress',
  'material ui': 'si:SiMui',
  mui: 'si:SiMui',
  'mysql workbench': 'si:SiMysql',
  'next js': 'si:SiNextdotjs',
  nextjs: 'si:SiNextdotjs',
  'node js': 'si:SiNodedotjs',
  nodejs: 'si:SiNodedotjs',
  postman: 'si:SiPostman',
  reactjs: 'si:SiReact',
  'react js': 'si:SiReact',
  'shadcn ui': 'si:SiShadcnui',
  shadcnui: 'si:SiShadcnui',
  'tailwind css': 'si:SiTailwindcss',
  'typescript js': 'si:SiTypescript',
  'visual studio code': 'tb:TbBrandVscode',
  'vs code': 'tb:TbBrandVscode',
  vscode: 'tb:TbBrandVscode',
}

export const normalizeReactIconSearchValue = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getReactIconEntrySearchCandidates = (entry = {}) => {
  const normalizedValues = [
    entry.id,
    entry.iconName,
    entry.label,
    entry.pack,
    entry.packLabel,
    ...(entry.keywords ?? []),
  ]
    .map(normalizeReactIconSearchValue)
    .filter(Boolean)

  return [...new Set(normalizedValues)]
}

const getReactIconQueryTokens = (query = '') => normalizeReactIconSearchValue(query).split(' ').filter(Boolean)

const getReactIconSearchScore = (entry, query) => {
  const normalizedQuery = normalizeReactIconSearchValue(query)

  if (!normalizedQuery) {
    return 1
  }

  const compressedQuery = normalizedQuery.replace(/\s+/g, '')
  const queryTokens = normalizedQuery.split(' ').filter(Boolean)
  let bestScore = 0

  getReactIconEntrySearchCandidates(entry).forEach((candidate) => {
    const compressedCandidate = candidate.replace(/\s+/g, '')

    if (candidate === normalizedQuery || compressedCandidate === compressedQuery) {
      bestScore = Math.max(bestScore, 1000)
      return
    }

    if (candidate.startsWith(normalizedQuery)) {
      bestScore = Math.max(bestScore, 860)
    }

    if (
      candidate.includes(normalizedQuery) ||
      compressedCandidate.includes(compressedQuery) ||
      normalizedQuery.includes(candidate) ||
      compressedQuery.includes(compressedCandidate)
    ) {
      bestScore = Math.max(bestScore, 700)
    }

    const matchedTokens = queryTokens.filter(
      (token) => candidate.includes(token) || compressedCandidate.includes(token.replace(/\s+/g, '')),
    )

    if (matchedTokens.length === queryTokens.length && matchedTokens.length > 0) {
      bestScore = Math.max(bestScore, 520 + matchedTokens.length * 35)
      return
    }

    if (matchedTokens.length > 0) {
      bestScore = Math.max(bestScore, 260 + matchedTokens.length * 45)
    }
  })

  return bestScore
}

const buildRankedReactIconMatches = (query = '') => {
  const normalizedQuery = normalizeReactIconSearchValue(query)

  if (!normalizedQuery) {
    return []
  }

  return reactIconsManifest
    .map((entry) => ({
      ...entry,
      score: getReactIconSearchScore(entry, normalizedQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return left.label.localeCompare(right.label)
    })
}

const isReactIconFullTokenMatch = (entry, query) => {
  const queryTokens = getReactIconQueryTokens(query)

  if (!queryTokens.length) {
    return false
  }

  return getReactIconEntrySearchCandidates(entry).some((candidate) =>
    queryTokens.every((token) => candidate.includes(token)),
  )
}

const stripReactIconScore = (entry = {}) => {
  const strippedEntry = { ...entry }
  delete strippedEntry.score
  return strippedEntry
}

export const defaultReactIconResults = reactIconsManifest.slice(0, 60)

export const getReactIconManifestEntry = (iconId = '') =>
  reactIconsManifest.find((entry) => entry.id === iconId) ?? null

export const searchReactIcons = (query = '', { limit = 60 } = {}) => {
  const normalizedQuery = normalizeReactIconSearchValue(query)

  if (!normalizedQuery) {
    return {
      bestMatch: null,
      exactMatch: null,
      hasExactMatch: true,
      matches: defaultReactIconResults,
      total: reactIconsManifest.length,
    }
  }

  const rankedMatches = buildRankedReactIconMatches(normalizedQuery)
  const exactMatchEntry =
    rankedMatches.find((entry) => getReactIconEntrySearchCandidates(entry).includes(normalizedQuery)) ?? null
  const exactMatch = exactMatchEntry ? stripReactIconScore(exactMatchEntry) : null
  const limitedMatches = rankedMatches.slice(0, limit).map(stripReactIconScore)

  return {
    bestMatch: limitedMatches[0] ?? null,
    exactMatch,
    hasExactMatch: Boolean(exactMatch),
    matches: limitedMatches,
    total: rankedMatches.length,
  }
}

export const resolveSkillIconFromName = (name = '') => {
  const normalizedName = normalizeReactIconSearchValue(name)

  if (!normalizedName) {
    return {
      entry: null,
      isStrongMatch: false,
      matchType: 'empty',
      normalizedQuery: '',
    }
  }

  const aliasedIconId = preferredSkillIconAliases[normalizedName]

  if (aliasedIconId) {
    return {
      entry: getReactIconManifestEntry(aliasedIconId),
      isStrongMatch: true,
      matchType: 'alias',
      normalizedQuery: normalizedName,
    }
  }

  const rankedMatches = buildRankedReactIconMatches(normalizedName)
  const bestMatch = rankedMatches[0] ?? null

  if (!bestMatch) {
    return {
      entry: null,
      isStrongMatch: false,
      matchType: 'none',
      normalizedQuery: normalizedName,
    }
  }

  const hasExactMatch = getReactIconEntrySearchCandidates(bestMatch).includes(normalizedName)

  if (hasExactMatch) {
    return {
      entry: stripReactIconScore(bestMatch),
      isStrongMatch: true,
      matchType: 'exact',
      normalizedQuery: normalizedName,
    }
  }

  if (isReactIconFullTokenMatch(bestMatch, normalizedName)) {
    return {
      entry: stripReactIconScore(bestMatch),
      isStrongMatch: true,
      matchType: 'token',
      normalizedQuery: normalizedName,
    }
  }

  return {
    entry: stripReactIconScore(bestMatch),
    isStrongMatch: false,
    matchType: 'weak',
    normalizedQuery: normalizedName,
  }
}

export const searchableReactIconPackLabels = searchableReactIconPacks.join(', ')
