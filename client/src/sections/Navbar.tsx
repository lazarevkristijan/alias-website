import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../Store"
import "./Navbar.scss"
import { useState } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated: auth0authenticated } = useAuth0()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = useSelector((state: RootState) => state.session.user)
  const theme = localStorage.getItem("theme")

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
        <img
          src="https://www.svgrepo.com/show/522595/menu-2.svg"
          alt="navbar menu icon"
          onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
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
                  Админ панел
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
