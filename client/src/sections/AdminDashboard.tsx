import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../Utils/AdminUtils"
import { UserTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import Button from "../components/Shared/Button"
import "./AdminDashboard.scss"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  const { isLoading: areUsersLoading, data: allUsers } = useQuery<UserTypes[]>({
    queryKey: ["all-users"],
    queryFn: () => getAllUsers(),
  })

  return (
    <section className={`${theme === "dark" ? "dark-bg" : "light-bg"}`}>
      {areUsersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section className="admin-dashboard">
          <h2>Всички потребители:</h2>
          <div className="admin-dashboard-users-container">
            {allUsers?.map((singleUser) => (
              <div
                key={singleUser?.id}
                className={`admin-dashboard-single-user card-padding ${
                  theme === "dark" ? "black-bg" : "white-bg"
                }`}
              >
                <img
                  src={getPfpLink(singleUser?.profile_picture || defaultPfpURL)}
                  alt={`Профилна снимка на ${singleUser?.first_name}`}
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
                <p>ID: {singleUser?.id}</p>
                <p
                  className={`${
                    theme === "dark" ? "label-dark-bg" : "label-white-bg"
                  } `}
                >
                  Име: {singleUser?.first_name}
                </p>
                <p>Фамилия: {singleUser?.last_name}</p>
                {singleUser?.middle_name && (
                  <p>Презиме: {singleUser?.middle_name}</p>
                )}
                {singleUser?.job_title && (
                  <p>Специялност: {singleUser?.job_title}</p>
                )}
                <p>Имейл: {singleUser?.email}</p>
                <p>Роля: {singleUser?.role}</p>

                <Button onClick={() => navigate(`user/${singleUser?.id}`)}>
                  Подробности
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboard
