import { useEffect, useState } from 'react'
import fallbackSkills from '../assets/techdata.json'
import { supabase } from '../lib/supabaseClient'
import useProjectsData from './useProjectsData'
import { normalizeAssetPath } from '../lib/projectContent'

const normalizeSkill = (skill) => ({
  ...skill,
  image: normalizeAssetPath(skill.image),
  techlink: skill.techlink ?? '',
})

const usePortfolioHomeData = () => {
  const { projects } = useProjectsData()
  const [skills, setSkills] = useState(
    fallbackSkills.map(normalizeSkill),
  )

  useEffect(() => {
    let cancelled = false

    const loadHomeData = async () => {
      try {
        const { data: skillData, error: skillError } = await supabase
          .from('skills')
          .select('id, techname, experience, techlink, image')
          .order('id', { ascending: true })

        if (cancelled) {
          return
        }

        if (!skillError && Array.isArray(skillData) && skillData.length > 0) {
          setSkills(skillData.map(normalizeSkill))
        }
      } catch (error) {
        console.error('Unable to load homepage skills.', error)
      }
    }

    loadHomeData()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    projects,
    skills,
  }
}

export default usePortfolioHomeData
