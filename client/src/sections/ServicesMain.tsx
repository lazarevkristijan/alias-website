import { useNavigate } from "react-router"
import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"

const ServicesMain = () => {
  const navigate = useNavigate()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div>
      ServicesMain
      <button onClick={() => navigate("car")}>car services</button>
      <button onClick={() => navigate("personal")}>personal services</button>
      <button onClick={() => navigate("home")}>home services</button>
      <br />
      <br />
      <button
        onClick={() => setIsAddDialogOpen(isAddDialogOpen ? false : true)}
      >
        add service
      </button>
      <AddServiceDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  )
}

export default ServicesMain
