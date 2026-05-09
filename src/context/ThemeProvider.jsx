import React, { createContext, startTransition, useEffect, useState } from 'react'

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'dark';
        }

        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])

    function handleTheme(){
        startTransition(() => {
            setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        });
    }

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
