import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../Store"
import "./Navbar.scss"

const Navbar = () => {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated: auth0authenticated } = useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <nav className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}>
      <div className="nav-large">
        <ul>
          <li onClick={() => navigate("/")}>Начало</li>
          <li onClick={() => navigate("/услуги")}>Услуги</li>
          <li onClick={() => navigate("/служители")}>Служители</li>
        </ul>

        <img
          src="alias.png"
          alt="Logo"
        />

        <ul className="right-part-nav">
          {auth0authenticated ? (
            <>
              <li onClick={() => navigate("/профил")}>Профил</li>
              <li onClick={() => navigate("/настройки")}>Настройки</li>
            </>
          ) : (
            <li onClick={() => loginWithPopup()}>Вход</li>
          )}
          {user?.role === "админ" && (
            <li onClick={() => navigate("/admin-dashboard")}>Админ панел</li>
          )}
        </ul>
      </div>

      <div className="nav-small">
        <p>hi</p>
      </div>
    </nav>
  )
}

export default Navbar
