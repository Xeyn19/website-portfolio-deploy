import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import useSiteTheme from '../hooks/useSiteTheme'

const MainLayout = () => {
  const { classes } = useSiteTheme()

  return (
    <>
      <div className={`relative min-h-screen transition-colors duration-300 ${classes.appBackground}`}>
          <NavBar />
          <Outlet />
      </div>
    </>
    
  )
}

export default MainLayout
