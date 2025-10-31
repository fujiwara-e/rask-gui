import apiClient from '@/api/axios'
import { convertDocumentResponseToDocument } from '@/api/converters/documentConverter'
import type { Document, DocumentResponse } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFetchDocument = (id: string) => {
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get<DocumentResponse>(`/documents/${id}`)
        const converted = convertDocumentResponseToDocument(response.data)
        setDocument(converted)
      } catch (error) {
        console.error('Error fetching document:', error)
      }
    }
    fetchDocument()
  }, [id])
  return document
}
