import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTask } from './useCreateTask'
import type { TaskPayload } from '@/types/api'
import { path } from '@/constants/application'
import { NewTask } from './NewTask'
import { useFetchUsers } from '../Users/useFetchUsers'
import { useFetchProjects } from '../Projects/useFetchProjects'

const NewTaskAdapter = () => {
  const navigate = useNavigate()
  const { createTask, isCreating } = useCreateTask()

  const users = useFetchUsers()
  const { projects } = useFetchProjects()

  const handleSubmit = async (payload: TaskPayload) => {
    try {
      await createTask(payload)
      navigate(path.tasks())
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }
  return <NewTask onSubmit={handleSubmit} isCreating={isCreating} users={users} projects={projects} />
}

export const NewTaskAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewTaskAdapter />
    </Suspense>
  )
}
