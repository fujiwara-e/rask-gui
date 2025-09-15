import { Suspense } from "react"
import { Users } from "./Users"
import { useFetchUsers } from "./useFetchUsers"

const UsersAdapter = () => {
  const users = useFetchUsers()

  return <Users users={users} />
}

export const UsersAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersAdapter />
    </Suspense>
  )
}

