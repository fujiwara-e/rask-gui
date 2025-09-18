import type { Project } from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import apiClient from '@/api/axios'

export const useFetchProjects = () => {
  const [projects, setProjects] = useState<Project[] | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      const response = await apiClient.get<Project[]>('/projects')
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])
  return { projects, refetch: fetchProjects }
}
