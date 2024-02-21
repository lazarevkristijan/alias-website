import { User } from "@auth0/auth0-react"
import axios from "axios"
import { login } from "../features/session/sessionSlice"
import { AppDispatch, RootState } from "../Store"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"
import { changeTheme } from "../features/theme/themeSlice"
import { useSelector } from "react-redux"

export const postLoginOrRegister = (
  auth0user: User | undefined,
  dispatch: AppDispatch,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .post(
      "http://localhost:5432/user/login-or-register",
      JSON.stringify(auth0user),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login(response.data))

      const theme = useSelector((state: RootState) => state.theme.current)

      document.body.style.transition = "background-color 0.5s ease"

      dispatch(changeTheme(theme))

      document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff"
      document.body.style.color = theme === "dark" ? "#fff" : "#000"

      setIsLoading(false)
    })
}

export const getAllServices = async () => {
  const res = await axios
    .get("http://localhost:5432/services/all")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.message}, ${errorNotifEnding}`)
    )

  return res
}
