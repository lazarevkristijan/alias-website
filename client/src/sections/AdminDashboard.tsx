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
        className={`box-shadow-${
          theme === "dark" ? "white dark-bg" : "black light-bg"
        }`}
      >
        <Button onClick={() => navigate("users")}>Потребители</Button>
        <Button onClick={() => navigate("orders")}>Покупки</Button>
        <Button onClick={() => navigate("hidden-services")}>
          Скрити услуги
        </Button>
        <Button onClick={() => navigate("hidden-categories")}>
          Скрити категории
        </Button>
      </section>
    </section>
  )
}

export default AdminDashboard
