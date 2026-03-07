import React from 'react'
import { motion } from 'framer-motion'
import profileImage from '/Profile-bg-remover.png'
import facebook from '/facebook.png'
import instagram from '/instagram.png'
import linkedin from '/linkedin.png'
import github from '/github.png'
import { Typewriter } from 'react-simple-typewriter'
import Spinner from '../components/Spinner'
import usePageLoader from '../hooks/usePageLoader'

const socialLinks = [
  { img: facebook, link: 'https://www.facebook.com/edgar.orosa.9/', label: 'Facebook' },
  { img: linkedin, link: 'https://www.linkedin.com/in/edgar-orosa-a43a15333/', label: 'LinkedIn' },
  { img: instagram, link: 'https://www.instagram.com/c_stor_/', label: 'Instagram' },
  { img: github, link: 'https://github.com/Xeyn19', label: 'GitHub' },
]

const HomePage = () => {
  const loading = usePageLoader()

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(180,83,9,0.1),_transparent_24%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_45%,_#eff6ff_100%)]" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-7 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
              Portfolio
            </p>

            <div className="mt-3 min-h-[136px] whitespace-pre-line text-5xl 
            font-semibold leading-tight tracking-tight text-slate-900 sm:min-h-[168px] max-md:text-3xl max-sm:text-[24px]">
              <h1>
                <Typewriter
                  words={["Hello,\nI'm Full-Stack Developer."]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
            </div>

            <div className="-mt-5 max-sm:-mt-12 rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,247,237,0.95),_rgba(255,255,255,0.96))] p-5 shadow-[0_18px_45px_rgba(148,163,184,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
                About Me
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                I am a Full-Stack Developer with a strong foundation in React and
                Node.js/Express.js, building responsive, high-performing web applications. I am
                focused on expanding my skills across the full development stack to become an
                efficient and versatile software engineer, delivering seamless user experiences
                through clean, maintainable code.
              </p>
            </div>

            <div className="mt-4">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300/90">
                  Primary Stack
                </p>
                <div className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Front-End:</span> HTML, CSS,
                    JavaScript, React.js, Tailwind CSS
                  </p>
                  <p>
                    <span className="font-semibold text-white">Back-End:</span> Node.js,
                    Express.js, PHP
                  </p>
                  <p>
                    <span className="font-semibold text-white">Database:</span> MySQL
                  </p>
                  <p>
                    <span className="font-semibold text-white">Tools:</span> Git, GitHub
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Connect
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                    className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-amber-400"
                  >
                    <img src={item.img} alt={item.label} className="h-6 w-6 object-contain" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] px-7 py-7 text-white">
            <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-sky-300/10 blur-3xl" />

            <div className="relative flex h-full flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/90">
                  Featured Profile
                </p>
              </div>

              <div className="w-full rounded-[28px] bg-white/8 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.35)] ring-1 ring-white/10">
                <div className="flex h-[380px] w-full items-end justify-center overflow-hidden rounded-[22px] bg-white pt-4">
                  <img
                    src={profileImage}
                    alt="Edgar R Orosa Jr"
                    className="h-full w-full scale-110 object-contain object-bottom drop-shadow-[0_18px_30px_rgba(15,23,42,0.28)]"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Development Focus
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Focused on growing as a full-stack developer by building practical web
                    applications, improving problem-solving skills, and gaining real-world
                    experience in collaborative development.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    What I Value
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Clean design, practical functionality, and continuous improvement through
                    real project experience, feedback, and collaboration.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 sm:col-span-2 lg:col-span-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    What I Bring
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    A strong foundation in modern web development, a willingness to learn fast,
                    and a focused approach to building reliable and user-friendly interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage
