import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllHiddenCategories } from "../Utils/AdminUtils"
import { HiddenCategory } from "../Types"
import "./AdminDashboard.scss"
import HiddenCategoryCard from "../components/Admin/HiddenCategoryCard"

const AdminDashboardHiddenCats = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  const { isLoading: areCategoriesLoading, data: allCategories } = useQuery<
    HiddenCategory[]
  >({
    queryKey: ["all-hidden-categories"],
    queryFn: () => getAllHiddenCategories(),
  })

  return (
    <section
      className={`${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areCategoriesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <div>
            <h2>Всички скрити категории</h2>
            <div className="admin-dashboard-container">
              {allCategories?.map((c) => (
                <HiddenCategoryCard category={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardHiddenCats
