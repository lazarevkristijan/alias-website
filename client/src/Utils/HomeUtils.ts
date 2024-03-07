import { User } from "@auth0/auth0-react"
import axios from "axios"
import { login } from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"
import { changeTheme } from "../features/theme/themeSlice"

export const postLoginOrRegister = (
  auth0user: User | undefined,
  dispatch: AppDispatch,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .post(
      "http://localhost:5432/user/authenticate",
      JSON.stringify(auth0user),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login(response.data))

      const theme = localStorage.getItem("theme")

      document.body.style.transition = "background-color 0.5s ease"

      dispatch(changeTheme(theme))

      document.body.style.backgroundColor =
        theme === "dark" ? "#121212" : "#f0f0f0"
      document.body.style.color = theme === "dark" ? "#f0f0f0" : "#121212"

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
