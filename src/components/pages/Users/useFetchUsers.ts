import { useEffect, useState } from 'react'
import apiClient from '@/api/axios'

import type { User } from '@/types/api'

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get<User[]>('/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchUsers()
  }, [])
  return users
}