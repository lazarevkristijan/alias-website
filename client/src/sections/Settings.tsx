import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"
import ChangeTheme from "../subsections/Settings/ChangeTheme"
import DangerZone from "../subsections/Settings/DangerZone"

const Settings = () => {
  const navigate = useNavigate()

  const { isAuthenticated: auth0authenticated } = useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  return (
    <div>
      <ProfilePicture />
      <br />
      <ChangeTheme />
      <br />
      <ChangeCredentials />
      <br />
      <DangerZone />
    </div>
  )
}

export default Settings
