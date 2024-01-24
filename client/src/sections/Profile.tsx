import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import { handleDeleteUser } from "../Utils/ProfileUtils"

const Profile = () => {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.session.user)
  const { isAuthenticated: auth0authenticated, logout: auth0logout } =
    useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  return (
    <div>
      <p> {user?.first_name}</p>
      <p> {user?.last_name}</p>
      <p> {user?.email}</p>
      <p> {user?.id}</p>
      <br />
      <img
        src={user?.profile_picture}
        alt={`${user?.first_name}'s profile picture`}
      />
      <br />
      <button onClick={() => handleDeleteUser(auth0logout)}>delete user</button>
    </div>
  )
}

export default Profile
