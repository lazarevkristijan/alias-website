import { useNavigate } from "react-router"
import Button from "../components/Shared/Button"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <section>
      <section
        className={`box-shadow-${theme === "dark" ? "white dark-bg" : "black"}`}
      >
        <Button onClick={() => navigate("users")}>Потребители</Button>
        <Button onClick={() => navigate("purchases")}>Покупки</Button>
      </section>
    </section>
  )
}

export default AdminDashboard
