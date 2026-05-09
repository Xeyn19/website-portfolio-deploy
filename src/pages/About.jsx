import React from 'react'
import { motion as Motion } from 'framer-motion'
import PageBackLink from '../components/PageBackLink'
import { siteContent } from '../data/siteContent'
import useSiteTheme from '../hooks/useSiteTheme'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const About = () => {
  const { classes } = useSiteTheme()
  const { about } = siteContent

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />

      <main className="mx-auto max-w-[860px]">
        <PageBackLink to="/#about" label="Back to portfolio" />

        <Motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={`rounded-2xl p-6 sm:p-8 ${classes.shell}`}
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
            Personal Profile
          </p>
          <h1 className={`mt-3 text-[2rem] font-semibold tracking-tight sm:text-[2.45rem] ${classes.heading}`}>
            {about.title}
          </h1>

          <Motion.div className="mt-8" {...fadeInUp}>
            <h2 className={`text-[1.45rem] font-semibold tracking-tight sm:text-[1.7rem] ${classes.heading}`}>
              {about.detailTitle}
            </h2>
            <p className={`mt-4 max-w-3xl text-[15px] leading-7 ${classes.text}`}>
              {about.detailIntro}
            </p>
          </Motion.div>

          <div className="mt-8 grid gap-5">
            {about.sections.map((section, index) => (
              <Motion.article
                key={section.title}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.04 }}
                className={`rounded-2xl p-5 sm:p-6 ${classes.surfaceMuted}`}
              >
                <h3 className={`text-[1.12rem] font-semibold tracking-tight sm:text-[1.24rem] ${classes.heading}`}>
                  {section.title}
                </h3>
                <p className={`mt-4 text-[14.5px] leading-7 ${classes.text}`}>
                  {section.body}
                </p>
              </Motion.article>
            ))}
          </div>
        </Motion.section>
      </main>
    </div>
  )
}

export default About
