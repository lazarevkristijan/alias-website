import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "../Utils/AdminUtils"
import { Order } from "../Types"
import "./AdminDashboard.scss"
import OrderCard from "../components/Admin/OrderCard"

const AdminDashboardOrders = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  const { isLoading: areOrdersLoading, data: allOrders } = useQuery<Order[]>({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrders(),
  })

  return (
    <section
      className={`${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areOrdersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section className="admin-dashboard">
          <div>
            <h2>Всички покупки</h2>
            <div className="admin-dashboard-container">
              {allOrders?.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardOrders
