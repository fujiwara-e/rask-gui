import { useEffect, useState } from "react"

export const useEditTask = (id: string) => {

  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const editTask = async () => {
      setIsUpdating(true)
      try {
        // ここでタスクを更新する
        await axios.patch(`/api/tasks/${id}`,)
      } catch (error) {
        console.error('Error updating task:', error)
        setError('メモの更新に失敗しました。再度お試しください。')
        return false
      } finally {
        setIsUpdating(false)
      }
    }
    editTask()
  }, [id])

  return { isUpdating, error }
}