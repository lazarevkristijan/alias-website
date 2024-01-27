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
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/profile")}>profile</li>
        <li onClick={() => navigate("/settings")}>settings</li>
      </ul>

      {!auth0authenticated && (
        <button onClick={() => loginWithPopup()}>login</button>
      )}
    </nav>
  )
}

export default Navbar
