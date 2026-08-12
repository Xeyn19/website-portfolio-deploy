const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

const getSiteAssetHref = (assetPath = '') => {
  const normalizedPath = assetPath.toString().trim()

  if (!normalizedPath || /^(?:[a-z]+:)?\/\//i.test(normalizedPath) || normalizedPath.startsWith('data:')) {
    return normalizedPath
  }

  return `${basePath}${normalizedPath.replace(/^\/+/, '')}`
}

const resumePdfHref = `${basePath}resume-updated.pdf`

export { getSiteAssetHref, resumePdfHref }
