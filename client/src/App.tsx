import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Home, Profile } from "./sections"

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const {
    loginWithPopup,
    isAuthenticated: auth0authenticated,
    user: auth0user,
    isLoading: auth0loading,
  } = useAuth0()

  useEffect(() => {
    auth0authenticated && postLoginOrRegister(auth0user, dispatch, setIsLoading)
    !auth0authenticated && !auth0loading && setIsLoading(false)
  }, [auth0authenticated, auth0user, dispatch, auth0loading])

  return (
    <>
      {!isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", gap: 10, listStyle: "none" }}>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/profile")}>profile</li>
            </ul>

            {!auth0authenticated && (
              <button onClick={() => loginWithPopup()}>login</button>
            )}
          </nav>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="*"
              element={<h2>Not found</h2>}
            />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
