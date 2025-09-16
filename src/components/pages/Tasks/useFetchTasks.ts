import { useEffect, useState } from 'react'
import apiClient from '@/api/axios'

import type { Task } from '@/types/api'

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get<Task[]>('/tasks')
        setTasks(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [])
  return tasks
}



