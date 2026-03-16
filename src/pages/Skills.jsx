import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import tech from '../assets/techdata.json'
import Spinner from '../components/Spinner'
import useSiteTheme from '../hooks/useSiteTheme'

const Skills = () => {
  const [loading, setLoading] = useState(false)
  const [techData, setTechData] = useState([])
  const { classes } = useSiteTheme()

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTechData(tech)
      } catch (error) {
        console.error('Fetch data error', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <div className="mx-auto max-w-6xl space-y-7">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`overflow-hidden rounded-[32px] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-8 ${classes.shell}`}
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Technical Foundation
              </p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${classes.heading}`}>
                Skills
              </h1>
              <p className={`mt-4 max-w-3xl text-sm leading-7 ${classes.text}`}>
                I build responsive web applications with a front-end focus and growing back-end
                capability. My stack covers UI development, component-based workflows, RESTful app
                structure, database fundamentals, and deployment-ready collaboration tools.
              </p>
            </div>

            <div className={`rounded-[28px] p-6 ${classes.panelDark}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                Focus Areas
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Responsive UI', 'React Development', 'API Integration', 'Version Control', 'Database Basics'].map(
                  (item) => (
                    <span
                      key={item}
                      className={`rounded-full px-3 py-1 text-xs ${classes.darkChip}`}
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                The current stack emphasizes production-ready front-end work while extending into
                Node.js, Express.js, PHP, and MySQL for full-stack growth.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {techData.map((data, index) => (
            <motion.article
              key={`${data.id}-${data.techname}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -6 }}
              className={`group rounded-[28px] p-6 transition ${classes.surface}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${classes.surfaceMuted} ${classes.surfaceAccent}`}>
                  <img
                    src={data.image}
                    alt={data.techname}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badge}`}>
                  {data.experience}
                </span>
              </div>

              <div className="mt-5">
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.labelMuted}`}>
                  Technology
                </p>
                <h2 className={`mt-2 text-xl font-semibold ${classes.heading}`}>{data.techname}</h2>
              </div>

              <p className={`mt-4 text-sm leading-7 ${classes.textMuted}`}>
                Practical experience building interfaces, features, and development workflows with{' '}
                {data.techname}.
              </p>

              <a
                href={data.techlink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-medium transition ${classes.buttonGhost}`}
              >
                Learn more
              </a>
            </motion.article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Skills
