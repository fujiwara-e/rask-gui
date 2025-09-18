import { Suspense, useState, type FormEvent } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useCreateTag } from './useCreateTag'
// import { path } from '@/constants/application'
import { NewTag } from './NewTag'

const NewTagAdapter = () => {
  // const navigate = useNavigate()
  const [tagName, setTagName] = useState<string>('')
  const { createTag, isLoading } = useCreateTag()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!tagName.trim()) return

    await createTag(tagName)
    // navigate(path.tags())
  }

  return <NewTag tagName={tagName} onTagNameChange={setTagName} onSubmit={handleSubmit} isLoading={isLoading} />
}

export const NewTagAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewTagAdapter />
    </Suspense>
  )
}
