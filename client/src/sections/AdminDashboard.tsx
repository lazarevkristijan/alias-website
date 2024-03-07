import { useNavigate } from "react-router"
import Button from "../components/Shared/Button"

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate("users")}>Потребители</Button>
      <Button onClick={() => navigate("purchases")}>Покупки</Button>
    </div>
  )
}

export default AdminDashboard
