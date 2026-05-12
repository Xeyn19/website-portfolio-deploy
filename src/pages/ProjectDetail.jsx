import React, { useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import PageBackLink from '../components/PageBackLink'
import Page404 from '../components/Page404'
import { projectCaseStudies } from '../data/projectCaseStudies'
import useProjectsData from '../hooks/useProjectsData'
import { getProjectExternalLinks, getTechnologyVisual } from '../lib/projectContent'
import { getScrollRevealProps } from '../lib/scrollMotion'
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
  const shouldReduceMotion = useReducedMotion()
  const { projects } = useProjectsData()
  const [activeSlide, setActiveSlide] = useState(0)
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
  const projectMeta = [project.category, project.date].filter(Boolean)
  const imageSlides = [project.image, ...(project.galleryImages ?? []), ...(detail.galleryImages ?? [])].filter(
    (image, index, collection) => Boolean(image) && collection.indexOf(image) === index,
  )
  const hasMultipleSlides = imageSlides.length > 1
  const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70'
  const actionButtonClass = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${classes.buttonGhost} ${focusRingClass}`
  const sectionReveal = getScrollRevealProps(shouldReduceMotion)

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
        <PageBackLink to="/#projects" label="Back to projects" currentLabel={project.title} />

        <Motion.section
          {...sectionReveal}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h1 className={`text-[1.8rem] font-semibold tracking-tight sm:text-[2.65rem] ${classes.heading}`}>
                {project.title}
              </h1>

              {projectMeta.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {projectMeta.map((item) => (
                    <span
                      key={`${project.slug}-${item}`}
                      className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${classes.badgeMuted}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <p className={`mt-4 text-[14.5px] leading-6 sm:text-[15.5px] sm:leading-7 ${classes.textMuted}`}>
                {detail.headline}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              {liveLink ? (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionButtonClass}
                >
                  Live Site
                </a>
              ) : null}
              {repoLink ? (
                <a
                  href={repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionButtonClass}
                >
                  Repository
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
            <div>
              <div className={`overflow-hidden rounded-2xl ${classes.surfaceMuted}`}>
                <div className="relative rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),rgba(2,6,23,0.08)_42%,rgba(2,6,23,0.16))]">
                  <img
                    src={imageSlides[activeSlide]}
                    alt={`${project.title} screenshot ${activeSlide + 1}`}
                    className="mx-auto h-64 w-full object-contain object-center p-3 sm:h-[360px] sm:p-4 lg:h-[460px] lg:p-5 xl:h-[520px] xl:p-6"
                  />

                  <button
                    type="button"
                    onClick={goToPreviousSlide}
                    disabled={!hasMultipleSlides}
                    className={`absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition sm:left-4 sm:h-14 sm:w-14 ${
                      hasMultipleSlides
                        ? classes.iconButton
                        : 'cursor-not-allowed border border-slate-800/80 bg-slate-950/70 text-slate-500'
                    } ${focusRingClass}`}
                    aria-label="Previous image"
                  >
                    <span className="text-lg sm:text-xl">&lsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextSlide}
                    disabled={!hasMultipleSlides}
                    className={`absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition sm:right-4 sm:h-14 sm:w-14 ${
                      hasMultipleSlides
                        ? classes.iconButton
                        : 'cursor-not-allowed border border-slate-800/80 bg-slate-950/70 text-slate-500'
                    } ${focusRingClass}`}
                    aria-label="Next image"
                  >
                    <span className="text-lg sm:text-xl">&rsaquo;</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {imageSlides.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`rounded-full transition ${focusRingClass} ${
                      index === activeSlide
                        ? 'h-3.5 w-9 bg-sky-300'
                        : 'h-3.5 w-3.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {hasMultipleSlides ? (
                <p className={`mt-3 text-center text-[12px] sm:text-[13px] ${classes.textSubtle}`}>
                  {activeSlide + 1} of {imageSlides.length}
                </p>
              ) : null}

              <div className="mt-10">
                <h2 className={`text-[1.32rem] font-semibold tracking-tight sm:text-[1.45rem] ${classes.heading}`}>
                  Tech Stack
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {technologies.map((technology) => {
                    const TechIcon = technology.Icon

                    return (
                      <span
                        key={`${project.slug}-${technology.label}`}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${classes.badgeMuted}`}
                      >
                        <TechIcon className={`h-4 w-4 ${technology.iconClass}`} />
                        <span>{technology.label}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <section className={`rounded-2xl p-5 sm:p-6 ${classes.surfaceMuted}`}>
                <h2 className={`text-[1.32rem] font-semibold tracking-tight sm:text-[1.5rem] ${classes.heading}`}>
                  Overview
                </h2>
                <p className={`mt-4 text-[14.5px] leading-6 sm:mt-5 sm:text-[15px] sm:leading-7 ${classes.textMuted}`}>
                  {detail.overview}
                </p>
              </section>

              <section className={`rounded-2xl p-5 sm:p-6 ${classes.surfaceMuted}`}>
                <h2 className={`text-[1.32rem] font-semibold tracking-tight sm:text-[1.5rem] ${classes.heading}`}>
                  Key Features
                </h2>
                <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  {detail.features.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-300" />
                      <span className={`text-[14.5px] leading-6 sm:text-[15px] sm:leading-7 ${classes.textMuted}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Motion.section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Motion.section
            {...sectionReveal}
            className={`rounded-2xl p-5 sm:p-6 ${classes.shell}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
              Problem
            </p>
            <p className={`mt-4 text-[14.5px] leading-6 sm:mt-5 sm:leading-7 ${classes.text}`}>
              {detail.problem}
            </p>
          </Motion.section>

          <Motion.section
            {...sectionReveal}
            className={`rounded-2xl p-5 sm:p-6 ${classes.shell}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
              Solution
            </p>
            <p className={`mt-4 text-[14.5px] leading-6 sm:mt-5 sm:leading-7 ${classes.text}`}>
              {detail.solution}
            </p>
          </Motion.section>
        </div>

        <Motion.section
          {...sectionReveal}
          className={`mt-6 rounded-2xl p-5 sm:p-6 ${classes.shell}`}
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
            Responsibilities
          </p>
          <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            {detail.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400" />
                <span className={`text-[14.5px] leading-6 sm:leading-7 ${classes.text}`}>{item}</span>
              </li>
            ))}
          </ul>
        </Motion.section>
      </main>
    </div>
  )
}

export default ProjectDetail
