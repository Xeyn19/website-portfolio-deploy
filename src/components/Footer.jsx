import React from 'react'
import { Link } from 'react-router-dom'
import Email from '/email.png'
import Phone from '/phone-call.png'
import useSiteTheme from '../hooks/useSiteTheme'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { classes } = useSiteTheme()

  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className={`mx-auto max-w-[980px] rounded-2xl px-5 py-5 sm:px-7 ${classes.shell}`}>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr_auto] lg:items-start">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
              Portfolio
            </p>
            <p className={`mt-3 max-w-md text-[13px] leading-6 ${classes.textMuted}`}>
              Built around a single scrolling homepage with project case-study detail pages, direct
              resume access, skills, contact, and admin management screens.
            </p>
          </div>

          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
              Sections
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['about', 'experience', 'skills', 'projects', 'certificates', 'education', 'contact'].map((item) => (
                <Link
                  key={item}
                  to={`/#${item}`}
                  className={`rounded-full px-3 py-2 text-[13px] transition ${classes.buttonGhost}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
              Pages
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { href: '/Resume%20-%20updated_1.pdf', label: 'Resume PDF', external: true },
                { to: '/skills', label: 'Skills' },
                { to: '/contact', label: 'Contact' },
              ].map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full px-3 py-2 text-[13px] transition ${classes.buttonGhost}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-full px-3 py-2 text-[13px] transition ${classes.buttonGhost}`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`rounded-2xl px-4 py-4 ${classes.surfaceMuted}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                Phone
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Phone} alt="Phone icon" className="h-7 w-7 object-contain" />
                <p className={`text-[13px] ${classes.text}`}>+63 99 425 86519</p>
              </div>
            </div>

            <div className={`rounded-2xl px-4 py-4 ${classes.surfaceMuted}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                Email
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Email} alt="Email icon" className="h-7 w-7 object-contain" />
                <p className={`break-all text-[13px] ${classes.text}`}>edgarrodilorosa@gmail.com</p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl px-5 py-4 text-center lg:min-w-40 ${classes.panelDark}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300/90">
              Portfolio
            </p>
            <p className="mt-2 text-[13px] text-white">&copy; {currentYear} Edgar Orosa</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
