import { Suspense } from 'react'
import { useFetchTask } from '../Task/useFetchTask'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchUsers } from '../Users/useFetchUsers'
import { useFetchProjects } from '../Projects/useFetchProjects'
import { path } from '@/constants/application'
import { EditTask } from './EditTask'
import type { TaskPayload } from '@/types/api'
import { useEditTask } from './useEditTask'

const EditTaskAdapter = () => {
  const navigate = useNavigate()
  const { editTask, isUpdating } = useEditTask()
  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const task = useFetchTask(id)
  const users = useFetchUsers()
  const { projects } = useFetchProjects()

  const handleSubmit = async (payload: Partial<TaskPayload>) => {
    try {
      await editTask(id, payload)
      navigate(path.tasks())
    } catch (error) {
      console.error('Failed to edit task:', error)
    }
  }

  return task ? (
    <EditTask task={task} users={users} projects={projects} onSubmit={handleSubmit} isUpdating={isUpdating} />
  ) : null
}

export const EditTaskAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditTaskAdapter />
  </Suspense>
)
