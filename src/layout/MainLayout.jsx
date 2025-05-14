import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ThemeContext } from '../context/ThemeProvider'


const MainLayout = () => {
  const {theme, handleTheme} = useContext(ThemeContext)
  return (
    <>
      <div className={`relative ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-100 text-yellow-700'}`}>
          <NavBar />
          <input onClick={handleTheme}
          type="checkbox" checked={theme === 'light'} className="toggle bg-white absolute right-20 max-md:right-10 max-xl:right-8" />
          <Outlet />
          <Footer />
      </div>
    </>
    
  )
}

export default MainLayout