import { useNavigate } from "react-router"
import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"

const ServicesMain = () => {
  const navigate = useNavigate()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div>
      <button onClick={() => navigate("коли")}>Коли</button>
      <button onClick={() => navigate("персонални")}>Персонални</button>
      <button onClick={() => navigate("вкъщи")}>Вкъщи</button>
      <br />
      <br />
      <button
        onClick={() => setIsAddDialogOpen(isAddDialogOpen ? false : true)}
      >
        Добави услуга
      </button>
      <AddServiceDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  )
}

export default ServicesMain
