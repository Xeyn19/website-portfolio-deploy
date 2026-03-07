import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImage from '/Profile-bg-remover.png'
import emailjs from '@emailjs/browser'
import Spinner from '../components/Spinner'
import usePageLoader from '../hooks/usePageLoader'

const Contact = () => {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const loading = usePageLoader()

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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(180,83,9,0.1),_transparent_24%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_45%,_#eff6ff_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur"
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative overflow-hidden bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] px-7 py-8 text-white">
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

              <div className="w-full rounded-[28px] bg-white/8 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.35)] ring-1 ring-white/10">
                <div className="flex h-72 w-full items-end justify-center overflow-hidden rounded-[22px] bg-white pt-4">
                  <img
                    src={profileImage}
                    alt="Edgar R Orosa Jr"
                    className="max-h-full max-w-full object-contain object-bottom drop-shadow-[0_18px_30px_rgba(15,23,42,0.28)]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-slate-100">edgarrodilorosa@gmail.com</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Phone
                  </p>
                  <p className="mt-2 text-sm text-slate-100">+639942586519</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="px-6 py-7 sm:px-8 lg:px-10">
            <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,247,237,0.95),_rgba(255,255,255,0.96))] p-6 shadow-[0_18px_45px_rgba(148,163,184,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
                Send a Message
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
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
              className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-8"
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label htmlFor="from_name" className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="from_email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    required
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
                    placeholder="Tell me about your project, opportunity, or message."
                  />
                </div>

                <input type="hidden" name="time" />

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
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
