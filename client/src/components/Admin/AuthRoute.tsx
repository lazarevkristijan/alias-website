import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../../Store"
import { sendNotification } from "../../Utils/SharedUtils"

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)

  useEffect(() => {
    if (!user) {
      sendNotification("Нямате достъп, влезте в профила си първо!")
      navigate("/")
    }
  }, [user, navigate])

  return <>{children}</>
}

export default AuthRoute
