import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import ResumeLayout from './layout/ResumeLayout'
import Resume from './pages/Resume'
import ProjectsLayout from './layout/ProjectsLayout'
import Projects from './pages/Projects'
import SkillsLayout from './layout/SkillsLayout'
import Skills from './pages/Skills'
import ContactLayout from './layout/ContactLayout'
import Contact from './pages/Contact'
import Page404 from './components/Page404'
import ThemeProvider from './context/ThemeProvider'
import Certificates from './pages/Certificates'
import Login from './pages/Login'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
        <Route path='*' element={<Page404 />} /> 
          <Route index element={<HomePage />}/> 
          <Route path='resume' element={<ResumeLayout />}>
            <Route index element ={<Resume />}/> 
          </Route>
          <Route path='projects' element={<ProjectsLayout />}>
            <Route index element ={<Projects />}/> 
          </Route>
          <Route path='skills' element={<SkillsLayout />}>
            <Route index element ={<Skills />}/> 
          </Route>
          <Route path='contact' element={<ContactLayout />}>
            <Route index element ={<Contact />}/> 
          </Route>
          <Route path='login' element={<Login />} />
           <Route path='certificates' element={<ContactLayout />}>
            <Route index element ={<Certificates />}/> 
          </Route>
        </Route>
    )
  )
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  )
}

export default App
