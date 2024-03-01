import { useEffect, useState } from "react"
import { AdminEditUserDataTypes, UserTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import {
  handleAdminChangeProfilePicture,
  handleAdminCredsChange,
  handleAdminPfpDelete,
  handleAdminUserDelete,
} from "../Utils/AdminUtils"
import { handleFileChange } from "../Utils/SharedUtils"
import { jobTitleRegex, middleNameRegex, nameRegex, phoneRegex } from "../Regex"
import { useNavigate } from "react-router"
import Button from "../components/Shared/Button"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const AdminEditUserSection = ({ fetchedUser }: { fetchedUser: UserTypes }) => {
  const navigate = useNavigate()

  const [newUserData, setNewUserData] = useState<AdminEditUserDataTypes>({
    id: fetchedUser?.id || 0,
    first_name: fetchedUser?.first_name || "",
    last_name: fetchedUser?.last_name || "",
    middle_name: fetchedUser?.middle_name || "",
    email: fetchedUser?.email || "",
    profile_picture: fetchedUser?.profile_picture || "",
    role: fetchedUser?.role || "",
    job_title: fetchedUser?.job_title || "",
    phone_number: fetchedUser?.phone_number || "",
  })

  const initialUSerData = {
    id: fetchedUser?.id || 0,
    first_name: fetchedUser?.first_name || "",
    last_name: fetchedUser?.last_name || "",
    middle_name: fetchedUser?.middle_name || "",
    email: fetchedUser?.email || "",
    profile_picture: fetchedUser?.profile_picture || "",
    role: fetchedUser?.role || "",
    job_title: fetchedUser?.job_title || "",
    phone_number: fetchedUser?.phone_number || "",
  }

  const [changedFields, setChangedFields] = useState({
    first_name: false,
    last_name: false,
    middle_name: false,
    profile_picture: false,
    role: false,
    job_title: false,
    phone_number: false,
  })

  const [profilePicture, setProfilePicture] = useState<File | null>(null)

  const [pfpURL, setPfpURL] = useState("")

  const [supportedError, setSupportedError] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    if (fetchedUser?.profile_picture) {
      setPfpURL(getPfpLink(fetchedUser.profile_picture))
    }
  }, [fetchedUser?.profile_picture])

  const theme = useSelector((state: RootState) => state.theme.current)

  if (!fetchedUser) return

  return (
    <section className={`admin-edit-user-section `}>
      <h2>Преглед на профил</h2>

      <section
        className={`${
          theme === "dark"
            ? "card-black-bg box-shadow-white"
            : "card-white-bg box-shadow-black"
        }`}
      >
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            setIsChanging(true)

            handleAdminChangeProfilePicture(
              e,
              profilePicture,
              setProfilePicture,
              newUserData,
              setNewUserData,
              setIsChanging
            )
          }}
          style={{ position: "relative" }}
        >
          <img
            src={getPfpLink(
              newUserData?.profile_picture ? pfpURL : defaultPfpURL
            )}
            alt={`Профилна снимка на ${newUserData?.first_name}`}
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
              top: "-1%",
              left: "49%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              opacity: 0,
              backgroundColor: "red",
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
          {isChanging && <p>Спазване...</p>}
          <div>
            <Button
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
            </Button>
            <Button
              disabled={!profilePicture}
              type="submit"
            >
              спази
            </Button>
            <Button
              onClick={() => {
                handleAdminPfpDelete(
                  fetchedUser.id,
                  fetchedUser.profile_picture,
                  setNewUserData
                )
                setPfpURL(defaultPfpURL)
                setProfilePicture(null)
              }}
              disabled={
                !newUserData.profile_picture ||
                newUserData.profile_picture === defaultPfpURL
              }
            >
              Изтрий
            </Button>
          </div>

          {supportedError && (
            <p style={{ color: "red" }}>Файла не е от поддържан тип</p>
          )}
          {sizeError && (
            <p style={{ color: "red" }}>
              Файла мора да бъде не по голям от 5мб
            </p>
          )}
        </form>

        <p>ID: {fetchedUser?.id}</p>

        <div className="admin-edit-user-label">
          <label htmlFor="admin-edit-user-first-name">Име</label>
          <input
            value={newUserData.first_name}
            onChange={(e) => {
              if (!changedFields.first_name) {
                setChangedFields((prev) => ({ ...prev, first_name: true }))
              }
              setNewUserData({ ...newUserData, first_name: e.target.value })
            }}
            id="admin-edit-user-first-name"
            style={{
              backgroundColor:
                !nameRegex.test(newUserData.first_name) &&
                changedFields.first_name
                  ? "red"
                  : "#fff",
              textTransform: "capitalize",
            }}
            maxLength={50}
          />
        </div>
        <div className="admin-edit-user-label">
          <label htmlFor="admin-edit-user-last-name">Фамилия</label>
          <input
            value={newUserData.last_name}
            onChange={(e) => {
              if (!changedFields.last_name) {
                setChangedFields((prev) => ({ ...prev, last_name: true }))
              }
              setNewUserData({ ...newUserData, last_name: e.target.value })
            }}
            id="admin-edit-user-last-name"
            style={{
              backgroundColor:
                !nameRegex.test(newUserData.last_name) &&
                changedFields.last_name
                  ? "red"
                  : "#fff",
              textTransform: "capitalize",
            }}
            maxLength={50}
          />
        </div>

        <div className="admin-edit-user-label">
          <label htmlFor="admin-edit-user-middle-name">Презиме</label>
          <input
            value={newUserData.middle_name}
            onChange={(e) => {
              if (!changedFields.middle_name) {
                setChangedFields((prev) => ({ ...prev, middle_name: true }))
              }
              setNewUserData({ ...newUserData, middle_name: e.target.value })
            }}
            id="admin-edit-user-middle-name"
            style={{
              backgroundColor:
                !middleNameRegex.test(newUserData.middle_name) &&
                changedFields.middle_name
                  ? "red"
                  : "#fff",
              textTransform: "capitalize",
            }}
            maxLength={50}
          />
        </div>

        <div className="admin-edit-user-label">
          <label htmlFor="admin-edit-user-job-title">Специялност</label>
          <input
            value={newUserData.job_title}
            onChange={(e) => {
              if (!changedFields.job_title) {
                setChangedFields((prev) => ({ ...prev, job_title: true }))
              }
              setNewUserData({ ...newUserData, job_title: e.target.value })
            }}
            id="admin-edit-user-job-title"
            style={{
              backgroundColor:
                !jobTitleRegex.test(newUserData.job_title) &&
                changedFields.job_title
                  ? "red"
                  : "#fff",
              textTransform: "capitalize",
            }}
            maxLength={50}
          />
        </div>

        <div className="admin-edit-user-label">
          <label htmlFor="admin-edit-user-phone-number">Номер</label>
          <input
            value={newUserData.phone_number}
            onChange={(e) => {
              if (!changedFields.phone_number) {
                setChangedFields((prev) => ({ ...prev, phone_number: true }))
              }
              setNewUserData({ ...newUserData, phone_number: e.target.value })
            }}
            id="admin-edit-user-phone-number"
            style={{
              backgroundColor:
                !phoneRegex.test(newUserData.phone_number) &&
                changedFields.phone_number
                  ? "red"
                  : "#fff",
              textTransform: "capitalize",
            }}
            maxLength={50}
            placeholder="0899112233"
          />
        </div>

        <div className="admin-edit-user-label">
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
        </div>
        <p>Имейл: {fetchedUser?.email}</p>

        <Button onClick={() => handleAdminUserDelete(fetchedUser.id, navigate)}>
          Изтрий потребител
        </Button>
        <Button
          onClick={() => handleAdminCredsChange(newUserData)}
          disabled={
            !nameRegex.test(newUserData.first_name) ||
            !nameRegex.test(newUserData.last_name) ||
            !middleNameRegex.test(newUserData.middle_name) ||
            !jobTitleRegex.test(newUserData.job_title) ||
            !phoneRegex.test(newUserData.phone_number) ||
            (nameRegex.test(newUserData.first_name) &&
              initialUSerData.first_name === newUserData.first_name &&
              nameRegex.test(newUserData.last_name) &&
              initialUSerData.last_name === newUserData.last_name &&
              middleNameRegex.test(newUserData.middle_name) &&
              initialUSerData.middle_name === newUserData.middle_name &&
              jobTitleRegex.test(newUserData.job_title) &&
              initialUSerData.job_title === newUserData.job_title &&
              initialUSerData.phone_number === newUserData.phone_number &&
              initialUSerData.role === newUserData.role)
          }
        >
          Спази
        </Button>
      </section>
    </section>
  )
}

export default AdminEditUserSection
