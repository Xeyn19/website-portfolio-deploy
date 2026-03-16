import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import projectdata from '../assets/data.json'
import Spinner from '../components/Spinner'
import useSiteTheme from '../hooks/useSiteTheme'

const categoryOptions = [
  { key: 'all', label: 'All Projects' },
  { key: 'Front-End', label: 'Front-End' },
  { key: 'Full Stack', label: 'Full Stack' }
]

const normalizeCategory = (category = '') =>
  category
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const Projects = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [imageModes, setImageModes] = useState({})
  const { classes } = useSiteTheme()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setData(projectdata)
      } catch (error) {
        console.error('Fetch data error', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
  }

  const handleYearFilter = (year) => {
    const nextYear = year === 'all' ? 'all' : Number(year)
    setSelectedYear(nextYear)
  }

  const handleImageLoad = (imageSrc, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const nextMode = naturalHeight > naturalWidth ? 'portrait' : 'landscape'

    setImageModes((prev) => (prev[imageSrc] === nextMode ? prev : { ...prev, [imageSrc]: nextMode }))
  }

  if (loading) {
    return <Spinner />
  }

  const availableYears = Array.from(
    new Set(data.map((project) => project.date).filter((date) => Number.isFinite(date)))
  ).sort((a, b) => b - a)

  const sortedData = [...data].sort((a, b) => (b.date || 0) - (a.date || 0))

  const filteredData = sortedData.filter((project) => {
    const normalized = normalizeCategory(project.category)
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'Front-End' && normalized === 'front-end') ||
      (selectedCategory === 'Full Stack' && normalized === 'full-stack')
    const matchesYear = selectedYear === 'all' || project.date === selectedYear

    return matchesCategory && matchesYear
  })

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <div className="mx-auto max-w-6xl space-y-7">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`overflow-hidden rounded-[32px] p-6 sm:p-8 ${classes.shell}`}
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Selected Work
              </p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${classes.heading}`}>
                Projects
              </h1>
              <p className={`mt-4 max-w-3xl text-sm leading-7 ${classes.text}`}>
                A collection of front-end and full-stack projects focused on responsive interfaces,
                user-centered interaction, and practical functionality. Each build reflects hands-on
                experience with modern web tools, data handling, and real deployment workflows.
              </p>
            </div>

            <div className={`rounded-[28px] p-6 ${classes.panelDark}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                Filter
              </p>
              <div className="mt-4 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Category
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {categoryOptions.map((category) => {
                      const isActive = selectedCategory === category.key

                      return (
                        <button
                          key={category.key}
                          type="button"
                          onClick={() => handleCategoryFilter(category.key)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? 'bg-amber-400 text-slate-900 shadow-[0_10px_25px_rgba(251,191,36,0.35)]'
                              : classes.darkChip
                          }`}
                        >
                          {category.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Year
                  </p>
                  <div className="mt-3 relative group">
                    <select
                      value={selectedYear === 'all' ? 'all' : String(selectedYear)}
                      onChange={(event) => handleYearFilter(event.target.value)}
                      className={`w-full appearance-none rounded-2xl px-4 py-2.5 pr-10 text-sm font-medium shadow-[0_10px_24px_rgba(2,6,23,0.18)] transition hover:border-amber-300 hover:text-amber-300 focus:border-amber-300 focus:text-amber-300 focus:ring-2 focus:ring-amber-300/40 ${classes.input}`}
                    >
                      <option value="all">All Years</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span
                      className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${classes.textMuted} group-hover:text-amber-300 group-focus-within:text-amber-300`}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Showing {filteredData.length} project{filteredData.length === 1 ? '' : 's'} in the{' '}
                {selectedCategory === 'all' ? 'full portfolio' : selectedCategory.toLowerCase()} category
                {selectedYear === 'all' ? '.' : ` for ${selectedYear}.`}
              </p>
            </div>
          </div>
        </motion.section>

        {filteredData.length > 0 ? (
          <div className="grid gap-6">
            {filteredData.map((project, index) => (
              ((mode) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.15 }}
                className={`overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${classes.surface}`}
              >
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badge}`}>
                        {project.category}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badgeMuted}`}>
                        {project.date}
                      </span>
                    </div>

                    <h2 className={`mt-4 text-2xl font-semibold leading-tight ${classes.heading}`}>
                      {project.title}
                    </h2>
                    <p className={`mt-4 text-sm leading-7 ${classes.text}`}>
                      {project.description}
                    </p>

                    <div className="mt-6">
                      <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.labelMuted}`}>
                        Tech Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {project.technologies.slice(0, 10).map((techImg, techIndex) => (
                          <div
                            key={`${project.id}-${techIndex}`}
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${classes.surfaceMuted}`}
                          >
                            <img
                              src={techImg}
                              alt={`${project.title} technology ${techIndex + 1}`}
                              className="h-7 w-7 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7">
                      {project.link ? (
                        <button
                          type="button"
                          onClick={() => window.open(project.link, '_blank')}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonPrimary}`}
                        >
                          Live Preview
                        </button>
                      ) : (
                        <span className={`rounded-full px-5 py-2.5 text-sm font-medium ${classes.buttonGhost}`}>
                          Preview unavailable
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`p-6 sm:p-8 ${classes.surfaceAccent}`}>
                    <div
                      className={`flex h-full min-h-[320px] w-full items-center justify-center rounded-[28px] shadow-[0_18px_45px_rgba(148,163,184,0.16)] ${classes.imageFrame} ${
                        mode === 'portrait' ? 'p-5 sm:p-6' : 'p-3'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        onLoad={(event) => handleImageLoad(project.image, event)}
                        className={`h-full w-full rounded-[20px] ${
                          mode === 'portrait' ? 'object-contain object-center' : 'object-cover object-center'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
              ))(imageModes[project.image] || 'landscape')
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-[28px] p-8 text-center ${classes.surface}`}
          >
            <p className={`text-sm ${classes.textMuted}`}>No projects found for the selected category.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects
