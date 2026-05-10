import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useAdminAuth from '../hooks/useAdminAuth'

const TAWK_SCRIPT_ID = 'tawk-chat-widget-script'
const TAWK_SRC = 'https://embed.tawk.to/6a002f832bb6c91c30a83ab4/1jo8bj731'

const TawkChatWidget = () => {
  const { pathname } = useLocation()
  const { isAdmin, loading } = useAdminAuth()
  const latestShouldShowRef = useRef(false)

  const isProjectsIndex = pathname === '/projects'
  const isLoginPage = pathname === '/login'
  const shouldShowChat = !isLoginPage && !(isProjectsIndex && (loading || isAdmin))

  latestShouldShowRef.current = shouldShowChat

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const applyVisibility = () => {
      const api = window.Tawk_API

      if (!api) {
        return
      }

      if (latestShouldShowRef.current) {
        if (typeof api.showWidget === 'function') {
          api.showWidget()
        }
        return
      }

      if (typeof api.hideWidget === 'function') {
        api.hideWidget()
      }
    }

    const existingScript = document.getElementById(TAWK_SCRIPT_ID)

    if (!shouldShowChat) {
      applyVisibility()
      return
    }

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date()

    if (existingScript) {
      applyVisibility()
      return
    }

    const script = document.createElement('script')
    const firstScript = document.getElementsByTagName('script')[0]

    script.id = TAWK_SCRIPT_ID
    script.async = true
    script.src = TAWK_SRC
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    script.onload = applyVisibility

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
      return
    }

    document.head.appendChild(script)
  }, [shouldShowChat])

  return null
}

export default TawkChatWidget
