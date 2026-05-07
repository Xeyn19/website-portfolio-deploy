import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getFallbackProjects, normalizeProject, sortProjects } from '../lib/projectContent'

const useProjectsData = ({ limit } = {}) => {
  const initialProjects = limit ? getFallbackProjects().slice(0, limit) : getFallbackProjects()
  const [projects, setProjects] = useState(initialProjects)
  const [loading, setLoading] = useState(false)

  const refreshProjects = useCallback(
    async ({ showSpinner = false } = {}) => {
      if (showSpinner) {
        setLoading(true)
      }

      try {
        let query = supabase
          .from('projects')
          .select('id, source_id, title, description, technologies, image, date, category, link')
          .order('date', { ascending: false })

        if (limit) {
          query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) {
          throw error
        }

        if (Array.isArray(data) && data.length > 0) {
          setProjects(sortProjects(data).map(normalizeProject))
        }
      } catch (error) {
        console.error('Unable to load projects.', error)
      } finally {
        if (showSpinner) {
          setLoading(false)
        }
      }
    },
    [limit],
  )

  useEffect(() => {
    refreshProjects()
  }, [refreshProjects])

  return {
    loading,
    projects,
    refreshProjects,
  }
}

export default useProjectsData
