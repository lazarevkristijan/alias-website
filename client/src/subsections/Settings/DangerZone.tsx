import { useAuth0 } from "@auth0/auth0-react"
import { handleDeleteUser } from "../../Utils/ProfileUtils"
import Button from "../../components/Shared/Button"

const DangerZone = () => {
  const { logout: auth0logout } = useAuth0()

  return (
    <section className="settings-danger-zone">
      <h4>Опасна зона</h4>
      <Button onClick={() => handleDeleteUser(auth0logout)}>
        Истрий профил
      </Button>
    </section>
  )
}

export default DangerZone
