import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getFallbackSkills, normalizeSkill } from '../lib/projectContent'

const skillsSelectWithIcon = 'id, source_id, techname, experience, techlink, image, icon_key'
const skillsSelectLegacy = 'id, source_id, techname, experience, techlink, image'

const isMissingIconKeyError = (error) => {
  const errorText = `${error?.message ?? ''} ${error?.details ?? ''} ${error?.hint ?? ''}`.toLowerCase()
  return errorText.includes('icon_key')
}

const useSkillsData = () => {
  const [skills, setSkills] = useState(getFallbackSkills())
  const [loading, setLoading] = useState(false)

  const refreshSkills = useCallback(async ({ showSpinner = false } = {}) => {
    if (showSpinner) {
      setLoading(true)
    }

    try {
      const buildQuery = (selectFields) =>
        supabase
          .from('skills')
          .select(selectFields)
          .order('id', { ascending: true })

      let { data, error } = await buildQuery(skillsSelectWithIcon)

      if (error && isMissingIconKeyError(error)) {
        ;({ data, error } = await buildQuery(skillsSelectLegacy))
      }

      if (error) {
        throw error
      }

      if (Array.isArray(data)) {
        setSkills(data.map(normalizeSkill))
      }
    } catch (error) {
      console.error('Unable to load skills data.', error)
    } finally {
      if (showSpinner) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    refreshSkills()
  }, [refreshSkills])

  return {
    loading,
    refreshSkills,
    skills,
  }
}

export default useSkillsData
