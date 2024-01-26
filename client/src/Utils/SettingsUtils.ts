import axios from "axios"
import { AppDispatch } from "../Store"
import { UserTypes } from "../Types"
import { changeProfilePicture } from "../features/session/sessionSlice"
import { defaultPfpURL } from "../constants"

export const getPfpLink = (linkString: string) => {
  try {
    const pfpData = JSON.parse(linkString)
    const pfpURL = pfpData.url
    return pfpURL
  } catch {
    return linkString
  }
}

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
    .then(() => {
      dispatch(changeProfilePicture(defaultPfpURL))
    })
}

export const handleProfilePictureChange = async (
  e: React.FormEvent<HTMLFormElement>,
  profilePicture: File | null,
  setPrrofilePicture: (value: React.SetStateAction<File | null>) => void,
  user: UserTypes,
  dispatch: AppDispatch
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
      .then((res) => {
        dispatch(changeProfilePicture(res.data))
      })
  } else {
    console.error("No file selected")
  }
  setPrrofilePicture(null)
}

export const getPfpFileName = (linkString: string) => {
  try {
    const pfpData = JSON.parse(linkString)
    const pfpFIleName = pfpData.fileName
    return pfpFIleName
  } catch {
    return linkString
  }
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPrrofilePicture: (value: React.SetStateAction<File | null>) => void
) => {
  const file = e.target.files && e.target.files[0]
  if (file !== undefined && file !== null) {
    setPrrofilePicture(file)
  }
}
