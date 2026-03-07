import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useSiteTheme from '../hooks/useSiteTheme'

const navItems = [
  { to: '/resume', label: 'Resume' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, classes } = useSiteTheme()

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 px-4 pt-6 sm:px-6 lg:px-10">
      <div className={`mx-auto max-w-6xl rounded-[28px] ${classes.shell}`}>
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <NavLink to="/" onClick={closeMenu} className="min-w-0">
            <div className="flex flex-col">
              <span className={`text-lg font-semibold tracking-tight sm:text-xl ${classes.heading}`}>
                Edgar Orosa
              </span>
              <span className={`text-[11px] uppercase tracking-[0.28em] ${classes.label}`}>
                Full-Stack Developer
              </span>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? classes.navActive : classes.navMuted
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden ${classes.iconButton}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className={`border-t px-5 py-4 lg:hidden ${isDark ? 'border-slate-800/80' : 'border-slate-200/80'}`}>
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-medium transition ${
                      isActive ? classes.navActive : classes.navMuted
                    }`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar
