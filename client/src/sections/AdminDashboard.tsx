import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../Utils/AdminUtils"
import { UserTypes } from "../Types"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)

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
    <div>
      {areUsersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <h2>Всички потребители:</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
            {allUsers?.map((singleUser) => (
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  textAlign: "center",
                  padding: 15,
                }}
              >
                <p>ID: {singleUser?.id}</p>
                <p>Име: {singleUser?.first_name}</p>
                <p>Фамилия: {singleUser?.last_name}</p>
                {singleUser?.middle_name && (
                  <p>Презиме: {singleUser?.middle_name}</p>
                )}
                <p>Имейл: {singleUser?.email}</p>
                <p>Роля: {singleUser?.role}</p>

                <button onClick={() => navigate(`user/${singleUser?.id}`)}>
                  Подробности
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
