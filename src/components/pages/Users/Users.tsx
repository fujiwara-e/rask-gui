import type { User } from "@/types/api"

type Props = {
  users: User[]
}
export const Users = ({ users }: Props) => {
  return (
    <div>
      <div>Users Page</div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}