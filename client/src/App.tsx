import { useQuery } from "react-query"
import { UserTypes } from "./Types"
import { getAllUsers } from "./Utils/HeroUtils"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes, useNavigate } from "react-router"

const App = () => {
  const navigate = useNavigate()

  const {
    loginWithPopup,
    logout,
    isAuthenticated: auth0authenticated,
    user: auth0user,
  } = useAuth0()

  const { data: allUsers, isLoading: areUsersLoading } = useQuery(
    "all-users",
    getAllUsers
  )

  useEffect(() => {
    auth0authenticated && postLoginOrRegister(auth0user)
  }, [auth0authenticated, auth0user])

  return (
    <>
      {areUsersLoading
        ? "Loading users"
        : allUsers.map((user: UserTypes) => (
            <p key={user.id}>{user.first_name}</p>
          ))}

      {auth0authenticated ? (
        <>
          <button onClick={() => logout()}>logout</button>
          <p>{auth0user?.email}</p>
        </>
      ) : (
        <button onClick={() => loginWithPopup()}>login</button>
      )}

      <nav>
        <button onClick={() => navigate("/")}>To home</button>
        <button onClick={() => navigate("/services")}>To services</button>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<h2>Home page</h2>}
        />
        <Route
          path="/services"
          element={<h2>Services page</h2>}
        />
        <Route
          path="*"
          element={<h2>Not found</h2>}
        />
      </Routes>
    </>
  )
}

export default App
