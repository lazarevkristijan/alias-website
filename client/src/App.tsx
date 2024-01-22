import { useQuery } from "react-query"
import { UserTypes } from "./Types"
import { getAllUsers } from "./Utils/HeroUtils"
import { useAuth0 } from "@auth0/auth0-react"

const App = () => {
  const { loginWithPopup } = useAuth0()

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

      <button onClick={() => loginWithPopup()}>login</button>
    </>
  )
}

export default App
