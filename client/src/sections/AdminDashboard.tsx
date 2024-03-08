import { useNavigate } from "react-router"
import Button from "../components/Shared/Button"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)
  const user = useSelector((state: RootState) => state.session.user)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <section>
      <section
        className={`box-shadow-${
          theme === "dark" ? "white dark-bg" : "black light-bg"
        }`}
      >
        <Button onClick={() => navigate("users")}>Потребители</Button>
        <Button onClick={() => navigate("purchases")}>Покупки</Button>
      </section>
    </section>
  )
}

export default AdminDashboard
