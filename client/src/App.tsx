import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes, useNavigate } from "react-router"
import { useDispatch } from "react-redux"

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    loginWithPopup,
    logout,
    isAuthenticated: auth0authenticated,
    user: auth0user,
  } = useAuth0()

  useEffect(() => {
    auth0authenticated && postLoginOrRegister(auth0user, dispatch)
  }, [auth0authenticated, auth0user, dispatch])

  return (
    <>
      {auth0authenticated ? (
        <>
          <button onClick={() => logout()}>logout</button>

          <p>{auth0user?.given_name}</p>
          <p>{auth0user?.family_name}</p>
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
