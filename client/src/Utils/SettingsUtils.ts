import axios from "axios"
import { AppDispatch } from "../Store"
import { User } from "../Types"
import { changeProfilePicture } from "../features/session/sessionSlice"
import { defaultPfpURL, errorNotifEnding } from "../constants"
import { sendNotification, getPfpFileName } from "./SharedUtils"

export const handlePfpDelete = async (
  userPfp: string,
  dispatch: AppDispatch
) => {
  const pfpFileName = getPfpFileName(userPfp)
  await axios
    .delete("http://localhost:5432/user-settings/delete-profile-picture", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: JSON.stringify({ pfpFileName: pfpFileName }),
    })
    .then((response) => {
      dispatch(changeProfilePicture(defaultPfpURL))
      sendNotification(response.data.success, true)
    })
}

export const handleProfilePictureChange = async (
  e: React.FormEvent<HTMLFormElement>,
  profilePicture: File | null,
  setPrrofilePicture: (value: React.SetStateAction<File | null>) => void,
  user: User,
  dispatch: AppDispatch,
  setIsChanging: (value: React.SetStateAction<boolean>) => void
) => {
  e.preventDefault()

  if (user?.profile_picture) {
    handlePfpDelete(user.profile_picture, dispatch)
  }

  if (profilePicture) {
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)

    await axios
      .patch(
        "http://localhost:5432/user-settings/change-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(changeProfilePicture(response.data.profilePicture))
        sendNotification(response.data.success, true)
      })
      .catch((error) =>
        sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
      )
      .finally(() => setIsChanging(false))
  } else {
    console.error("No file selected")
  }
  setPrrofilePicture(null)
}
