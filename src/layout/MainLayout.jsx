import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import useSiteTheme from '../hooks/useSiteTheme'

const MainLayout = () => {
  const { theme, handleTheme, classes } = useSiteTheme()

  return (
    <>
      <div className={`relative min-h-screen transition-colors duration-300 ${classes.appBackground}`}>
          <NavBar />
          <input
          onChange={handleTheme}
          type="checkbox"
          checked={theme === 'dark'}
          className={`toggle absolute right-20 top-10 z-50 border ${classes.toggle} max-md:right-6 max-md:top-[108px] max-xl:right-8`}
          />
          <Outlet />
          <Footer />
      </div>
    </>
    
  )
}

export default MainLayout
