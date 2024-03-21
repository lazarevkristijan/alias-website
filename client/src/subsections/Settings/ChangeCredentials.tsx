import { useState } from "react"
import {
  jobTitleRegex,
  middleNameRegex,
  nameRegex,
  phoneRegex,
} from "../../Regex"
import { handleChangeCredentials } from "../../Utils/ProfileUtils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../../components/Shared/Button"

const ChangeCredentials = () => {
  const user = useSelector((state: RootState) => state.session.user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    middleName: user?.middle_name || "",
    jobTitle: user?.job_title || "",
    phoneNumber: user?.phone_number || "",
    bio: user?.bio || "",
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    middleName: user?.middle_name || "",
    jobTitle: user?.job_title || "",
    phoneNumber: user?.phone_number || "",
    bio: user?.bio || "",
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
    middleName: false,
    jobTitle: false,
    phoneNumber: false,
    bio: false,
  })

  return (
    <section className="settings-change-creds">
      <h4>Лични данни</h4>
      <form
        onSubmit={(e) => handleChangeCredentials(e, userData, user, dispatch)}
      >
        <div>
          <label htmlFor="new_user_first_name">Име</label>
          <input
            type="text"
            id="new_user_first_name"
            value={userData.firstName}
            onChange={(e) => {
              if (!changedFields.firstName) {
                setChangedFields((prev) => ({ ...prev, firstName: true }))
              }
              setUserData((prev) => ({ ...prev, firstName: e.target.value }))
            }}
            style={{
              backgroundColor:
                !nameRegex.test(userData.firstName) && changedFields.firstName
                  ? "red"
                  : "#fff",
            }}
          />
        </div>

        <div>
          <label htmlFor="new_user_middle_name">Презиме</label>
          <input
            type="text"
            id="new_user_middle_name"
            value={userData.middleName}
            onChange={(e) => {
              if (!changedFields.middleName) {
                setChangedFields((prev) => ({ ...prev, middleName: true }))
              }
              setUserData((prev) => ({ ...prev, middleName: e.target.value }))
            }}
            style={{
              backgroundColor:
                !middleNameRegex.test(userData.middleName) &&
                changedFields.middleName
                  ? "red"
                  : "#fff",
            }}
          />
        </div>

        <div>
          <label htmlFor="new_user_last_name">Фамилия</label>
          <input
            type="text"
            id="new_user_last_name"
            value={userData.lastName}
            onChange={(e) => {
              if (!changedFields.lastName) {
                setChangedFields((prev) => ({ ...prev, lastName: true }))
              }
              setUserData((prev) => ({ ...prev, lastName: e.target.value }))
            }}
            style={{
              backgroundColor:
                !nameRegex.test(userData.lastName) && changedFields.lastName
                  ? "red"
                  : "#fff",
            }}
          />
        </div>

        <div>
          <label htmlFor="new_user_job_title">Специялност</label>
          <input
            type="text"
            id="new_user_job_title"
            value={userData.jobTitle}
            onChange={(e) => {
              if (!changedFields.jobTitle) {
                setChangedFields((prev) => ({ ...prev, jobTitle: true }))
              }
              setUserData((prev) => ({ ...prev, jobTitle: e.target.value }))
            }}
            style={{
              backgroundColor:
                !jobTitleRegex.test(userData.jobTitle) && changedFields.jobTitle
                  ? "red"
                  : "#fff",
            }}
          />
        </div>

        <div>
          <label htmlFor="new_user_phone_number">Номер</label>
          <input
            type="text"
            id="new_user_phone_number"
            value={userData.phoneNumber}
            onChange={(e) => {
              if (!changedFields.phoneNumber) {
                setChangedFields((prev) => ({ ...prev, phoneNumber: true }))
              }
              setUserData((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }}
            style={{
              backgroundColor:
                !phoneRegex.test(userData.phoneNumber) &&
                changedFields.phoneNumber
                  ? "red"
                  : "#fff",
            }}
            placeholder="0899112233"
          />
        </div>

        <div>
          <label htmlFor="new_user_bio">За теб</label>
          <textarea
            id="new_user_bio"
            value={userData.bio}
            rows={3}
            className="card-padding"
            onChange={(e) => {
              if (!changedFields.bio) {
                setChangedFields((prev) => ({ ...prev, bio: true }))
              }
              setUserData((prev) => ({ ...prev, bio: e.target.value }))
            }}
            style={{
              backgroundColor: userData.bio.length > 150 ? "red" : "#fff",
            }}
            maxLength={150}
          />
          {changedFields.bio && <p>{userData.bio.length}/150</p>}
        </div>

        <Button
          type="submit"
          disabled={
            !nameRegex.test(userData.firstName) ||
            !nameRegex.test(userData.lastName) ||
            !middleNameRegex.test(userData.middleName) ||
            !jobTitleRegex.test(userData.jobTitle) ||
            !phoneRegex.test(userData.phoneNumber) ||
            userData.bio.length > 150 ||
            (nameRegex.test(userData.firstName) &&
              initialUserData.firstName === userData.firstName &&
              nameRegex.test(userData.lastName) &&
              initialUserData.lastName === userData.lastName &&
              middleNameRegex.test(userData.middleName) &&
              initialUserData.jobTitle === userData.jobTitle &&
              jobTitleRegex.test(userData.jobTitle) &&
              initialUserData.phoneNumber === userData.phoneNumber &&
              initialUserData.bio === userData.bio &&
              phoneRegex.test(userData.phoneNumber))
          }
        >
          Спази
        </Button>
      </form>
    </section>
  )
}

export default ChangeCredentials
