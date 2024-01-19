import { useQuery } from "react-query"
import { UserTypes } from "./Types"
import { getAllUsers } from "./Utils/HeroUtils"

const App = () => {
  const { data: allUsers, isLoading: areUsersLoading } = useQuery(
    "all-users",
    getAllUsers
  )

  return (
    <>
      {areUsersLoading
        ? "Loading users"
        : allUsers.map((user: UserTypes) => (
            <p key={user.id}>{user.first_name}</p>
          ))}
    </>
  )
}

export default App
