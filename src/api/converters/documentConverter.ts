import type { Document, DocumentResponse } from '@/types/api'

export const convertDocumentResponseToDocument = (response: DocumentResponse): Document => {
  return {
    id: response.id,
    content: response.content,
    creator_id: response.creator.id,
    creator_name: response.creator.name,
    creator: undefined,
    project_id: response.project?.id ?? null,
    project_name: response.project?.name,
    project: undefined,
    description: response.description,
    created_at: response.created_at,
    updated_at: response.updated_at,
    start_at: response.start_at,
    end_at: response.end_at,
    location: response.location,
    url: response.url,
    tags: response.tags,
  }
}

// 複数のドキュメントを変換
export const convertDocumentsResponseToDocuments = (responses: DocumentResponse[]): Document[] => {
  return responses.map(convertDocumentResponseToDocument)
}
