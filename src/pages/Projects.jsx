import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import projectdata from '../assets/data.json'
import Spinner from '../components/Spinner'

const categories = ['all', 'Front-End', 'Full Stack']

const Projects = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [imageModes, setImageModes] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setData(projectdata)
        setFilteredData(projectdata)
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
    setFilteredData(category === 'all' ? data : data.filter((project) => project.category === category))
  }

  const handleImageLoad = (imageSrc, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const nextMode = naturalHeight > naturalWidth ? 'portrait' : 'landscape'

    setImageModes((prev) => (prev[imageSrc] === nextMode ? prev : { ...prev, [imageSrc]: nextMode }))
  }

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
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
                Selected Work
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                Projects
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                A collection of front-end and full-stack projects focused on responsive interfaces,
                user-centered interaction, and practical functionality. Each build reflects hands-on
                experience with modern web tools, data handling, and real deployment workflows.
              </p>
            </div>

            <div className="rounded-[28px] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                Filter
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategory === category

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryFilter(category)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-amber-400 text-slate-900 shadow-[0_10px_25px_rgba(251,191,36,0.35)]'
                          : 'border border-white/10 bg-white/10 text-slate-100 hover:bg-white/16'
                      }`}
                    >
                      {category === 'all' ? 'All Projects' : category}
                    </button>
                  )
                })}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Showing {filteredData.length} project{filteredData.length === 1 ? '' : 's'} in the{' '}
                {selectedCategory === 'all' ? 'full portfolio' : selectedCategory.toLowerCase()} category.
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
                className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                        {project.category}
                      </span>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {project.date}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900">
                      {project.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-700">
                      {project.description}
                    </p>

                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        Tech Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {project.technologies.slice(0, 10).map((techImg, techIndex) => (
                          <div
                            key={`${project.id}-${techIndex}`}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50"
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
                          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-500 hover:text-slate-950"
                        >
                          Live Preview
                        </button>
                      ) : (
                        <span className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-500">
                          Preview unavailable
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-[linear-gradient(135deg,_#fff7ed_0%,_#ffffff_55%,_#eff6ff_100%)] p-6 sm:p-8">
                    <div
                      className={`flex h-full min-h-[320px] w-full items-center justify-center rounded-[28px] border border-white/80 bg-white shadow-[0_18px_45px_rgba(148,163,184,0.16)] ${
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
            className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm text-slate-600">No projects found for the selected category.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects
