import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllPurchases } from "../Utils/AdminUtils"
import { Purchase } from "../Types"
import "./AdminDashboard.scss"
import PurchaseCard from "../components/Admin/PurchaseCard"

const AdminDashboardPurchases = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  const { isLoading: arePurchasesLoading, data: allPurchases } = useQuery<
    Purchase[]
  >({
    queryKey: ["all-purchases"],
    queryFn: () => getAllPurchases(),
  })

  return (
    <section
      className={`${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {arePurchasesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section className="admin-dashboard">
          <div>
            <h2>Всички покупки</h2>
            <div className="admin-dashboard-container">
              {allPurchases?.map((purchase) => (
                <PurchaseCard
                  key={purchase.id}
                  purchase={purchase}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardPurchases
