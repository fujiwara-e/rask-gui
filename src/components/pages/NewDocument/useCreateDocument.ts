import apiClient from '@/api/axios'
import type { DocumentPayload } from '@/types/api'
import { useState } from 'react'

export const useCreateDocument = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createDocument = async (data: DocumentPayload) => {
    setIsCreating(true)
    setError(null)

    try {
      const response = await apiClient.post('/documents', data)
      return response.data
    } catch (error) {
      console.error('Error creating document:', error)
      setError('文書の作成に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  return { createDocument, isCreating, error }
}
