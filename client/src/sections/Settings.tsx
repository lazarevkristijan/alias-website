import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"

const Settings = () => {
  const { isAuthenticated: auth0authenticated } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  return (
    <div>
      <ProfilePicture />
      <ChangeCredentials />
    </div>
  )
}

export default Settings
