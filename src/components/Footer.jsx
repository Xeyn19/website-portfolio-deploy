import React from 'react'
import Email from '/email.png'
import Phone from '/phone-call.png'
import useSiteTheme from '../hooks/useSiteTheme'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { classes } = useSiteTheme()

  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className={`mx-auto max-w-6xl rounded-[28px] px-6 py-6 sm:px-8 ${classes.shell}`}>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
              Contact Details
            </p>
            <p className={`mt-3 max-w-md text-sm leading-6 ${classes.textMuted}`}>
              Available for project collaboration, and web development opportunities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`rounded-[22px] px-4 py-4 ${classes.surfaceMuted}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                Phone
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Phone} alt="Phone icon" className="h-7 w-7 object-contain" />
                <p className={`text-sm ${classes.text}`}>+63 99 425 86519</p>
              </div>
            </div>

            <div className={`rounded-[22px] px-4 py-4 ${classes.surfaceMuted}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                Email
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Email} alt="Email icon" className="h-7 w-7 object-contain" />
                <p className={`break-all text-sm ${classes.text}`}>edgarrodilorosa@gmail.com</p>
              </div>
            </div>
          </div>

          <div className={`rounded-[22px] px-5 py-4 text-center ${classes.panelDark}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300/90">
              Portfolio
            </p>
            <p className="mt-2 text-sm text-white">&copy; {currentYear} Edgar Orosa</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
