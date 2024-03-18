import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const getAllServicesByCategory = async (category: string) => {
  const res = await axios
    .get(
      `https://alias-server-3sme.onrender.com/services/all/category/${category}`
    )
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}
