import React from 'react'
import Spinner from './Spinner'
import Page404 from './Page404'
import useAdminAuth from '../hooks/useAdminAuth'

const AdminOnlyRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth()

  if (loading) {
    return <Spinner />
  }

  if (!isAdmin) {
    return <Page404 />
  }

  return children
}

export default AdminOnlyRoute
