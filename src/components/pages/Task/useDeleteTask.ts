import apiClient from '@/api/axios'
import { useState } from 'react'

export const useDeleteTask = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteTask = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await apiClient.delete(`/tasks/${id}`)
    } catch (error) {
      console.error('Error deleting task:', error)
      setError('タスクの削除に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { deleteTask, isLoading, error }
}
