import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { RootState } from "../Store"
import { useEffect } from "react"
import { UserTypes } from "../Types"
import { getSingleUser } from "../Utils/AdminUtils"
import AdminEditUserSection from "./AdminEditUserSection"

const AdminUserView = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const user = useSelector((state: RootState) => state.session.user)

  useEffect(() => {
    if (user?.role !== "админ") {
      navigate("/")
    }
  }, [user, navigate])

  const { data: fetchedUser, isFetching: isUserFetching } = useQuery<UserTypes>(
    {
      queryKey: ["single-user"],
      queryFn: () => getSingleUser(Number(id)),
    }
  )

  if (!fetchedUser) return

  return (
    <div>
      {isUserFetching ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            width: "fit-content",
            padding: 10,
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
          }}
        >
          <AdminEditUserSection fetchedUser={fetchedUser} />
        </div>
      )}
    </div>
  )
}

export default AdminUserView
