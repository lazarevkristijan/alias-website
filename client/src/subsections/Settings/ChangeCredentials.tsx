import { useState } from "react"
import { jobTitleRegex, middleNameRegex, nameRegex } from "../../Regex"
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
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    middleName: user?.middle_name || "",
    jobTitle: user?.job_title || "",
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
    middleName: false,
    jobTitle: false,
  })

  return (
    <section className="settings-change-creds">
      <h4>Промени детайли</h4>
      <form
        onSubmit={(e) => {
          handleChangeCredentials(e, userData, user, dispatch)
        }}
      >
        <div>
          <label htmlFor="new_user_first_name">Име</label>
          <input
            type="text"
            id="new_user_first_name"
            value={userData.firstName}
            onChange={(e) => {
              if (!changedFields.firstName) {
                setChangedFields({ ...changedFields, firstName: true })
              }
              setUserData({ ...userData, firstName: e.target.value })
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
                setChangedFields({ ...changedFields, middleName: true })
              }
              setUserData({ ...userData, middleName: e.target.value })
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
                setChangedFields({ ...changedFields, lastName: true })
              }
              setUserData({ ...userData, lastName: e.target.value })
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
                setChangedFields({ ...changedFields, jobTitle: true })
              }
              setUserData({ ...userData, jobTitle: e.target.value })
            }}
            style={{
              backgroundColor:
                !jobTitleRegex.test(userData.jobTitle) && changedFields.jobTitle
                  ? "red"
                  : "#fff",
            }}
          />
        </div>

        <Button
          type="submit"
          disabled={
            !nameRegex.test(userData.firstName) ||
            !nameRegex.test(userData.lastName) ||
            !middleNameRegex.test(userData.middleName) ||
            !jobTitleRegex.test(userData.jobTitle) ||
            (nameRegex.test(userData.firstName) &&
              initialUserData.firstName === userData.firstName &&
              nameRegex.test(userData.lastName) &&
              initialUserData.lastName === userData.lastName &&
              middleNameRegex.test(userData.middleName) &&
              initialUserData.jobTitle === userData.jobTitle &&
              jobTitleRegex.test(userData.jobTitle))
          }
        >
          Спази
        </Button>
      </form>
    </section>
  )
}

export default ChangeCredentials
