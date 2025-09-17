import apiClient from '@/api/axios'
import { useState } from 'react'

export const useEditProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editProject = async (id: string, name: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.patch(`/projects/${id}`, { name })
      return response.data
    } catch (error) {
      console.error('Error editing project:', error)
      setError('プロジェクトの編集に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { editProject, isLoading, error }
}
