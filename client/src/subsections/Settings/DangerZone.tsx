import { useAuth0 } from "@auth0/auth0-react"
import { handleDeleteUser } from "../../Utils/ProfileUtils"
import Button from "../../components/Shared/Button"
import {  useState } from "react"
import ConfirmationDialog from "../../components/Shared/ConfirmationDialog"

const DangerZone = () => {
  const { logout: auth0logout } = useAuth0()
  const [isDeletUserDialogOpen, setIsDeletUserDialogOpen] = useState(false)

  return (
    <section className="settings-danger-zone">
      <h4>Опасна зона</h4>

      <Button onClick={() => setIsDeletUserDialogOpen(true)}>
        Истрий профил
      </Button>
      {isDeletUserDialogOpen && (
        <ConfirmationDialog
          cancelBtnEvent={() => setIsDeletUserDialogOpen(false)}
          deleteBtnEvent={() => handleDeleteUser(auth0logout)}
        />
      )}
    </section>
  )
}

export default DangerZone
