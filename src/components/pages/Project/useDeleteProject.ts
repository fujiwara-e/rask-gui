import apiClient from '@/api/axios'
import { useState } from 'react'

export const useDeleteProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteProject = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await apiClient.delete(`/projects/${id}`)
    } catch (error) {
      console.error('Error deleting project:', error)
      setError('プロジェクトの削除に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { deleteProject, isLoading, error }
}
