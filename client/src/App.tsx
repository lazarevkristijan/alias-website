import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { postLoginOrRegister } from "./Utils/HomeUtils"
import { Route, Routes, useLocation } from "react-router"
import { useDispatch } from "react-redux"
import { Home, Profile } from "./sections"
import "./app.scss"
import Settings from "./sections/Settings"
import Navbar from "./sections/Navbar"
import ServicesMain from "./sections/ServicesMain"
import SingleService from "./sections/SingleService"
import ProviderProfile from "./sections/ProviderProfile"
import ServiceProviders from "./sections/ServiceProviders"
import AdminUserView from "./sections/AdminUserView"
import Footer from "./sections/Footer"
import SingleCategoryServices from "./sections/SingleCategoryServices"
import NotFound from "./sections/NotFound"
import AdminDashboardUsers from "./sections/AdminDashboardUsers"
import AdminDashboardPurchases from "./sections/AdminDashboardPurchases"
import AdminDashboard from "./sections/AdminDashboard"

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
        <div className="app-loading-container">
          <img
            src="alias.png"
            alt="alias"
          />
          <p>Зареждане...</p>
        </div>
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
                path="услуги/:category"
                element={<SingleCategoryServices />}
              />
              <Route
                path="услуги/:category/:id"
                element={<SingleService />}
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
                path="admin"
                element={<AdminDashboard />}
              />
              <Route
                path="admin/users"
                element={<AdminDashboardUsers />}
              />
              <Route
                path="admin/user/:id"
                element={<AdminUserView />}
              />
              <Route
                path="admin/purchases"
                element={<AdminDashboardPurchases />}
              />
              <Route
                path="*"
                element={<NotFound />}
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
