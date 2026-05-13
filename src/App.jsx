import React, { Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsLayout from './layout/ProjectsLayout'
import ContactLayout from './layout/ContactLayout'
import Page404 from './components/Page404'
import AdminOnlyRoute from './components/AdminOnlyRoute'
import ThemeProvider from './context/ThemeProvider'
import Spinner from './components/Spinner'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Login = lazy(() => import('./pages/Login'))

const withSuspense = (Component) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
)

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='*' element={<Page404 />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />}/> 
          <Route path='about' element={withSuspense(About)} />
          <Route path='skills' element={withSuspense(Skills)} />
          <Route path='projects' element={<ProjectsLayout />}>
            <Route
              index
              element={<AdminOnlyRoute>{withSuspense(Projects)}</AdminOnlyRoute>}
            />
            <Route path=':slug' element={withSuspense(ProjectDetail)}/>
          </Route>
          <Route path='contact' element={<ContactLayout />}>
            <Route index element ={withSuspense(Contact)}/> 
          </Route>
          <Route path='login' element={withSuspense(Login)} />
           <Route path='certificates' element={<ContactLayout />}>
            <Route index element ={withSuspense(Certificates)}/> 
          </Route>
        </Route>
      </>
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
