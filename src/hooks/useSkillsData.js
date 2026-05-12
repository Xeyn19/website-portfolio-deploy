import { useEffect, useState } from 'react'
import fallbackSkills from '../assets/techdata.json'
import { supabase } from '../lib/supabaseClient'
import { normalizeAssetPath } from '../lib/projectContent'

const normalizeSkill = (skill) => ({
  ...skill,
  image: normalizeAssetPath(skill.image),
  techlink: skill.techlink ?? '',
})

const fallbackSkillSet = fallbackSkills.map(normalizeSkill)

const useSkillsData = () => {
  const [skills, setSkills] = useState(fallbackSkillSet)

  useEffect(() => {
    let cancelled = false

    const loadSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('id, techname, experience, techlink, image')
          .order('id', { ascending: true })

        if (cancelled) {
          return
        }

        if (!error && Array.isArray(data) && data.length > 0) {
          setSkills(data.map(normalizeSkill))
        }
      } catch (error) {
        console.error('Unable to load skills data.', error)
      }
    }

    loadSkills()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    skills,
  }
}

export default useSkillsData
