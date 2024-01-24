import axios from "axios"

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
