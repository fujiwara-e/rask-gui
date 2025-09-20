import apiClient from '@/api/axios'
import type { Document } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFetchDocument = (id: string) => {
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get<Document>(`/documents/${id}`)
        setDocument(response.data)
      } catch (error) {
        console.error('Error fetching document:', error)
      }
    }
    fetchDocument()
  }, [id])
  return document
}
