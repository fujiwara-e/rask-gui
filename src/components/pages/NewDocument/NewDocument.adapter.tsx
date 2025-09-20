import { path } from '@/constants/application'
import type { DocumentPayload } from '@/types/api'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewDocument } from './NewDocument'
import { useCreateDocument } from './useCreateDocument'
import { useFetchProjects } from '../Projects/useFetchProjects'

const NewDocumentAdapter = () => {
  const navigate = useNavigate()
  const { createDocument, isCreating } = useCreateDocument()

  const { projects } = useFetchProjects()

  const handleSubmit = async (payload: DocumentPayload) => {
    try {
      await createDocument(payload)
      navigate(path.documents())
    } catch (error) {
      console.error('Failed to create document:', error)
    }
  }

  return <NewDocument onSubmit={handleSubmit} isCreating={isCreating} projects={projects} />
}

export const NewDocumentAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewDocumentAdapter />
    </Suspense>
  )
}
