import React from 'react'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
import usePageLoader from '../hooks/usePageLoader'

const certificates = [
  {
    title: 'HTML Fundamentals',
    provider: 'CodeCred',
  },
  {
    title: 'IT Beginner to Advance Roadmap',
    provider: 'icreatechs',
  },
  {
    title: 'CSS',
    provider: 'Udemy',
  },
  {
    title: 'Javscript Development Mastery',
    provider: 'icreatechs',
  },
  {
    title: 'Web Development Fundamentals',
    provider: 'icreatechs',
  },
]

const Certificates = () => {
  const loading = usePageLoader()

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(180,83,9,0.1),_transparent_24%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_45%,_#eff6ff_100%)]" />

      <div className="mx-auto max-w-6xl space-y-7">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
                Learning Record
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                Certificates
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                A record of completed learning milestones across front-end development, core web
                technologies, and broader development foundations.
              </p>
            </div>

            <div className="rounded-[28px] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                Overview
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                These certificates reflect continued learning in web development, front-end tools,
                and practical technical foundations.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="rounded-[24px] bg-[linear-gradient(135deg,_#fff7ed_0%,_#ffffff_55%,_#eff6ff_100%)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                  {certificate.provider}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">{certificate.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Completed certification in {certificate.title} from {certificate.provider}.
                </p>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Certificates
