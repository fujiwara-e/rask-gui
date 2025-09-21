import { Suspense } from 'react'
import { Task } from './Task'
import { useFetchTask } from './useFetchTask'
import { useNavigate, useParams } from 'react-router-dom'
import { path } from '@/constants/application'
import { useDeleteTask } from './useDeleteTask'

const TaskAdapter = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteTask, isLoading } = useDeleteTask()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const task = useFetchTask(id)

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    navigate(path.tasks())
  }

  return task ? <Task task={task} taskId={id} onDelete={handleDelete} isDeleting={isLoading} /> : null
}

export const TaskAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskAdapter />
  </Suspense>
)
