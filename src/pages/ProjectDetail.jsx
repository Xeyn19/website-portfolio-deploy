import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Page404 from '../components/Page404'
import { projectCaseStudies } from '../data/projectCaseStudies'
import useProjectsData from '../hooks/useProjectsData'
import { getProjectExternalLinks, getTechnologyVisual } from '../lib/projectContent'
import useSiteTheme from '../hooks/useSiteTheme'

const fallbackSections = (project) => ({
  headline: 'Project case study and implementation overview.',
  overview: project.description,
  problem:
    'This project was built to solve a practical workflow or user-facing problem through a more structured and maintainable web experience.',
  solution:
    'The implementation combines the listed technologies with a responsive frontend structure and project-specific application logic tailored to the use case.',
  responsibilities: [
    'Planned and built the project structure around the required user flow.',
    'Implemented the main frontend and/or backend features needed for the core experience.',
    'Prepared the project for deployment, iteration, or future enhancement.',
  ],
  features: [
    'Responsive interface design.',
    'Project-specific interaction and data handling.',
    'Technology stack aligned to the product requirements.',
  ],
  galleryImages: [],
})

const ProjectDetail = () => {
  const { slug } = useParams()
  const { classes } = useSiteTheme()
  const { projects } = useProjectsData()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <Page404 />
  }

  const caseStudy = projectCaseStudies[project.slug] ?? {}
  const detail = {
    ...fallbackSections(project),
    ...caseStudy,
  }
  const technologies = (project.technologies ?? []).map((technology) => getTechnologyVisual(technology))
  const { liveLink, repoLink } = getProjectExternalLinks(project, caseStudy)
  const imageSlides = [project.image, ...(detail.galleryImages ?? [])].filter(
    (image, index, collection) => Boolean(image) && collection.indexOf(image) === index,
  )
  const [activeSlide, setActiveSlide] = useState(0)
  const hasMultipleSlides = imageSlides.length > 1

  const goToPreviousSlide = () => {
    if (!hasMultipleSlides) {
      return
    }

    setActiveSlide((currentSlide) =>
      currentSlide === 0 ? imageSlides.length - 1 : currentSlide - 1,
    )
  }

  const goToNextSlide = () => {
    if (!hasMultipleSlides) {
      return
    }

    setActiveSlide((currentSlide) =>
      currentSlide === imageSlides.length - 1 ? 0 : currentSlide + 1,
    )
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />

      <main className="mx-auto max-w-[1080px]">
        <div className={`mb-8 border-b px-1 pb-5 ${classes.badgeMuted}`}>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/#projects" className={`inline-flex items-center gap-2 transition ${classes.textMuted}`}>
              <span aria-hidden="true">←</span>
              <span>Back</span>
            </Link>
            <span className={classes.textSubtle}>/</span>
            <span className={`font-medium ${classes.heading}`}>{project.title}</span>
          </div>
        </div>

        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h1 className={`text-[2.05rem] font-semibold tracking-tight sm:text-[2.65rem] ${classes.heading}`}>
                {project.title}
              </h1>
              <p className={`mt-4 text-[15px] leading-7 sm:text-[15.5px] ${classes.textMuted}`}>
                {detail.headline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {liveLink ? (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex rounded-full px-5 py-3 text-[13px] font-medium transition ${classes.buttonGhost}`}
                >
                  Live Site
                </a>
              ) : null}
              {repoLink ? (
                <a
                  href={repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex rounded-full px-5 py-3 text-[13px] font-medium transition ${classes.buttonGhost}`}
                >
                  Repository
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
            <div>
              <div className={`overflow-hidden rounded-[30px] ${classes.surfaceMuted}`}>
                <div className="relative">
                  <img
                    src={imageSlides[activeSlide]}
                    alt={`${project.title} screenshot ${activeSlide + 1}`}
                    className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                  />

                  <button
                    type="button"
                    onClick={goToPreviousSlide}
                    disabled={!hasMultipleSlides}
                    className={`absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full transition ${
                      hasMultipleSlides
                        ? classes.iconButton
                        : 'cursor-not-allowed border border-slate-800/80 bg-slate-950/70 text-slate-500'
                    }`}
                    aria-label="Previous image"
                  >
                    <span className="text-xl">‹</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextSlide}
                    disabled={!hasMultipleSlides}
                    className={`absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full transition ${
                      hasMultipleSlides
                        ? classes.iconButton
                        : 'cursor-not-allowed border border-slate-800/80 bg-slate-950/70 text-slate-500'
                    }`}
                    aria-label="Next image"
                  >
                    <span className="text-xl">›</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {imageSlides.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-3 rounded-full transition ${
                      index === activeSlide
                        ? 'w-8 bg-amber-300'
                        : 'w-3 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-10">
                <h2 className={`text-[1.45rem] font-semibold tracking-tight ${classes.heading}`}>
                  Tech Stack
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {technologies.map((technology) => {
                    const TechIcon = technology.Icon

                    return (
                    <span
                      key={`${project.slug}-${technology.label}`}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${classes.badgeMuted}`}
                    >
                      <TechIcon className={`h-4 w-4 ${technology.iconClass}`} />
                      <span>{technology.label}</span>
                    </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className={`text-[1.5rem] font-semibold tracking-tight ${classes.heading}`}>
                  Overview
                </h2>
                <p className={`mt-5 text-[15px] leading-7 ${classes.textMuted}`}>
                  {detail.overview}
                </p>
              </section>

              <section>
                <h2 className={`text-[1.5rem] font-semibold tracking-tight ${classes.heading}`}>
                  Key Features
                </h2>
                <ul className="mt-5 space-y-4">
                  {detail.features.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-300" />
                      <span className={`text-[15px] leading-7 ${classes.textMuted}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Motion.section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`rounded-[34px] p-6 sm:p-7 ${classes.shell}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
              Problem
            </p>
            <p className={`mt-5 text-[14.5px] leading-7 ${classes.text}`}>
              {detail.problem}
            </p>
          </Motion.section>

          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`rounded-[34px] p-6 sm:p-7 ${classes.shell}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
              Solution
            </p>
            <p className={`mt-5 text-[14.5px] leading-7 ${classes.text}`}>
              {detail.solution}
            </p>
          </Motion.section>
        </div>

        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`mt-6 rounded-[34px] p-6 sm:p-7 ${classes.shell}`}
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
            Responsibilities
          </p>
          <ul className="mt-5 space-y-4">
            {detail.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400" />
                <span className={`text-[14.5px] leading-7 ${classes.text}`}>{item}</span>
              </li>
            ))}
          </ul>
        </Motion.section>
      </main>
    </div>
  )
}

export default ProjectDetail
