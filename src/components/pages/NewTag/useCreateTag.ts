import apiClient from '@/api/axios'
import { useState } from 'react'

export const useCreateTag = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTag = async (name: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.post('/tags', { name })
      return response.data
    } catch (error) {
      console.error('Error creating tag:', error)
      setError('タグの作成に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { createTag, isLoading, error }
}
