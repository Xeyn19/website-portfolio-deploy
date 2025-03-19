import React from 'react'
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

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
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
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App