import apiClient from '@/api/axios'
import type { TaskPayload } from '@/types/api'
import { useState } from 'react'

export const useCreateTask = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTask = async (data: TaskPayload) => {
    setIsCreating(true)
    setError(null)

    try {
      const response = await apiClient.post('/tasks', data)
      return response.data
    } catch (error) {
      console.error('Error creating task:', error)
      setError('タスクの作成に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  return { createTask, isCreating, error }
}
