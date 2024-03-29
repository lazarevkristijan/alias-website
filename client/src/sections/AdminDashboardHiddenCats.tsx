import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllHiddenCategories } from "../Utils/AdminUtils"
import { Category } from "../Types"
import "./AdminDashboard.scss"
import HiddenCategoryCard from "../components/Admin/HiddenCategoryCard"

const AdminDashboardHiddenCats = () => {
  const theme = useSelector((state: RootState) => state.theme.current)

  const { isLoading: areCategoriesLoading, data: allCategories } = useQuery<
    Category[]
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
                <HiddenCategoryCard
                  key={c.id}
                  category={c}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardHiddenCats
