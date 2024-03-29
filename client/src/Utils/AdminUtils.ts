import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { defaultPfpURL, errorNotifEnding } from "../constants"
import { getPfpFileName } from "./SettingsUtils"
import { AddCategory, AdminEditUserData, User } from "../Types"
import { NavigateFunction } from "react-router"

export const getAllUsers = async () => {
  const res = await axios
    .get("https://alias-server-3sme.onrender.com/users/all", {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getSingleUser = async (id: number) => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/admin/get-user/${id}`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const handleAdminChangeProfilePicture = async (
  e: React.FormEvent<HTMLFormElement>,
  profilePicture: File | null,
  setProfilePicture: (value: React.SetStateAction<File | null>) => void,
  userData: AdminEditUserData,
  setNewUserData: (value: React.SetStateAction<AdminEditUserData>) => void,
  setIsChanging: (value: React.SetStateAction<boolean>) => void
) => {
  e.preventDefault()

  if (userData?.profile_picture) {
    handleAdminPfpDelete(userData.id, userData.profile_picture, setNewUserData)
  }

  if (profilePicture) {
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)

    await axios
      .patch(
        `https://alias-server-3sme.onrender.com/admin/user/change-profile-picture/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        sendNotification(response.data.success, true)
        setNewUserData({
          ...userData,
          profile_picture: response.data.profilePicture,
        })
      })
      .catch((error) =>
        sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
      )
      .finally(() => setIsChanging(false))
  } else {
    sendNotification("Не е избран файл")
  }
  setProfilePicture(null)
}

export const handleAdminPfpDelete = async (
  userId: number,
  userPfp: string,
  setNewUserData: (value: React.SetStateAction<AdminEditUserData>) => void
) => {
  const pfpFileName = getPfpFileName(userPfp)

  await axios
    .delete(
      `https://alias-server-3sme.onrender.com/admin/user/delete-profile-picture/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify({ pfpFileName: pfpFileName }),
      }
    )
    .then((response) => {
      sendNotification(response.data.success, true)
      setNewUserData((prev) => ({
        ...prev,
        profile_picture: defaultPfpURL,
      }))
    })
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
}

export const handleAdminCredsChange = async (userData: User) => {
  await axios
    .patch(
      `https://alias-server-3sme.onrender.com/admin/user/change-credentials/${userData?.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      sendNotification(response.data.success, true)
    })
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
}

export const handleAdminUserDelete = async (
  id: number,
  navigate: NavigateFunction
) => {
  await axios
    .delete(`https://alias-server-3sme.onrender.com/admin/user/delete/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      sendNotification(response.data.success, true)
      navigate("/admin")
    })
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}}`)
    )
}

export const getAllOrders = async () => {
  const res = await axios
    .get("https://alias-server-3sme.onrender.com/orders", {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const handleOrderStatusChange = async (id: number) => {
  await axios
    .patch(
      `https://alias-server-3sme.onrender.com/order/mark-finished/${id}`,
      {},
      {
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

export const getProviderOrders = async (id: number) => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/orders/provider/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const handleAddCategory = async (data: AddCategory) => {
  await axios
    .post(
      "https://alias-server-3sme.onrender.com/category/add",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => sendNotification(response.data.success, true))
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
}

export const handleCategoryDelete = async (name: string) => {
  await axios
    .delete(`https://alias-server-3sme.onrender.com/category/delete/${name}`, {
      withCredentials: true,
    })
    .then((response) => sendNotification(response.data.success, true))
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )
}

export const getAllHiddenServices = async () => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/services/all/hidden`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const getAllHiddenCategories = async () => {
  const res = await axios
    .get(`https://alias-server-3sme.onrender.com/categories/hidden`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })

  return res
}

export const handleUnhideCategory = async (id: number) => {
  await axios
    .patch(
      `https://alias-server-3sme.onrender.com/category/unhide/${id}`,
      {},
      { withCredentials: true }
    )
    .then((response) => sendNotification(response.data.success, true))
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })
}

export const handleUnhideService = async (id: number) => {
  await axios
    .patch(
      `https://alias-server-3sme.onrender.com/service/unhide/${id}`,
      {},
      { withCredentials: true }
    )
    .then((response) => sendNotification(response.data.success, true))
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    })
}
