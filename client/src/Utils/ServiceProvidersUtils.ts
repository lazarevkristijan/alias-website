import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const getAllServicesAndProviders = async () => {
  const res = await axios
    .get("https://alias-server-3sme.onrender.com/services/all-providers")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getAllServiceProviders = async () => {
  const res = await axios
    .get("https://alias-server-3sme.onrender.com/all-providers")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}
