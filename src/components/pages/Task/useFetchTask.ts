import { useEffect, useState } from "react"
import apiClient from "@/api/axios"

import type { Task } from "@/types/api"

export const useFetchTask = (id: string) => {
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiClient.get<Task>(`/tasks/${id}`)
        setTask(response.data)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }
    fetchTask()
  }, [id])
  return task
}
