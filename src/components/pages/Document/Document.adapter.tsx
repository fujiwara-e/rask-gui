import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from './useFetchDocument'
import { Document } from './Document'

const DocumentAdapter = () => {
  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const document = useFetchDocument(id)

  return document ? <Document document={document} /> : null
}

export const DocumentAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentAdapter />
    </Suspense>
  )
}
