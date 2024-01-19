import axios from "axios"
import { useQuery } from "react-query"
import { UserTypes } from "./Types"

const App = () => {
  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:5432/all-users")
    return res.data
  }
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
