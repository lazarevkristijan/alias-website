import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllOrders, handleOrderStatusChange } from "../Utils/AdminUtils"
import { Order } from "../Types"
import "./AdminDashboard.scss"
import OrderCard from "../components/Shared/OrderCard"
import Button from "../components/Shared/Button"

const AdminDashboardOrders = () => {
  const theme = useSelector((state: RootState) => state.theme.current)

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
        <section>
          <div>
            <h2>Всички покупки</h2>
            <div className="admin-dashboard-container">
              {allOrders?.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                >
                  <Button
                    onClick={() => handleOrderStatusChange(order.id)}
                    disabled={Boolean(order.finished)}
                  >
                    Маркирай свършена
                  </Button>
                </OrderCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardOrders
