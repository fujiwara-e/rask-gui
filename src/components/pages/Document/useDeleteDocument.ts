import apiClient from '@/api/axios'
import { useState } from 'react'

export const useDeleteDocument = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteDocument = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await apiClient.delete(`/documents/${id}`)
    } catch (error) {
      console.error('Error deleting task:', error)
      setError('文書の削除に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { deleteDocument, isLoading, error }
}
