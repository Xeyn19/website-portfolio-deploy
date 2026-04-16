import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const normalizeEmail = (email = '') => email.trim().toLowerCase()

const useAdminAuth = () => {
  const adminEmail = normalizeEmail(import.meta.env.VITE_ADMIN_EMAIL)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!mounted) {
        return
      }

      if (error) {
        setAuthError(error.message)
      }

      setSession(data?.session ?? null)
      setLoading(false)
    }

    loadSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const userEmail = normalizeEmail(session?.user?.email)
  const isAdmin = useMemo(() => Boolean(adminEmail && userEmail === adminEmail), [adminEmail, userEmail])

  const signIn = async ({ email, password }) => {
    setAuthError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizeEmail(email),
      password,
    })

    if (error) {
      setAuthError(error.message)
      return { error }
    }

    const nextEmail = normalizeEmail(data?.user?.email)

    if (!adminEmail || nextEmail !== adminEmail) {
      await supabase.auth.signOut()
      const adminError = new Error('This account is not allowed to manage portfolio data.')
      setAuthError(adminError.message)
      return { error: adminError }
    }

    setSession(data?.session ?? null)
    return { data }
  }

  const signOut = async () => {
    setAuthError('')
    const { error } = await supabase.auth.signOut()

    if (error) {
      setAuthError(error.message)
      return { error }
    }

    setSession(null)
    return {}
  }

  return {
    adminEmail,
    authError,
    isAdmin,
    loading,
    session,
    signIn,
    signOut,
    userEmail,
  }
}

export default useAdminAuth
