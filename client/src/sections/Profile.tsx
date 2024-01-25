import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import {
  handleChangeTheme,
  handleDeleteUser,
  handleLogout,
} from "../Utils/ProfileUtils"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)
  const { isAuthenticated: auth0authenticated, logout: auth0logout } =
    useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <p> {user?.first_name}</p>
        <p> {user?.last_name}</p>
        <p> {user?.email}</p>
      </div>
      <br />
      <img
        src={user?.profile_picture}
        alt={`${user?.first_name}'s profile picture`}
      />
      <br />
      <button onClick={() => handleChangeTheme("dark", dispatch)}>dark</button>
      <button onClick={() => handleChangeTheme("light", dispatch)}>
        light
      </button>
      <br />
      <br />

      <ChangeCredentials />

      <br />
      <br />

      <button onClick={() => handleDeleteUser(auth0logout)}>delete user</button>
      <button onClick={() => handleLogout(auth0logout)}>logout</button>
    </div>
  )
}

export default Profile
