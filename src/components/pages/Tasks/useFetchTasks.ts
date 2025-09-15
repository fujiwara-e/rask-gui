import { useEffect, useState } from 'react'
import axios from 'axios'

import type { Task } from '@/types/api'

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('/api/tasks')
        setTasks(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [])
  return tasks
}



