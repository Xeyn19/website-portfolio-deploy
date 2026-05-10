import React from 'react'
import { Link } from 'react-router-dom'
import useSiteTheme from '../hooks/useSiteTheme'

const PageBackLink = ({ to = '/', label = 'Back to portfolio', currentLabel = '' }) => {
  const { classes, isDark } = useSiteTheme()

  return (
    <div
      className={`mb-6 rounded-2xl p-3 sm:mb-8 sm:p-4 ${
        isDark
          ? 'border border-slate-800/80 bg-slate-950/45'
          : 'border border-white/80 bg-white/70'
      } backdrop-blur-xl`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          to={to}
          className={`inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition sm:w-auto sm:justify-start ${classes.buttonGhost}`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isDark ? 'bg-slate-900 text-sky-300' : 'bg-sky-50 text-sky-700'
            }`}
            aria-hidden="true"
          >
            &larr;
          </span>
          <span>{label}</span>
        </Link>

        {currentLabel ? (
          <div className="flex min-w-0 items-center gap-2">
            <span className={`text-sm ${classes.textSubtle}`}>/</span>
            <span className={`min-w-0 break-words text-sm font-medium ${classes.heading}`}>{currentLabel}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PageBackLink
