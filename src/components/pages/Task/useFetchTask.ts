import { useEffect, useState } from 'react'
import axios from 'axios'

import type { Task } from '@/types/api'

export const useFetchTask = (id: string) => {
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<Task>(`/api/tasks/${id}`)
        setTask(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTask()
  }, [id])
  return task
}



