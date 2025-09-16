import type { Project } from "@/types/api"
import { useEffect, useState } from "react"
import apiClient from "@/api/axios"

export const useFetchProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiClient.get<Project>(`/projects/${id}`)
        setProject(response.data)
      } catch (error) {
        console.error('Error fetching project:', error)
      }
    }
    fetchProject()
  }, [id])
  return project
}