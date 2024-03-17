import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllHiddenServices } from "../Utils/AdminUtils"
import { Service } from "../Types"
import "./AdminDashboard.scss"
import HiddenServiceCard from "../components/Admin/HiddenServiceCard"

const AdminDashboardHiddenServ = () => {
  const theme = useSelector((state: RootState) => state.theme.current)

  const { isLoading: areHiddenServicesLoading, data: hiddenServices } =
    useQuery<Service[]>({
      queryKey: ["all-hidden-services"],
      queryFn: () => getAllHiddenServices(),
    })

  return (
    <section
      className={`${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areHiddenServicesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <div>
            <h2>Всички скрити услуги</h2>
            <div className="admin-dashboard-container">
              {hiddenServices?.map((hs) => (
                <HiddenServiceCard
                  key={hs.id}
                  service={hs}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardHiddenServ
