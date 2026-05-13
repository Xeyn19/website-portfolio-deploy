import React, { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getTawkRouteContext } from '../data/tawkChatbotContent'

const TAWK_SCRIPT_ID = 'tawk-chat-widget-script'
const TAWK_SRC = 'https://embed.tawk.to/6a002f832bb6c91c30a83ab4/1jo8bj731'

const TawkChatWidget = () => {
  const { pathname, hash } = useLocation()
  const latestShouldShowRef = useRef(false)
  const lastContextKeyRef = useRef('')
  const lastTagKeyRef = useRef('')
  const widgetReadyRef = useRef(false)

  const isAdminPortfolioIndex = pathname === '/projects'
  const isLoginPage = pathname === '/login'
  const shouldShowChat = !isLoginPage && !isAdminPortfolioIndex

  latestShouldShowRef.current = shouldShowChat

  const activeSectionFromHash = hash.replace(/^#/, '').trim()

  const applyVisibility = useCallback(() => {
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
  }, [])

  const syncRouteContext = useCallback(() => {
    const api = window.Tawk_API

    if (!api || typeof api.setAttributes !== 'function') {
      return
    }

    const { attributes } = getTawkRouteContext(pathname)
    const nextAttributes = {
      ...attributes,
      'page-hash': hash || '',
      'portfolio-section': pathname === '/' && activeSectionFromHash
        ? activeSectionFromHash
        : attributes['portfolio-section'],
    }
    const nextContextKey = JSON.stringify(nextAttributes)

    if (lastContextKeyRef.current === nextContextKey) {
      return
    }

    api.setAttributes(nextAttributes, () => {})
    lastContextKeyRef.current = nextContextKey
  }, [activeSectionFromHash, hash, pathname])

  const syncRouteTags = useCallback(() => {
    const api = window.Tawk_API

    if (!api || typeof api.addTags !== 'function') {
      return
    }

    const { tags, pageType, portfolioSection } = getTawkRouteContext(pathname)
    const resolvedSection = pathname === '/' && activeSectionFromHash ? activeSectionFromHash : portfolioSection
    const nextTags = [...new Set(['portfolio-site', `page-type:${pageType}`, `section:${resolvedSection}`, ...tags])]
    const nextTagKey = nextTags.join('|')

    if (lastTagKeyRef.current === nextTagKey) {
      return
    }

    if (lastTagKeyRef.current && typeof api.removeTags === 'function') {
      api.removeTags(lastTagKeyRef.current.split('|'), () => {})
    }

    api.addTags(nextTags, () => {})
    lastTagKeyRef.current = nextTagKey
  }, [activeSectionFromHash, pathname])

  const addNavigationEvent = useCallback(() => {
    const api = window.Tawk_API

    if (!api || typeof api.addEvent !== 'function') {
      return
    }

    const { pageType, pageLabel, portfolioSection } = getTawkRouteContext(pathname)
    const resolvedSection = pathname === '/' && activeSectionFromHash ? activeSectionFromHash : portfolioSection

    api.addEvent(
      'portfolio_navigation',
      {
        pagePath: pathname,
        pageHash: hash || '',
        pageType,
        pageLabel,
        portfolioSection: resolvedSection,
      },
      () => {},
    )
  }, [activeSectionFromHash, hash, pathname])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const existingScript = document.getElementById(TAWK_SCRIPT_ID)
    const handleWidgetReady = () => {
      widgetReadyRef.current = true
      applyVisibility()
      syncRouteContext()
      syncRouteTags()
      addNavigationEvent()
    }

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_API.onLoad = handleWidgetReady
    window.Tawk_API.onChatMaximized = function () {
      if (typeof window.Tawk_API?.addEvent === 'function') {
        window.Tawk_API.addEvent(
          'portfolio_chat_opened',
          {
            pagePath: pathname,
            pageHash: hash || '',
          },
          () => {},
        )
      }
    }

    if (!shouldShowChat) {
      applyVisibility()
      return
    }

    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date()

    if (existingScript) {
      applyVisibility()
      if (widgetReadyRef.current || typeof window.Tawk_API.setAttributes === 'function') {
        syncRouteContext()
        syncRouteTags()
        addNavigationEvent()
      }
      return
    }

    const script = document.createElement('script')
    const firstScript = document.getElementsByTagName('script')[0]

    script.id = TAWK_SCRIPT_ID
    script.async = true
    script.src = TAWK_SRC
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
      return
    }

    document.head.appendChild(script)
  }, [addNavigationEvent, applyVisibility, hash, pathname, shouldShowChat, syncRouteContext, syncRouteTags])

  return null
}

export default TawkChatWidget
