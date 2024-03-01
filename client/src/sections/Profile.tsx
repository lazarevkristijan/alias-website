import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import { displayPhoneNumber, handleLogout } from "../Utils/ProfileUtils"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import "./Profile.scss"
import { capitalizeString } from "../Utils/SharedUtils"
import Button from "../components/Shared/Button"

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

  const theme = useSelector((state: RootState) => state.theme.current)

  if (!user) return

  return (
    <section
      className={`profile ${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {auth0loading ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <h2>Профил</h2>
          <div className={`creds-container`}>
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
              alt={`Профилна снимка на ${user?.first_name}`}
            />
            <div className="full-name-profile">
              <p>{user?.first_name}</p>
              {user.middle_name && <p>{user?.middle_name}</p>}
              <p>{user?.last_name}</p>
            </div>
            {user.job_title && <p>{user.job_title}</p>}
            {user.phone_number && (
              <p>{displayPhoneNumber(user.phone_number)}</p>
            )}
            <p>{capitalizeString(user?.role)}</p>
          </div>
          <Button onClick={() => handleLogout(auth0logout)}>Изход</Button>
          <Button onClick={() => navigate("/настройки")}>Настройки</Button>
        </section>
      )}
    </section>
  )
}

export default Profile
