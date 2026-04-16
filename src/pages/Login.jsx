import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAdminAuth from '../hooks/useAdminAuth'
import useSiteTheme from '../hooks/useSiteTheme'

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [saving, setSaving] = useState(false)
  const { classes } = useSiteTheme()
  const { adminEmail, authError, isAdmin, loading, signIn, signOut, userEmail } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (adminEmail) {
      setLoginForm((currentForm) => ({ ...currentForm, email: currentForm.email || adminEmail }))
    }
  }, [adminEmail])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setLoginError('')
    setSaving(true)

    const { error } = await signIn(loginForm)

    if (error) {
      setLoginError(error.message)
      toast.error(error.message || 'Login failed.')
    } else {
      setLoginForm({ email: adminEmail || '', password: '' })
      toast.success('Admin login successful.')
      navigate('/projects')
    }

    setSaving(false)
  }

  const handleLogout = async () => {
    setSaving(true)
    const { error } = await signOut()

    if (error) {
      toast.error(error.message || 'Logout failed.')
    } else {
      toast.success('Logged out successfully.')
    }

    setSaving(false)
  }

  return (
    <div className="relative min-h-[calc(100dvh-180px)] overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <div className="mx-auto flex min-h-[calc(100dvh-260px)] max-w-6xl items-center justify-center">
        <div className="fixed inset-0 z-30 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <div className={`max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Admin</p>
                <h1 className={`mt-2 text-2xl font-semibold ${classes.heading}`}>Login</h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`rounded-full px-4 py-2 text-sm transition ${classes.buttonGhost}`}
              >
                Close
              </button>
            </div>

            {loading ? (
              <p className={`mt-6 text-sm ${classes.text}`}>Checking admin session...</p>
            ) : isAdmin ? (
              <div className="mt-6">
                <p className={`text-sm leading-6 ${classes.text}`}>
                  Logged in as {userEmail}. You can manage Projects and Skills now.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/projects"
                    className={`inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonPrimary}`}
                  >
                    Open Projects
                  </Link>
                  <Link
                    to="/skills"
                    className={`inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
                  >
                    Open Skills
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={saving}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${classes.buttonGhost}`}
                  >
                    {saving ? 'Logging out' : 'Logout'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="mt-6">
                {!adminEmail && (
                  <p className="mb-4 text-sm text-red-400">
                    Missing VITE_ADMIN_EMAIL. Add it to .env.local and restart the dev server.
                  </p>
                )}

                <div className="space-y-4">
                  <label className={`block text-sm font-medium ${classes.text}`}>
                    Email
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, email: event.target.value }))}
                      className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                      required
                    />
                  </label>

                  <label className={`block text-sm font-medium ${classes.text}`}>
                    Password
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, password: event.target.value }))}
                      className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                      required
                    />
                  </label>
                </div>

                {(loginError || authError) && (
                  <p className="mt-4 text-sm text-red-400">{loginError || authError}</p>
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !adminEmail}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${classes.buttonPrimary}`}
                  >
                    {saving ? 'Signing in' : 'Login'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
