import React from 'react'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import TawkChatWidget from '../components/TawkChatWidget'
import { Outlet } from 'react-router-dom'
import useSiteTheme from '../hooks/useSiteTheme'

const MainLayout = () => {
  const { classes, isThemeSwitching } = useSiteTheme()

  if (isThemeSwitching) {
    return (
      <div className={`min-h-screen ${classes.appBackground}`}>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className={`relative min-h-screen transition-colors duration-300 ${classes.appBackground}`}>
          <NavBar />
          <Outlet />
          <TawkChatWidget />
      </div>
    </>
    
  )
}

export default MainLayout
