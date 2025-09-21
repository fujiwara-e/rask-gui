import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from './useFetchDocument'
import { Document } from './Document'
import { useDeleteDocument } from './useDeleteDocument'
import { path } from '@/constants/application'

const DocumentAdapter = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteDocument, isLoading } = useDeleteDocument()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const document = useFetchDocument(id)

  const handleDelete = async (id: string) => {
    await deleteDocument(id)
    navigate(path.documents())
  }

  return document ? <Document document={document} onDelete={handleDelete} isDeleting={isLoading} /> : null
}

export const DocumentAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentAdapter />
    </Suspense>
  )
}
