import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"
import ChangeTheme from "../subsections/Settings/ChangeTheme"
import DangerZone from "../subsections/Settings/DangerZone"
import "./Settings.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Settings = () => {
  const navigate = useNavigate()

  const { isLoading: auth0loading, isAuthenticated: auth0authenticated } =
    useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <section className="settings">
      {auth0loading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <h2>Настройки</h2>
          <section
            className={`settings-content ${
              theme === "dark" ? "dark-bg" : "light-bg"
            }`}
          >
            <ProfilePicture />
            <ChangeCredentials />
            <ChangeTheme />
            <DangerZone />
          </section>
        </>
      )}
    </section>
  )
}

export default Settings
