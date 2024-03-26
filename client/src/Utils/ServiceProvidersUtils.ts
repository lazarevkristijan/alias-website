import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const getAllServicesAndProviders = async () => {
  const res = await axios
    .get("http://localhost:5432/services/all-providers")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getAllServiceProviders = async () => {
  const res = await axios
    .get("http://localhost:5432/providers")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}
