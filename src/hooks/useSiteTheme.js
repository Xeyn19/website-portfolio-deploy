import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const useSiteTheme = () => {
  const { theme, handleTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  return {
    theme,
    isDark,
    handleTheme,
    classes: {
      appBackground: isDark
        ? 'bg-[linear-gradient(180deg,_#020617_0%,_#0f172a_42%,_#111827_100%)] text-slate-100'
        : 'bg-slate-100 text-slate-900',
      pageBackground: isDark
        ? 'bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.12),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#0f172a_58%,_#111827_100%)]'
        : 'bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(180,83,9,0.1),_transparent_24%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_45%,_#eff6ff_100%)]',
      shell: isDark
        ? 'border border-slate-800/80 bg-slate-950/72 shadow-[0_30px_80px_rgba(2,6,23,0.48)] backdrop-blur'
        : 'border border-white/70 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur',
      panelDark: isDark
        ? 'bg-[linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#1e293b_100%)] text-white shadow-[0_18px_40px_rgba(2,6,23,0.4)]'
        : 'bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]',
      panelSoft: isDark
        ? 'border border-slate-800/80 bg-[linear-gradient(135deg,_rgba(30,41,59,0.92),_rgba(15,23,42,0.92))] shadow-[0_18px_45px_rgba(2,6,23,0.35)]'
        : 'border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,247,237,0.95),_rgba(255,255,255,0.96))] shadow-[0_18px_45px_rgba(148,163,184,0.12)]',
      surface: isDark
        ? 'border border-slate-800 bg-slate-900/88 shadow-[0_18px_40px_rgba(2,6,23,0.28)]'
        : 'border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]',
      surfaceMuted: isDark
        ? 'border border-slate-800 bg-slate-900/72'
        : 'border border-slate-200 bg-slate-50',
      surfaceAccent: isDark
        ? 'bg-[linear-gradient(135deg,_rgba(30,41,59,0.94),_rgba(15,23,42,0.98))]'
        : 'bg-[linear-gradient(135deg,_#fff7ed_0%,_#ffffff_55%,_#eff6ff_100%)]',
      darkTile: isDark
        ? 'border border-white/8 bg-white/6'
        : 'border border-white/10 bg-white/6',
      darkFrame: isDark
        ? 'bg-white/6 ring-1 ring-white/8'
        : 'bg-white/8 ring-1 ring-white/10',
      darkChip: isDark
        ? 'border border-white/8 bg-white/8 text-slate-200'
        : 'border border-white/10 bg-white/10 text-slate-100',
      heading: isDark ? 'text-slate-50' : 'text-slate-900',
      text: isDark ? 'text-slate-300' : 'text-slate-700',
      textMuted: isDark ? 'text-slate-400' : 'text-slate-600',
      textSubtle: isDark ? 'text-slate-500' : 'text-slate-500',
      textOnDark: 'text-slate-300',
      label: isDark ? 'text-amber-300' : 'text-amber-700',
      labelMuted: isDark ? 'text-slate-400' : 'text-slate-500',
      navMuted: isDark ? 'text-slate-300 hover:bg-white/6 hover:text-amber-300' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700',
      navActive: isDark
        ? 'bg-amber-400 text-slate-950 shadow-[0_10px_24px_rgba(251,191,36,0.25)]'
        : 'bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]',
      iconButton: isDark
        ? 'border border-slate-800 bg-slate-950/80 text-slate-200 shadow-[0_10px_24px_rgba(2,6,23,0.24)] hover:border-amber-300 hover:text-amber-300'
        : 'border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:border-amber-300 hover:text-amber-700',
      socialPill: isDark
        ? 'border border-slate-800 bg-slate-950/78 shadow-[0_10px_24px_rgba(2,6,23,0.18)] hover:-translate-y-1 hover:border-amber-300'
        : 'border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-amber-400',
      socialText: isDark ? 'text-slate-200' : 'text-slate-700',
      input: isDark
        ? 'border border-slate-800 bg-slate-950/70 text-slate-100 focus:border-amber-400 focus:bg-slate-900'
        : 'border border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-400 focus:bg-white',
      buttonPrimary: isDark
        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 hover:text-slate-950'
        : 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950',
      buttonGhost: isDark
        ? 'border border-slate-800 text-slate-300 hover:border-amber-300 hover:bg-white/6 hover:text-amber-300'
        : 'border border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-slate-900',
      badge: isDark
        ? 'bg-amber-400/14 text-amber-300'
        : 'bg-amber-100 text-amber-800',
      badgeMuted: isDark
        ? 'border border-slate-700 text-slate-300'
        : 'border border-slate-200 text-slate-500',
      imageFrame: isDark ? 'border border-slate-800 bg-slate-950/85' : 'border border-white/80 bg-white',
      toggle: isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300',
    },
  }
}

export default useSiteTheme
