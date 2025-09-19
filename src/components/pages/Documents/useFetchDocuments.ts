import { useCallback, useEffect, useState } from 'react'
import type { Document } from '@/types/api'
import apiClient from '@/api/axios'

export const useFetchDocuments = () => {
  const [documents, setDocuments] = useState<Document[] | null>(null)

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await apiClient.get<Document[]>('/documents')
      setDocuments(response.data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }, [])
  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])
  return { documents, refetch: fetchDocuments }
}
