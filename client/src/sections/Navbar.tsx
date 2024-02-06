import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../Store"

const Navbar = () => {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated: auth0authenticated } = useAuth0()
  const user = useSelector((state: RootState) => state.session.user)

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <ul style={{ display: "flex", gap: 20, listStyle: "none" }}>
        <li onClick={() => navigate("/")}>Начало</li>
        <li onClick={() => navigate("/услуги")}>Услуги</li>
        <li onClick={() => navigate("/служители")}>Служители</li>
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
    </nav>
  )
}

export default Navbar
