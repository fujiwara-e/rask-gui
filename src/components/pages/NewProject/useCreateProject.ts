import { useState } from "react"
import axios from "axios"

export const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createProject = async (name: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/projects', { name })
      return response.data
    } catch (error) {
      console.error('Error creating project:', error)
      setError('プロジェクトの作成に失敗しました。再度お試しください。')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { createProject, isLoading, error }
}