import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import {
  getPfpLink,
  handleFileChange,
  handlePfpDelete,
  handleProfilePictureChange,
} from "../../Utils/SettingsUtils"
import { defaultPfpURL } from "../../constants"

const ProfilePicture = () => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)

  const [profilePicture, setProfilePicture] = useState<File | null>(null)

  const [pfpURL, setPfpURL] = useState("")
  useEffect(() => {
    if (user?.profile_picture) {
      setPfpURL(getPfpLink(user.profile_picture))
    }
  }, [user?.profile_picture])

  const [supportedError, setSupportedError] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  return (
    <div>
      <p>Profile Picture</p>

      <form
        onSubmit={(e) => {
          handleProfilePictureChange(
            e,
            profilePicture,
            setProfilePicture,
            user,
            dispatch
          )
        }}
        style={{ position: "relative" }}
        encType="multipart/form-data"
      >
        <img
          src={user?.profile_picture ? pfpURL : defaultPfpURL}
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid #000",
          }}
          alt={`${user?.first_name}'s profile picture`}
        />
        <input
          type="file"
          id="pfpInput"
          name="profilePicture"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            setSupportedError(false)
            setSizeError(false)

            if (e.target.files) {
              if (
                e.target.files[0].type !== "image/png" &&
                e.target.files[0].type !== "image/jpeg" &&
                e.target.files[0].type !== "image/jpg"
              ) {
                setSupportedError(true)
                return console.error("File type not supported")
              } else if (e.target.files[0].size > 5 * 1048576) {
                setSizeError(true)
                return console.error("File size must be max 5mb")
              } else {
                const reader = new FileReader()
                reader.onload = (readerEvent) => {
                  if (readerEvent.target) {
                    const url = readerEvent.target.result
                    if (url) {
                      setPfpURL(url as string)
                    }
                  }
                }
                if (e.target.files) {
                  reader.readAsDataURL(e.target.files[0])
                }
                handleFileChange(e, setProfilePicture)
              }
            } else {
              return console.error("Error when uplaoding file")
            }
          }}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            backgroundColor: "red",
            opacity: 0,
            top: 0,
            left: 0,
            cursor: "pointer",
          }}
        />

        <button
          disabled={!profilePicture}
          onClick={() => {
            const inputEl = document.getElementById(
              "pfpInput"
            ) as HTMLInputElement
            inputEl.value = ""
            setProfilePicture(null)

            if (user?.profile_picture) {
              setPfpURL(getPfpLink(user.profile_picture))
            }
          }}
        >
          reset
        </button>
        <button
          disabled={
            !user?.profile_picture || user.profile_picture === defaultPfpURL
          }
          onClick={() =>
            handlePfpDelete(user?.profile_picture || defaultPfpURL, dispatch)
          }
        >
          delete pfp
        </button>

        <button
          type="submit"
          disabled={!profilePicture}
        >
          submit
        </button>
      </form>

      {supportedError && (
        <p style={{ color: "red" }}>File type not supported</p>
      )}
      {sizeError && <p style={{ color: "red" }}>File size must be max 5mb</p>}
    </div>
  )
}

export default ProfilePicture
