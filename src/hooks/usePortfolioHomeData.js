import useProjectsData from './useProjectsData'
import useSkillsData from './useSkillsData'
import { getFallbackProjects } from '../lib/projectContent'

const usePortfolioHomeData = () => {
  const { projects } = useProjectsData()
  const { skills } = useSkillsData()
  const safeProjects = Array.isArray(projects) && projects.length > 0 ? projects : getFallbackProjects()

  return {
    projects: safeProjects,
    skills,
  }
}

export default usePortfolioHomeData
