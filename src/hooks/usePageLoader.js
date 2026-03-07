import { useEffect, useState } from 'react'

const usePageLoader = (delay = 1000) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(false)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [delay])

  return loading
}

export default usePageLoader
