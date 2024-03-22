import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { RootState } from "../Store"
import { User } from "../Types"
import { getSingleUser } from "../Utils/AdminUtils"
import AdminEditUserSection from "./AdminEditUserSection"

const AdminUserView = () => {
  const { id } = useParams()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { data: fetchedUser, isFetching: isUserFetching } = useQuery<User>({
    queryKey: ["single-user"],
    queryFn: () => getSingleUser(Number(id)),
  })

  if (!fetchedUser) return

  return (
    <section className={`${theme === "dark" ? "dark-bg" : "light-bg"}`}>
      {isUserFetching ? (
        <p>Зареждане...</p>
      ) : (
        <AdminEditUserSection fetchedUser={fetchedUser} />
      )}
    </section>
  )
}

export default AdminUserView
