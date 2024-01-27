import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"
import { handleChangeTheme } from "../Utils/ProfileUtils"
import { useDispatch } from "react-redux"
import ChangeTheme from "../subsections/Settings/ChangeTheme"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated: auth0authenticated } = useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  return (
    <div>
      <ProfilePicture />
      <ChangeTheme />
      <ChangeCredentials />
    </div>
  )
}

export default Settings
