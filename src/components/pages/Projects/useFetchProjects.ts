import type { Project } from "@/types/api"
import { useEffect, useState } from "react"
import apiClient from "@/api/axios"

export const useFetchProjects = () => {

  const [projects, setProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get<Project[]>('/projects')
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])
  return projects
}