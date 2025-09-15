import { Suspense } from 'react'
import { Task } from './Task'
import { useFetchTask } from './useFetchTask'
import { useParams } from 'react-router-dom'

const TaskAdapter = () => {
  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const task = useFetchTask(id)

  return task ? <Task task={task} taskId={id} /> : null
}

export const TaskAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskAdapter />
  </Suspense>
)