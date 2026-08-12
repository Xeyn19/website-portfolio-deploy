const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`
const resumePdfHref = `${basePath}resume-updated.pdf`

export { resumePdfHref }
