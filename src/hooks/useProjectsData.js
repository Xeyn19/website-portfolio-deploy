import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getFallbackProjects, normalizeProject, sortProjects } from '../lib/projectContent'

const projectSelectWithGallery = 'id, source_id, title, description, technologies, image, gallery_images, date, category, link'
const projectSelectLegacy = 'id, source_id, title, description, technologies, image, date, category, link'

const isMissingGalleryImagesError = (error) => {
  const errorText = `${error?.message ?? ''} ${error?.details ?? ''} ${error?.hint ?? ''}`.toLowerCase()
  return errorText.includes('gallery_images')
}

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
        const buildQuery = (selectFields) => {
          let query = supabase
            .from('projects')
            .select(selectFields)
            .order('date', { ascending: false })

          if (limit) {
            query = query.limit(limit)
          }

          return query
        }

        let { data, error } = await buildQuery(projectSelectWithGallery)

        if (error && isMissingGalleryImagesError(error)) {
          ;({ data, error } = await buildQuery(projectSelectLegacy))
        }

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
