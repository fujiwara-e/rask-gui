import { Suspense } from 'react'
import { useFetchDocuments } from './useFetchDocuments'
import { Documents } from './Documents'

const DocumentsAdapter = () => {
  const { documents, refetch } = useFetchDocuments()

  return documents ? <Documents documents={documents} /> : null
}

export const DocumentsAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentsAdapter />
    </Suspense>
  )
}
