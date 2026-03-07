import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImage from '/shakehands.jpg'
import emailjs from '@emailjs/browser'
import Spinner from '../components/Spinner'
import usePageLoader from '../hooks/usePageLoader'
import useSiteTheme from '../hooks/useSiteTheme'

const Contact = () => {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const loading = usePageLoader()
  const { classes } = useSiteTheme()

  const getToday = () => {
    const now = new Date()
    return now.toISOString().slice(0, 10)
  }

  const canSend = (email) => {
    const today = getToday()
    const data = JSON.parse(localStorage.getItem('contact_email_submissions') || '{}')
    const entry = data[email]

    if (entry && entry.date === today) {
      return entry.count < 2
    }

    return true
  }

  const incrementSend = (email) => {
    const today = getToday()
    const data = JSON.parse(localStorage.getItem('contact_email_submissions') || '{}')
    const entry = data[email]

    if (entry && entry.date === today) {
      data[email] = { date: today, count: entry.count + 1 }
    } else {
      data[email] = { date: today, count: 1 }
    }

    localStorage.setItem('contact_email_submissions', JSON.stringify(data))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const email = formRef.current.from_email.value.trim().toLowerCase()
    if (!canSend(email)) {
      alert('Oops! This email has reached its daily limit of 2 messages. Please try again tomorrow.')
      return
    }

    setSending(true)

    const now = new Date()
    const timeString = now.toLocaleString()
    formRef.current.time.value = timeString

    emailjs
      .sendForm(
        'service_cs1o819',
        'template_7263nu5',
        formRef.current,
        '9yqMTbCs9TY4obJ-A',
      )
      .then(() => {
        incrementSend(email)
        alert(
          'Thank you for reaching out! Your message has been successfully sent. I will get back to you as soon as possible.',
        )
        formRef.current.reset()
        setSending(false)
      })
      .catch(() => {
        alert('Failed to send message. Please try again.')
        setSending(false)
      })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`mx-auto max-w-6xl overflow-hidden rounded-[32px] ${classes.shell}`}
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <aside className={`relative overflow-hidden px-7 py-8 text-white ${classes.panelDark}`}>
            <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-sky-300/10 blur-3xl" />

            <div className="relative space-y-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/90">
                  Contact
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
                  Let&apos;s work together
                </h1>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                  If you&apos;re looking for a developer who can help build responsive interfaces,
                  improve user experience, and contribute to real project work, send a message here.
                </p>
              </div>

              <div className={`w-full rounded-[28px] p-3 shadow-[0_16px_40px_rgba(15,23,42,0.35)] ${classes.darkFrame}`}>
                <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-[22px] bg-white pt-4">
                  <img
                    src={profileImage}
                    alt="Edgar R Orosa Jr"
                    className="max-h-full max-w-full object-cover object-bottom drop-shadow-[0_18px_30px_rgba(15,23,42,0.28)]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className={`rounded-[24px] p-5 ${classes.darkTile}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-slate-100">edgarrodilorosa@gmail.com</p>
                </div>
                <div className={`rounded-[24px] p-5 ${classes.darkTile}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Phone
                  </p>
                  <p className="mt-2 text-sm text-slate-100">+639942586519</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="px-6 py-7 sm:px-8 lg:px-10">
            <div className={`rounded-[28px] p-6 ${classes.panelSoft}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Send a Message
              </p>
              <p className={`mt-3 text-sm leading-7 ${classes.text}`}>
                Messages are sent directly through the portfolio contact form. To prevent spam,
                the same email address is limited to two submissions per day.
              </p>
            </div>

            <motion.form
              ref={formRef}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              onSubmit={handleSubmit}
              className={`mt-6 rounded-[28px] p-6 sm:p-8 ${classes.surface}`}
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label htmlFor="from_name" className={`text-sm font-medium ${classes.text}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    className={`rounded-2xl px-4 py-3 text-sm outline-none transition ${classes.input}`}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="from_email" className={`text-sm font-medium ${classes.text}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    required
                    className={`rounded-2xl px-4 py-3 text-sm outline-none transition ${classes.input}`}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className={`text-sm font-medium ${classes.text}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className={`resize-none rounded-2xl px-4 py-3 text-sm outline-none transition ${classes.input}`}
                    placeholder="Tell me about your project, opportunity, or message."
                  />
                </div>

                <input type="hidden" name="time" />

                <button
                  type="submit"
                  className={`w-full rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70 ${classes.buttonPrimary}`}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          </main>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
