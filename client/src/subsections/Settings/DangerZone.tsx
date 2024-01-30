import { useAuth0 } from "@auth0/auth0-react"
import { handleDeleteUser } from "../../Utils/ProfileUtils"

const DangerZone = () => {
  const { logout: auth0logout } = useAuth0()

  return (
    <div>
      <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
        Опасна зона
      </p>
      <button onDoubleClick={() => handleDeleteUser(auth0logout)}>
        Истрий профил
      </button>
    </div>
  )
}

export default DangerZone
