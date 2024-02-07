import { useEffect, useState } from "react"
import { UserTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import {
  handleAdminChangeProfilePicture,
  handleAdminCredsChange,
  handleAdminPfpDelete,
} from "../Utils/AdminUtils"
import { handleFileChange } from "../Utils/SharedUtils"
import { middleNameRegex, nameRegex } from "../Regex"

const AdminEditUserSection = ({ fetchedUser }: { fetchedUser: UserTypes }) => {
  const [newUserData, setNewUserData] = useState({
    id: fetchedUser?.id || 0,
    first_name: fetchedUser?.first_name || "",
    last_name: fetchedUser?.last_name || "",
    middle_name: fetchedUser?.middle_name || "",
    email: fetchedUser?.email || "",
    profile_picture: fetchedUser?.profile_picture || "",
    role: fetchedUser?.role || "",
  })

  const [changedFields, setChangedFields] = useState({
    first_name: false,
    last_name: false,
    middle_name: false,
    profile_picture: false,
    role: false,
  })

  const [profilePicture, setProfilePicture] = useState<File | null>(null)

  const [pfpURL, setPfpURL] = useState("")

  const [supportedError, setSupportedError] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    if (fetchedUser?.profile_picture) {
      setPfpURL(getPfpLink(fetchedUser.profile_picture))
    }
  }, [fetchedUser?.profile_picture])

  if (!fetchedUser) return
  return (
    <div>
      <form
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        encType="multipart/form-data"
        onSubmit={(e) =>
          handleAdminChangeProfilePicture(
            e,
            profilePicture,
            setProfilePicture,
            fetchedUser?.id,
            fetchedUser?.profile_picture
          )
        }
      >
        <img
          src={getPfpLink(
            fetchedUser?.profile_picture ? pfpURL : defaultPfpURL
          )}
          alt={`Профилна снимка на ${fetchedUser?.first_name}`}
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <input
          type="file"
          id="adminPfpInput"
          name="profilePicture"
          accept="image/png, image/jpeg, image/jpg"
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            top: 0,
            left: 0,
            opacity: 0,
            borderRadius: "50%",
          }}
          onChange={(e) => {
            setChangedFields((prev) => ({ ...prev, profile_picture: true }))

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
        />
        <button
          type="button"
          disabled={!profilePicture}
          onClick={() => {
            const inputEl = document.getElementById(
              "adminPfpInput"
            ) as HTMLInputElement
            inputEl.value = ""
            setProfilePicture(null)

            if (fetchedUser.profile_picture) {
              setPfpURL(getPfpLink(fetchedUser.profile_picture))
            }
          }}
        >
          нулиране
        </button>
        <button
          disabled={!profilePicture}
          type="submit"
        >
          спази снимка
        </button>
        <button
          type="button"
          onClick={() =>
            handleAdminPfpDelete(fetchedUser.id, fetchedUser.profile_picture)
          }
          disabled={
            !fetchedUser.profile_picture ||
            fetchedUser.profile_picture === defaultPfpURL
          }
        >
          Изтрий
        </button>
        {supportedError && (
          <p style={{ color: "red" }}>Файла не е от поддържан тип</p>
        )}
        {sizeError && (
          <p style={{ color: "red" }}>Файла мора да бъде не по голям от 5мб</p>
        )}
      </form>

      <p>ID: {fetchedUser?.id}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <label htmlFor="admin-edit-user-first-name">Име</label>
        <input
          value={newUserData.first_name || ""}
          onChange={(e) => {
            if (!changedFields.first_name) {
              setChangedFields((prev) => ({ ...prev, first_name: true }))
            }
            setNewUserData({ ...newUserData, first_name: e.target.value })
          }}
          id="admin-edit-user-first-name"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <label htmlFor="admin-edit-user-last-name">Фамилия</label>
        <input
          value={newUserData.last_name || ""}
          onChange={(e) => {
            if (!changedFields.last_name) {
              setChangedFields((prev) => ({ ...prev, last_name: true }))
            }
            setNewUserData({ ...newUserData, last_name: e.target.value })
          }}
          id="admin-edit-user-last-name"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <label htmlFor="admin-edit-user-middle-name">Презиме</label>
        <input
          value={newUserData.middle_name || ""}
          onChange={(e) => {
            if (!changedFields.middle_name) {
              setChangedFields((prev) => ({ ...prev, middle_name: true }))
            }
            setNewUserData({ ...newUserData, middle_name: e.target.value })
          }}
          id="admin-edit-user-middle-name"
        />
      </div>
      <label htmlFor="admin-edit-user-role">Роля</label>
      <select
        value={newUserData.role || ""}
        onChange={(e) => {
          if (!changedFields.role) {
            setChangedFields((prev) => ({ ...prev, role: true }))
          }
          setNewUserData({ ...newUserData, role: e.target.value })
        }}
        id="admin-edit-user-role"
      >
        <option value="клиент">Клиент</option>
        <option value="служител">Служител</option>
        <option value="админ">Админ</option>
      </select>
      <p>Имейл: {fetchedUser?.email}</p>

      <button>Изтрий потребител</button>
      <button
        onClick={() => handleAdminCredsChange(newUserData)}
        disabled={
          !nameRegex.test(newUserData.first_name) ||
          !nameRegex.test(newUserData.last_name) ||
          !middleNameRegex.test(newUserData.middle_name) ||
          (nameRegex.test(newUserData.first_name) &&
            fetchedUser.first_name === newUserData.first_name &&
            nameRegex.test(newUserData.last_name) &&
            fetchedUser.last_name === newUserData.last_name &&
            middleNameRegex.test(newUserData.middle_name) &&
            fetchedUser.middle_name === newUserData.middle_name &&
            fetchedUser.role === newUserData.role)
        }
      >
        Спази
      </button>
    </div>
  )
}

export default AdminEditUserSection
