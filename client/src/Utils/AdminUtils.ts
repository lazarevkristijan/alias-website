import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"
import { getPfpFileName } from "./SettingsUtils"

export const getAllUsers = async () => {
  const res = await axios
    .get("http://localhost:5432/users/all", { withCredentials: true })
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getSingleUser = async (id: number) => {
  const res = await axios
    .get(`http://localhost:5432/admin/get-user/${id}`, {
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
  id: number,
  userPfp: string
) => {
  e.preventDefault()

  if (userPfp) {
    handleAdminPfpDelete(id, userPfp)
  }

  if (profilePicture) {
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)

    await axios
      .patch(
        `http://localhost:5432/admin/user/change-profile-picture/${id}`,
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
      })
      .catch((error) =>
        sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
      )
  } else {
    sendNotification("Не е избран файл")
  }
  setProfilePicture(null)
}

export const handleAdminPfpDelete = async (userId: number, userPfp: string) => {
  const pfpFileName = getPfpFileName(userPfp)
  await axios.delete(
    `http://localhost:5432/admin/user/delete-profile-picture/${userId}`,
    {
      withCredentials: true,
      data: JSON.stringify({ pfpFileName: pfpFileName }),
    }
  )
}
