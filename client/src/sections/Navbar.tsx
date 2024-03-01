import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../Store"
import "./Navbar.scss"
import { useState } from "react"
import NavLink from "../components/Navbar/NavLink"

const Navbar = () => {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated: auth0authenticated } = useAuth0()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <nav className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}>
      <div className="nav-large">
        <ul>
          <NavLink
            to="/"
            title="начало"
          />
          <NavLink to="услуги" />
          <NavLink to="служители" />
        </ul>

        <img
          src="alias.png"
          alt="Logo"
        />

        <ul className="right-part-nav">
          {auth0authenticated ? (
            <>
              <NavLink to="профил" />
              <NavLink to="настройки" />
            </>
          ) : (
            <a onClick={() => loginWithPopup()}>Вход</a>
          )}
          {user?.role === "админ" && (
            <NavLink
              to="admin-dashboard"
              title="админ"
            />
          )}
        </ul>
      </div>

      <div className="nav-small">
        <img
          src={`https://www.svgrepo.com/show/${
            theme === "dark" ? "525439" : "524740"
          }/menu-dots-circle.svg`}
          alt="navbar menu icon"
          onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
          className={`${isMenuOpen ? "rotate90" : ""}`}
        />

        {isMenuOpen && (
          <div
            className={`nav-small-menu ${
              theme === "dark" ? "dark-bg" : "light-bg"
            }`}
          >
            <ul>
              <li
                className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate("/")
                }}
              >
                Начало
              </li>
              <li
                className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                onClick={() => {
                  navigate("/услуги")
                  setIsMenuOpen(false)
                }}
              >
                Услуги
              </li>
              <li
                className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                onClick={() => {
                  navigate("/служители")
                  setIsMenuOpen(false)
                }}
              >
                Служители
              </li>
              {auth0authenticated ? (
                <>
                  <li
                    className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                    onClick={() => {
                      navigate("/профил")
                      setIsMenuOpen(false)
                    }}
                  >
                    Профил
                  </li>
                  <li
                    className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                    onClick={() => {
                      navigate("/настройки")
                      setIsMenuOpen(false)
                    }}
                  >
                    Настройки
                  </li>
                </>
              ) : (
                <li
                  className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                  onClick={() => loginWithPopup()}
                >
                  Вход
                </li>
              )}
              {user?.role === "админ" && (
                <li
                  className={`${theme === "dark" ? "dark-nav" : "light-nav"}`}
                  onClick={() => {
                    navigate("/admin-dashboard")
                    setIsMenuOpen(false)
                  }}
                >
                  Админ
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
