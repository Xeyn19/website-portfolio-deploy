import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import useSiteTheme from '../hooks/useSiteTheme'

const MainLayout = () => {
  const { classes } = useSiteTheme()
  const location = useLocation()
  const showFooter = location.pathname !== '/'

  return (
    <>
      <div className={`relative min-h-screen transition-colors duration-300 ${classes.appBackground}`}>
          <NavBar />
          <Outlet />
          {showFooter ? <Footer /> : null}
      </div>
    </>
    
  )
}

export default MainLayout
