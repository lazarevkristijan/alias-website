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
import { capitalizeString } from "../Utils/SharedUtils"
import { displayPhoneNumber } from "../Utils/ProfileUtils"

const AdminDashboardUsers = () => {
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
    <section
      className={`${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areUsersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <div>
            <h2>Всички потребители:</h2>
            <div className="admin-dashboard-container">
              {allUsers?.map((singleUser) => (
                <div
                  key={singleUser?.id}
                  className={`admin-dashboard-single-user card-padding ${
                    theme === "dark"
                      ? "card-black-bg box-shadow-white"
                      : "card-white-bg box-shadow-black"
                  }`}
                >
                  <img
                    src={getPfpLink(
                      singleUser?.profile_picture || defaultPfpURL
                    )}
                    alt={`Профилна снимка на ${singleUser?.first_name}`}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <p>ID: {singleUser?.id}</p>
                  <p
                    className={`${
                      theme === "dark" ? "label-dark-bg" : "label-white-bg"
                    } `}
                  >
                    {singleUser?.first_name}{" "}
                    {singleUser?.middle_name && singleUser.middle_name}{" "}
                    {singleUser?.last_name}
                  </p>

                  <p>{singleUser?.job_title || "Няма Специялност"}</p>
                  <p>{singleUser?.email}</p>
                  <p>{capitalizeString(singleUser?.role || "")}</p>

                  <p>
                    {displayPhoneNumber(singleUser?.phone_number || "") ||
                      "Няма номер"}
                  </p>
                  <Button onClick={() => navigate(`/admin/user/${singleUser?.id}`)}>
                    Подробности
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default AdminDashboardUsers
