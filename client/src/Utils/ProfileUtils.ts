import axios from "axios"
import { AppDispatch } from "../Store"
import { login } from "../features/session/sessionSlice"
import { UserTypes } from "../Types"

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

type LocalUserDataTypes = {
  firstName: string
  lastName: string
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
