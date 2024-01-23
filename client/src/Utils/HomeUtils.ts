import { User } from "@auth0/auth0-react"
import axios from "axios"

export const postLoginOrRegister = (auth0user: User | undefined) => {
  axios.post(
    "http://localhost:5432/login-or-register",
    JSON.stringify(auth0user),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  )
}
