import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    function handleTheme(){
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider