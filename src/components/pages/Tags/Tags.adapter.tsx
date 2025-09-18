import { Suspense } from 'react'
import { useFetchTags } from './useFetchTags'
import { Tags } from './Tags'

const TagsAdapter = () => {
  const tags = useFetchTags()

  return <Tags tags={tags} />
}

export const TagsAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagsAdapter />
    </Suspense>
  )
}
