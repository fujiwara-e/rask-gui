import apiClient from '@/api/axios'
import type { Tag } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFetchTag = (id: string) => {
  const [tag, setTag] = useState<Tag | null>(null)

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await apiClient.get<Tag>(`/tags/${id}`)
        setTag(response.data)
      } catch (error) {
        console.error('Error fetching tag:', error)
      }
    }
    fetchTag()
  }, [id])
  return tag
}
