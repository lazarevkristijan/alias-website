import { useAuth0 } from "@auth0/auth0-react"
import { handleDeleteUser } from "../../Utils/ProfileUtils"

const DangerZone = () => {
  const { logout: auth0logout } = useAuth0()

  return (
    <section className="settings-danger-zone">
      <h4>Опасна зона</h4>
      <button onDoubleClick={() => handleDeleteUser(auth0logout)}>
        Истрий профил
      </button>
    </section>
  )
}

export default DangerZone
