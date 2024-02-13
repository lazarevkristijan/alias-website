import axios from "axios"
import { AddServiceTypes, ServiceTypes } from "../Types"
import { errorNotifEnding } from "../constants"
import React from "react"

export const handleAddService = async (
  e: React.FormEvent<HTMLFormElement>,
  data: AddServiceTypes
) => {
  e.preventDefault()

  await axios
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

export const getSingleService = async (category: string, id: string) => {
  const res = await axios
    .get(`http://localhost:5432/service/info/${category}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res[0]
}

export const getSingleServiceProviders = async (id: string) => {
  const res = await axios
    .get(`http://localhost:5432/service/providers/all/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const handleEditService = async (
  e: React.FormEvent<HTMLFormElement>,
  data: ServiceTypes
) => {
  e.preventDefault()

  await axios
    .patch(
      "http://localhost:5432/services/edit-service",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    .then((response) => {
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })
}

export const getProvider = async (id: number) => {
  const res = await axios
    .get(`http://localhost:5432/provider/${id}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res[0]
}

export const handleDeleteService = async (id: number) => {
  await axios
    .delete(`http://localhost:5432/services/delete-service`, {
      headers: { "Content-Type": "application/json" },
      data: { id },
      withCredentials: true,
    })
    .then((response) => {
      sendNotification(response.data.success, true)
      history.back()
    })
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
}

export const getAllCategoryProviders = async (category: string) => {
  const res = await axios
    .get(`http://localhost:5432/services/providers/${category}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getSingleProviderServices = async (id: string) => {
  const res = await axios
    .get(`http://localhost:5432/providers/single/services/${id}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setProfilePicture: (value: React.SetStateAction<File | null>) => void
) => {
  const file = e.target.files && e.target.files[0]
  if (file !== undefined && file !== null) {
    setProfilePicture(file)
  }
}

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
