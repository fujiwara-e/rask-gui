import { useState } from 'react'
import apiClient from '@/api/axios'
import type { TaskPayload } from '@/types/api'

export const useEditTask = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editTask = async (id: string, data: Partial<TaskPayload>) => {
    setIsUpdating(true)
    setError(null)

    try {
      await apiClient.patch(`/tasks/${id}`, data)
    } catch (error) {
      console.error('Error editing task:', error)
      setError('タスクの編集に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsUpdating(false)
    }
  }
  return { editTask, isUpdating, error }
}
