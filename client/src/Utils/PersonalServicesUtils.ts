import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"

export const getAllPersonalServices = async () => {
  const res = await axios
    .get("http://localhost:5432/services/all/personal")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}
