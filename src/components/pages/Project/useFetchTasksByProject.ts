import { useEffect, useState } from 'react'
import axios from 'axios'

import type { Task } from '@/types/api'

export const useFetchTasksByProject = (project_name: string) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (!project_name) {
      setTasks([])
      return
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`/api/tasks?q[content_or_assigner_screen_name_or_description_or_project_name_cont]=${project_name}`)
        setTasks(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [project_name])
  return tasks
}