import React, { createContext, startTransition, useEffect, useRef, useState } from 'react'

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'dark';
        }

        return localStorage.getItem('theme') || 'dark';
    });
    const [isThemeSwitching, setIsThemeSwitching] = useState(false);
    const themeSwitchTimeoutRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])

    useEffect(() => {
        return () => {
            if (themeSwitchTimeoutRef.current) {
                window.clearTimeout(themeSwitchTimeoutRef.current);
            }
        };
    }, []);

    function handleTheme(){
        if (themeSwitchTimeoutRef.current) {
            window.clearTimeout(themeSwitchTimeoutRef.current);
        }

        setIsThemeSwitching(true);

        themeSwitchTimeoutRef.current = window.setTimeout(() => {
            startTransition(() => {
                setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
            });

            window.requestAnimationFrame(() => {
                setIsThemeSwitching(false);
                themeSwitchTimeoutRef.current = null;
            });
        }, 320);
    }

  return (
    <ThemeContext.Provider value={{theme, handleTheme, isThemeSwitching}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
