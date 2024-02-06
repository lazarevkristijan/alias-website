import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const getAllUsers = async () => {
  const res = await axios
    .get("http://localhost:5432/users/all")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
  console.log(res)

  return res
}

export const getAllUserRoles = async () => {
  const res = await axios
    .get("http://localhost:5432/roles/all")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
  console.log(res)

  return res
}
