import type { Project } from "@/types/api"
import { useEffect, useState } from "react"
import axios from 'axios'

export const useFetchProjects = () => {

  const [projects, setProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('/api/projects')
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])
  return projects
}