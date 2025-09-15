import { useEffect, useState } from 'react'
import axios from 'axios'

import type { User } from '@/types/api'

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchUsers()
  }, [])
  return users
}