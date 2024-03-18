import axios from "axios"
import { AddService, Service } from "../Types"
import { errorNotifEnding } from "../constants"
import React from "react"
import { NavigateFunction } from "react-router"

export const handleAddService = async (
  e: React.FormEvent<HTMLFormElement>,
  data: AddService
) => {
  e.preventDefault()

  await axios
    .post(
      "https://alias-server-3sme.onrender.com/services/add-service",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })
}

export const getAllServiceCategories = async () => {
  const res = await axios
    .get(
      "https://alias-server-3sme.onrender.com/services/all-service-categories"
    )
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const sendNotification = (message: string, success: boolean = false) => {
  const notification = document.createElement("div")
  notification.classList.add("notification")
  notification.style.backgroundColor = success ? "#cfffdb" : "#ffb3b3"

  const textParagraph = document.createElement("p")
  textParagraph.textContent = message

  document.body.appendChild(notification)
  notification.appendChild(textParagraph)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 4000)
}

export const getSingleService = async (
  category: string,
  id: string,
  navigate: NavigateFunction
) => {
  const res = await axios
    .get(
      `https://alias-server-3sme.onrender.com/service/info/${category}/${id}`
    )
    .then((response) => {
      if (!response.data.length) {
        sendNotification("Услугата не е налична")
        navigate("/")
        return
      }
      return response.data
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res[0]
}

export const getSingleServiceProviders = async (id: string) => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/service/providers/all/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const handleEditService = async (
  e: React.FormEvent<HTMLFormElement>,
  data: Service
) => {
  e.preventDefault()

  await axios
    .patch(
      "https://alias-server-3sme.onrender.com/services/edit-service",
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
    .get(`https://alias-server-3sme.onrender.com/provider/${id}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res[0]
}

export const handleDeleteService = async (id: number) => {
  await axios
    .delete(`https://alias-server-3sme.onrender.com/services/delete-service`, {
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
    .get(
      `https://alias-server-3sme.onrender.com/services/providers/${category}`
    )
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getAllCategoryOrders = async (category: string) => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/orders/category/${category}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const getSingleProviderServices = async (id: string) => {
  const res = await axios
    .get(
      `https://alias-server-3sme.onrender.com/providers/single/services/${id}`
    )
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
