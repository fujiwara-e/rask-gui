import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { UseFetchUser } from './useFetchUser'
import { User } from './User'

const UserAdapter = () => {
  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const user = UseFetchUser(id)

  return user ? <User user={user} /> : null
}

export const UserAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserAdapter />
    </Suspense>
  )
}
