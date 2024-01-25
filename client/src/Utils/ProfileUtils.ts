import axios from "axios"
import { AppDispatch } from "../Store"
import { changeTheme } from "../features/settings/settingsSlice"

export const handleDeleteUser = async (auth0logout: () => void) => {
  await axios
    .delete("http://localhost:5432/user/delete-user", { withCredentials: true })
    .then(() => {
      auth0logout()
    })
}

export const handleLogout = async (auth0logout: () => void) => {
  await axios
    .get("http://localhost:5432/user/logout", {
      withCredentials: true,
    })
    .then(() => {
      auth0logout()
    })
}

export const handleChangeTheme = (theme: string, dispatch: AppDispatch) => {
  axios
    .patch(
      "http://localhost:5432/user-settings/change-theme",
      JSON.stringify({ theme: theme }),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    .then(() => {
      document.body.style.backgroundColor = theme === "dark" ? "#333" : "#ccc"
      dispatch(changeTheme(theme))
    })
}
