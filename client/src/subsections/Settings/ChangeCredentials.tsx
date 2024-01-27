import { useState } from "react"
import { nameRegex } from "../../Regex"
import { handleChangeCredentials } from "../../Utils/ProfileUtils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"

const ChangeCredentials = () => {
  const user = useSelector((state: RootState) => state.session.user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
  })

  return (
    <div>
      <p>Change crednetials</p>
      <form
        onSubmit={(e) => {
          handleChangeCredentials(e, userData, user, dispatch)
        }}
      >
        <input
          type="text"
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
        <input
          type="text"
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
        <button
          disabled={
            !nameRegex.test(userData.firstName) ||
            !nameRegex.test(userData.lastName) ||
            (nameRegex.test(userData.firstName) &&
              initialUserData.firstName === userData.firstName &&
              nameRegex.test(userData.lastName) &&
              initialUserData.lastName === userData.lastName)
          }
        >
          save changes
        </button>
      </form>
    </div>
  )
}

export default ChangeCredentials
