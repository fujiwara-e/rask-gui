import { Suspense } from 'react'
import { EditTask } from './EditTask'
import { useFetchTask } from '../Task/useFetchTask'
import { useParams } from 'react-router-dom'
import { useFetchUsers } from '../Users/useFetchUsers'

const EditTaskAdapter = () => {
  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const task = useFetchTask(id)
  const users = useFetchUsers()

  return task ? <EditTask task={task} users={users} /> : null
}

export const EditTaskAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditTaskAdapter />
  </Suspense>
)