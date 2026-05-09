import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const useSiteTheme = () => {
  const { theme, handleTheme, isThemeSwitching } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const themeTransition = 'transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-200 ease-out'

  return {
    theme,
    isDark,
    handleTheme,
    isThemeSwitching,
    classes: {
      appBackground: isDark
        ? `site-app-background site-app-background--dark text-slate-100 ${themeTransition}`
        : `site-app-background site-app-background--light text-slate-900 ${themeTransition}`,
      pageBackground: isDark
        ? 'site-page-background site-page-background--dark'
        : 'site-page-background site-page-background--light',
      shell: isDark
        ? `border border-slate-800/72 bg-[linear-gradient(180deg,_rgba(8,15,28,0.56),_rgba(6,12,24,0.68))] shadow-[0_18px_40px_rgba(2,6,23,0.26)] backdrop-blur-xl ${themeTransition}`
        : `border border-white/82 bg-[linear-gradient(180deg,_rgba(255,255,255,0.72),_rgba(248,250,252,0.82))] shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl ${themeTransition}`,
      panelDark: isDark
        ? `bg-[linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#1e293b_100%)] text-white shadow-[0_14px_30px_rgba(2,6,23,0.32)] ${themeTransition}`
        : `bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] ${themeTransition}`,
      panelSoft: isDark
        ? `border border-slate-800/80 bg-[linear-gradient(135deg,_rgba(30,41,59,0.9),_rgba(15,23,42,0.9))] shadow-[0_14px_30px_rgba(2,6,23,0.22)] ${themeTransition}`
        : `border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(239,246,255,0.96),_rgba(255,255,255,0.98))] shadow-[0_14px_30px_rgba(148,163,184,0.08)] ${themeTransition}`,
      surface: isDark
        ? `border border-slate-800/90 bg-slate-900/86 shadow-[0_14px_28px_rgba(2,6,23,0.2)] ${themeTransition}`
        : `border border-slate-200 bg-white shadow-[0_14px_28px_rgba(15,23,42,0.05)] ${themeTransition}`,
      surfaceMuted: isDark
        ? `border border-slate-800/90 bg-[linear-gradient(180deg,_rgba(15,23,42,0.78),_rgba(2,6,23,0.74))] ${themeTransition}`
        : `border border-slate-200 bg-[linear-gradient(180deg,_#ffffff,_#f8fafc)] ${themeTransition}`,
      surfaceAccent: isDark
        ? `bg-[linear-gradient(135deg,_rgba(30,41,59,0.94),_rgba(15,23,42,0.98))] ${themeTransition}`
        : `bg-[linear-gradient(135deg,_#eff6ff_0%,_#ffffff_55%,_#f0f9ff_100%)] ${themeTransition}`,
      darkTile: isDark
        ? 'border border-white/8 bg-white/6'
        : 'border border-white/10 bg-white/6',
      darkFrame: isDark
        ? 'bg-white/6 ring-1 ring-white/8'
        : 'bg-white/8 ring-1 ring-white/10',
      darkChip: isDark
        ? 'border border-white/8 bg-white/8 text-slate-200'
        : 'border border-white/10 bg-white/10 text-slate-100',
      heading: isDark ? `text-slate-50 ${themeTransition}` : `text-slate-900 ${themeTransition}`,
      text: isDark ? `text-slate-300 ${themeTransition}` : `text-slate-700 ${themeTransition}`,
      textMuted: isDark ? `text-slate-400 ${themeTransition}` : `text-slate-600 ${themeTransition}`,
      textSubtle: isDark ? `text-slate-500 ${themeTransition}` : `text-slate-500 ${themeTransition}`,
      textOnDark: 'text-slate-300',
      label: isDark ? `text-sky-300 ${themeTransition}` : `text-sky-700 ${themeTransition}`,
      labelMuted: isDark ? `text-slate-400 ${themeTransition}` : `text-slate-500 ${themeTransition}`,
      navMuted: isDark
        ? `text-slate-300 hover:bg-white/6 hover:text-sky-300 ${themeTransition}`
        : `text-slate-600 hover:bg-sky-50 hover:text-sky-700 ${themeTransition}`,
      navActive: isDark
        ? `bg-sky-400 text-slate-950 shadow-[0_8px_18px_rgba(56,189,248,0.18)] ${themeTransition}`
        : `bg-sky-600 text-white shadow-[0_8px_18px_rgba(14,165,233,0.16)] ${themeTransition}`,
      iconButton: isDark
        ? `border border-slate-800 bg-slate-950/80 text-slate-200 shadow-[0_8px_18px_rgba(2,6,23,0.18)] hover:border-sky-300 hover:bg-white/6 hover:text-sky-300 ${themeTransition}`
        : `border border-slate-200 bg-white text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.06)] hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 ${themeTransition}`,
      socialPill: isDark
        ? `border border-slate-800 bg-slate-950/80 shadow-[0_8px_18px_rgba(2,6,23,0.14)] hover:border-sky-300 hover:bg-white/4 ${themeTransition}`
        : `border border-slate-200 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)] hover:border-sky-400 hover:bg-sky-50 ${themeTransition}`,
      socialText: isDark ? 'text-slate-200' : 'text-slate-700',
      input: isDark
        ? `border border-slate-800 bg-slate-950/70 text-slate-100 focus:border-sky-400 focus:bg-slate-900 ${themeTransition}`
        : `border border-slate-200 bg-slate-50 text-slate-900 focus:border-sky-400 focus:bg-white ${themeTransition}`,
      buttonPrimary: isDark
        ? `bg-sky-400 text-slate-950 shadow-[0_8px_18px_rgba(56,189,248,0.14)] hover:bg-sky-300 hover:text-slate-950 hover:shadow-[0_12px_22px_rgba(56,189,248,0.18)] ${themeTransition}`
        : `bg-sky-600 text-white shadow-[0_8px_18px_rgba(14,165,233,0.12)] hover:bg-sky-500 hover:text-white hover:shadow-[0_12px_22px_rgba(14,165,233,0.16)] ${themeTransition}`,
      buttonGhost: isDark
        ? `border border-slate-700/90 text-slate-200 hover:border-sky-300 hover:bg-white/6 hover:text-sky-300 ${themeTransition}`
        : `border border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50 hover:text-slate-900 ${themeTransition}`,
      badge: isDark
        ? `bg-sky-400/14 text-sky-300 ${themeTransition}`
        : `bg-sky-100 text-sky-800 ${themeTransition}`,
      badgeMuted: isDark
        ? `border border-slate-700 text-slate-300 ${themeTransition}`
        : `border border-slate-200 text-slate-500 ${themeTransition}`,
      imageFrame: isDark ? `border border-slate-800 bg-slate-950/85 ${themeTransition}` : `border border-white/80 bg-white ${themeTransition}`,
      toggle: isDark ? `bg-slate-800 border-slate-700 ${themeTransition}` : `bg-slate-200 border-slate-300 ${themeTransition}`,
    },
  }
}

export default useSiteTheme
