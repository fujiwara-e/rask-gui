import apiClient from '@/api/axios'
import type { User } from '@/types/api'
import { useEffect, useState } from 'react'

export const UseFetchUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>(`/users/${id}`)
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [id])
  return user
}
