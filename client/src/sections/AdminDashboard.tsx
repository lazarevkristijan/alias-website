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
            {allUsers?.map((user) => (
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  textAlign: "center",
                  padding: 15,
                }}
              >
                <p>ID: {user?.id}</p>
                <p>Име: {user?.first_name}</p>
                <p>Фамилия: {user?.last_name}</p>
                {user?.middle_name && <p>Презиме: {user?.middle_name}</p>}
                <p>Имейл: {user?.email}</p>
                <p>Роля: {user?.role}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
