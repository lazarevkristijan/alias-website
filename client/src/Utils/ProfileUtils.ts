import axios from "axios"
import { AppDispatch } from "../Store"
import { login } from "../features/session/sessionSlice"
import { UserTypes } from "../Types"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const handleDeleteUser = async (auth0logout: () => void) => {
  await axios
    .delete("http://localhost:5432/user/delete-user", { withCredentials: true })
    .then(() => {
      localStorage.removeItem("theme")
      document.body.style.backgroundColor = "#f0f0f0"
      document.body.style.color = "#121212"

      auth0logout()
    })
}

export const handleLogout = async (auth0logout: () => void) => {
  await axios
    .get("http://localhost:5432/user/logout", {
      withCredentials: true,
    })
    .then(() => {
      localStorage.removeItem("theme")
      document.body.style.backgroundColor = "#f0f0f0"
      document.body.style.color = "#121212"
      auth0logout()
    })
}

type LocalUserDataTypes = {
  firstName: string
  lastName: string
  middleName: string
}
export const handleChangeCredentials = (
  e: React.FormEvent<HTMLFormElement>,
  userData: LocalUserDataTypes,
  user: UserTypes,
  dispatch: AppDispatch
) => {
  e.preventDefault()

  axios
    .patch(
      "http://localhost:5432/user-settings/change-creds",
      JSON.stringify(userData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login({ ...user, ...response.data }))
    })
}

export const displayPhoneNumber = (phoneNumber: string) => {
  phoneNumber === phoneNumber.replace(" ", "")
  if (phoneNumber[0] === "0") {
    return (
      phoneNumber.slice(0, 3) +
      " " +
      phoneNumber.slice(3, 6) +
      " " +
      phoneNumber.slice(6)
    )
  }
  return phoneNumber
}

export const getAllUserOrders = async (id: number) => {
  const res = await axios
    .get(`http://localhost:5432/orders/user/${id}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}
