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
      <p>Профилна картинка</p>

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
          alt={`Профилна картинка на ${user?.first_name}`}
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
                return console.error("Файла не е от поддържан тип")
              } else if (e.target.files[0].size > 5 * 1048576) {
                setSizeError(true)
                return console.error("Файла мора да бъде не по голям от 5мб")
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
              return console.error("Грешка при качване на файл")
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
          нулиране
        </button>
        <button
          disabled={
            !user?.profile_picture || user.profile_picture === defaultPfpURL
          }
          onClick={() =>
            handlePfpDelete(user?.profile_picture || defaultPfpURL, dispatch)
          }
        >
          истрий снимката
        </button>

        <button
          type="submit"
          disabled={!profilePicture}
        >
          спази
        </button>
      </form>

      {supportedError && (
        <p style={{ color: "red" }}>Файла не е от поддържан тип</p>
      )}
      {sizeError && (
        <p style={{ color: "red" }}>Файла мора да бъде не по голям от 5мб</p>
      )}
    </div>
  )
}

export default ProfilePicture
