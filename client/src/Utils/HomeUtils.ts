import { User } from "@auth0/auth0-react"
import axios from "axios"
import { login } from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"

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
      setIsLoading(false)
    })
}
