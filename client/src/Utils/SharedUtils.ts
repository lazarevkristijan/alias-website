import axios from "axios"
import { AddServiceTypes } from "../Types"
import { errorNotifEnding } from "../constants"

export const handleAddService = (
  e: React.FormEvent<HTMLFormElement>,
  data: AddServiceTypes
) => {
  e.preventDefault()

  axios
    .post("http://localhost:5432/services/add-service", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })
}

export const getAllServiceCategories = async () => {
  const res = await axios
    .get("http://localhost:5432/services/all-service-categories")
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const sendNotification = (message: string, success: boolean = false) => {
  const notification = document.createElement("div")

  notification.style.backgroundColor = success ? "#cfffdb" : "#ffb3b3"
  notification.style.color = "#000"
  notification.style.padding = "10px"

  notification.style.minWidth = "150px"
  notification.style.minHeight = "75px"
  notification.style.maxWidth = "250px"
  notification.style.minHeight = "50px"
  notification.style.width = "fit-content"
  notification.style.height = "fit-content"

  notification.style.textAlign = "center"
  notification.style.borderRadius = "2px"

  notification.style.position = "fixed"
  notification.style.bottom = "80px"
  notification.style.left = "30px"

  const textParagraph = document.createElement("p")
  textParagraph.textContent = message
  textParagraph.style.margin = "0px"

  document.body.appendChild(notification)
  notification.appendChild(textParagraph)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 4000)
}
