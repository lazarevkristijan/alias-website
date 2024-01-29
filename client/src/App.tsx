import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes } from "react-router"
import { useDispatch } from "react-redux"
import { Home, Profile } from "./sections"
import "./master.scss"
import Settings from "./sections/Settings"
import Navbar from "./sections/Navbar"
import CarServices from "./sections/CarServices"
import ServicesMain from "./sections/ServicesMain"
import PersonalServices from "./sections/PersonalServices"
import HomeServices from "./sections/HomeServices"

const App = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const {
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main
          style={{
            width: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Navbar />
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
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/services"
              element={<ServicesMain />}
            />
            <Route
              path="services/car"
              element={<CarServices />}
            />
            <Route
              path="services/personal"
              element={<PersonalServices />}
            />
            <Route
              path="services/home"
              element={<HomeServices />}
            />
            <Route
              path="*"
              element={<h2>Not found</h2>}
            />
          </Routes>
        </main>
      )}
    </>
  )
}

export default App
