import { useCallback, useEffect, useState } from 'react'
import type { Document, DocumentResponse } from '@/types/api'
import apiClient from '@/api/axios'
import { convertDocumentsResponseToDocuments } from '@/api/converters/documentConverter'

export const useFetchDocuments = () => {
  const [documents, setDocuments] = useState<Document[] | null>(null)

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await apiClient.get<DocumentResponse[]>('/documents')
      const converted = convertDocumentsResponseToDocuments(response.data)
      setDocuments(converted)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }, [])
  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])
  return { documents, refetch: fetchDocuments }
}
