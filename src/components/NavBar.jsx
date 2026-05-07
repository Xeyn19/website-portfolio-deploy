import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuMoon, LuSun } from 'react-icons/lu'
import useSiteTheme from '../hooks/useSiteTheme'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
]

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [isVisible, setIsVisible] = useState(true)
  const { isDark, theme, handleTheme, classes } = useSiteTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const ThemeIcon = isDark ? LuSun : LuMoon

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (sectionId) => {
    closeMenu()

    if (!isHome) {
      navigate(`/#${sectionId}`)
      return
    }

    const element = document.getElementById(sectionId)
    if (!element) {
      return
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `/#${sectionId}`)
  }

  const scrollToTop = () => {
    closeMenu()

    if (!isHome) {
      navigate('/')
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', '/')
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isHome) {
      return
    }

    const scrollFromHash = () => {
      const sectionId = location.hash.replace('#', '')

      if (!sectionId) {
        return
      }

      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const frameId = window.requestAnimationFrame(scrollFromHash)
    return () => window.cancelAnimationFrame(frameId)
  }, [isHome, location.hash])

  useEffect(() => {
    if (!isHome) {
      setActiveSection('')
      return
    }

    const updateActiveSection = () => {
      const offset = 180
      let currentSection = 'about'

      navItems.forEach(({ id }) => {
        const element = document.getElementById(id)

        if (element && element.getBoundingClientRect().top <= offset) {
          currentSection = id
        }
      })

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [isHome])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 24) {
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateHeaderVisibility)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-transform duration-300 sm:px-6 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-[980px]">
        <div className={`rounded-[30px] ${classes.shell}`}>
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={scrollToTop}
              className={`hidden h-12 w-12 items-center justify-center rounded-full text-sm font-semibold lg:inline-flex ${classes.surfaceMuted} ${classes.heading}`}
              aria-label="Scroll to top"
            >
              EO
            </button>

            <nav className={`hidden items-center gap-1 rounded-full px-1.5 py-1 lg:flex ${classes.surfaceMuted}`}>
              {navItems.map((item) => {
                const isActive = isHome && activeSection === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                      isActive ? classes.navActive : classes.navMuted
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTheme}
                className={`hidden h-12 w-12 items-center justify-center rounded-full transition lg:inline-flex ${classes.iconButton}`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
              >
                <ThemeIcon className="h-4.5 w-4.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={`hidden rounded-full px-5 py-3 text-[13px] font-medium transition lg:inline-flex ${classes.buttonGhost}`}
              >
                Let&apos;s work
              </button>

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
          </div>

          {isOpen && (
            <div className={`border-t px-5 py-4 lg:hidden ${isDark ? 'border-slate-800/80' : 'border-slate-200/80'}`}>
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-2xl px-4 py-3 text-left text-base font-medium transition ${
                      isHome && activeSection === item.id ? classes.navActive : classes.navMuted
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  to="/resume"
                  onClick={closeMenu}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-medium transition ${classes.buttonGhost}`}
                >
                  Resume
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-medium transition ${classes.buttonGhost}`}
                >
                  Admin
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-medium transition ${classes.buttonGhost}`}
                >
                  Let&apos;s work
                </button>
              </div>

              <button
                type="button"
                onClick={handleTheme}
                className={`mt-4 flex items-center justify-between rounded-2xl px-4 py-3 transition ${classes.surfaceMuted}`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
              >
                <span className={`text-sm ${classes.text}`}>Theme</span>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${classes.iconButton}`}>
                  <ThemeIcon className="h-4.5 w-4.5" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
