import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes, useLocation } from "react-router"
import { useDispatch } from "react-redux"
import { Home, Profile } from "./sections"
import "./app.scss"
import Settings from "./sections/Settings"
import Navbar from "./sections/Navbar"
import CarServices from "./sections/CarServices"
import ServicesMain from "./sections/ServicesMain"
import PersonalServices from "./sections/PersonalServices"
import HomeServices from "./sections/HomeServices"
import SingleService from "./sections/SingleService"
import ProviderProfile from "./sections/ProviderProfile"
import ServiceProviders from "./sections/ServiceProviders"
import AdminDashboard from "./sections/AdminDashboard"
import AdminUserView from "./sections/AdminUserView"
import Footer from "./sections/Footer"

const App = () => {
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
        <p>Зареждане...</p>
      ) : (
        <main>
          <Navbar />
          <div className="all-routes">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/профил"
                element={<Profile />}
              />
              <Route
                path="/настройки"
                element={<Settings />}
              />
              <Route
                path="/услуги"
                element={<ServicesMain />}
              />
              <Route
                path="услуги/коли"
                element={<CarServices />}
              />
              <Route
                path="услуги/:category/:id"
                element={<SingleService />}
              />

              <Route
                path="услуги/персонални"
                element={<PersonalServices />}
              />
              <Route
                path="услуги/вкъщи"
                element={<HomeServices />}
              />
              <Route
                path="служители"
                element={<ServiceProviders />}
              />
              <Route
                path="служител/:id"
                element={<ProviderProfile />}
              />
              <Route
                path="admin-dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="admin-dashboard/user/:id"
                element={<AdminUserView />}
              />
              <Route
                path="*"
                element={<h2>Не е намерено</h2>}
              />
            </Routes>
          </div>

          <Footer />
        </main>
      )}
    </>
  )
}

export default App
