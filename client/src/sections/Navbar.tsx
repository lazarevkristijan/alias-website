import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"

const Navbar = () => {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated: auth0authenticated } = useAuth0()

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <ul style={{ display: "flex", gap: 10, listStyle: "none" }}>
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
      </ul>

      {!auth0authenticated && (
        <button onClick={() => loginWithPopup()}>login</button>
      )}
    </nav>
  )
}

export default Navbar
