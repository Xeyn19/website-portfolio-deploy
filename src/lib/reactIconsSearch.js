import reactIconsManifest from '../data/reactIconsManifest'
import { searchableReactIconPacks } from './reactIconsLibrary'

const normalizeReactIconSearchValue = (value = '') =>
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

  const rankedMatches = reactIconsManifest
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

  const exactMatch =
    rankedMatches.find((entry) => getReactIconEntrySearchCandidates(entry).includes(normalizedQuery)) ?? null
  const limitedMatches = rankedMatches.slice(0, limit).map(({ score, ...entry }) => entry)

  return {
    bestMatch: limitedMatches[0] ?? null,
    exactMatch,
    hasExactMatch: Boolean(exactMatch),
    matches: limitedMatches,
    total: rankedMatches.length,
  }
}

export const searchableReactIconPackLabels = searchableReactIconPacks.join(', ')
