import { Suspense } from 'react'
import { Tasks } from './Tasks'
import { useFetchTasks } from './useFetchTasks'

const TasksAdapter = () => {
  const tasks = useFetchTasks()

  return <Tasks tasks={tasks} />
}

export const TasksAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TasksAdapter />
  </Suspense>
)