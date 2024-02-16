import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import { handleLogout } from "../Utils/ProfileUtils"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import "./Profile.scss"
import { capitalizeString } from "../Utils/SharedUtils"

const Profile = () => {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.session.user)
  const {
    isLoading: auth0loading,
    isAuthenticated: auth0authenticated,
    logout: auth0logout,
  } = useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  if (!user) return

  return (
    <section className="profile">
      {auth0loading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <h2>Профил</h2>
          <section className="creds-container">
            <img
              src={getPfpLink(user?.profile_picture || defaultPfpURL)}
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                backgroundColor: "#fff",
                borderRadius: "50%",
                border: "2px solid #000",
              }}
              alt={`профилна картинка на ${user?.first_name}`}
            />

            <p>{user?.first_name}</p>
            {user.middle_name && <p>{user?.middle_name}</p>}
            <p>{user?.last_name}</p>
            <p>{user?.email}</p>
            <p>{capitalizeString(user?.role)}</p>
          </section>
          <button onClick={() => handleLogout(auth0logout)}>Изход</button>
          <button onClick={() => navigate("/настройки")}>Настройки</button>
        </>
      )}
    </section>
  )
}

export default Profile
