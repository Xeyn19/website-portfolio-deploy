import React from 'react'
import { motion } from 'framer-motion'
import profileImage from '/Profile-bg-remover.png'
import Spinner from '../components/Spinner'
import usePageLoader from '../hooks/usePageLoader'

const Resume = () => {
  const loading = usePageLoader()

  const contacts = [
    {
      label: 'Email',
      value: 'edgarrodilorosa@gmail.com',
    },
    {
      label: 'Phone',
      value: '+639942586519',
    },
    
  ]

  const education = [
    {
      school: 'Dr. Filemon C. Aguilar Memorial College of Las Pinas',
      years: '2022-2026',
      details: 'Bachelor of Science in Information System',
    },
    {
      school: 'Holy Rosary Academy of Las Pinas City',
      years: '2020-2022',
      details: 'Humanities and Social Sciences (HUMSS)',
    },
  ]

  const projects = [
    {
      title: 'Online Saving Goal System for Working Students',
      details: [
        'Developed the entire Online Saving Goal System for Working Students.',
        'Designed the complete UI/UX layout to ensure a responsive and user-friendly interface.',
      ],
    },
    {
      title: 'Web-Based Gym Management System with Personal Trainer Appointment for Mac Finest Fitness Gym',
      details: [
        'Designed the user interface and layout for the Web-Based Gym Management System.',
        'Implemented functions about data filtering and search features.',
      ],
    },
  ]

  const technicalSkills = [
    'HTML',
    'JavaScript',
    'CSS',
    'React JS',
    'Next Js',
    'Express JS',
    'Node Js',
    'MySQL',
    'PHP',
    'Tailwind CSS',
    'Git',
    'GitHub',
    'Canva / MS Office',
  ]

  const certifications = [
    'HTML Fundamentals (CodeCred)',
    'IT Beginner to Advance Roadmap (icreatechs)',
    'CSS (Udemy)',
    'Javscript Development Mastery (icreatechs)',
    'Web Development Fundamentals (icreatechs)',
  ]

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(180,83,9,0.1),_transparent_24%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_45%,_#eff6ff_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur"
      >
        <div className="grid lg:grid-cols-[320px_1fr]">
          <aside className="relative overflow-hidden bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] px-7 py-8 text-white">
            <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-sky-300/10 blur-3xl" />

            <div className="relative space-y-8">
              <div className="text-center">
                <div className="w-full rounded-[28px] bg-white/8 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.35)] ring-1 ring-white/10">
                  <div className="flex h-72 w-full items-end justify-center overflow-hidden rounded-[22px] bg-white pt-4">
                    <img
                      src={profileImage}
                      alt="Edgar R Orosa Jr"
                      className="h-full w-full scale-110 object-contain object-bottom drop-shadow-[0_18px_30px_rgba(15,23,42,0.28)]"
                    />
                  </div>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                  Full-Stack Dev Applicant
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight">Edgar R Orosa Jr</h1>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Bachelor of Science in Information System
                </p>
              </div>

              <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                  Contact
                </p>
                <div className="mt-4 space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {contact.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-100">{contact.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                  Technical Skill
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <main className="px-6 py-7 sm:px-8 lg:px-10">
            <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,247,237,0.95),_rgba(255,255,255,0.96))] p-6 shadow-[0_18px_45px_rgba(148,163,184,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
                Profile Summary
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                A motivated pursuing a full-stack developer career, eager to design and develop scalable web applications using modern front-end and back-end technologies while continuously improving through real-world projects.
              </p>
            </div>

            <div className="mt-7 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  Education
                </p>
                <div className="mt-5 space-y-5">
                  {education.map((item) => (
                    <article
                      key={item.school}
                      className="border-l-2 border-amber-500/70 pl-4"
                    >
                      <p className="text-base font-semibold text-slate-900">{item.school}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                        {item.years}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{item.details}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  Certifications
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  {certifications.map((certification) => (
                    <li
                      key={certification}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      {certification}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                Projects
              </p>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-5"
                  >
                    <h2 className="text-base font-semibold leading-6 text-slate-900">
                      {project.title}
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                      {project.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </motion.div>
    </div>
  )
}

export default Resume
