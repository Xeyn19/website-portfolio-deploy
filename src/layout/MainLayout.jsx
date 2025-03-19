import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
      <div className="bg-gray-100">
          <NavBar />
          <Outlet />
          <Footer />
      </div>
    </>
    
  )
}

export default MainLayout