import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from './Tag'
import { useFetchTag } from './useFetchTag'

const TagAdapter = () => {
  const { id } = useParams<{ id: string }>()
  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const tag = useFetchTag(id)

  return tag ? <Tag tag={tag} /> : null
}

export const TagAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagAdapter />
    </Suspense>
  )
}
