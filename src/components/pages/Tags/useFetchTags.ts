import apiClient from '@/api/axios'
import type { Tag } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFetchTags = () => {
  const [tags, setTags] = useState<Tag[]>([])
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await apiClient.get<Tag[]>('/tags')
        setTags(response.data)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }
    fetchTags()
  }, [])
  return tags
}
