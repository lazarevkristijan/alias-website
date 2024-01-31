import { User } from "@auth0/auth0-react"
import axios from "axios"
import { login } from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"
import { UserSettingsTypes } from "../Types"
import { changeTheme } from "../features/settings/settingsSlice"

export const postLoginOrRegister = (
  auth0user: User | undefined,
  dispatch: AppDispatch,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .post(
      "http://localhost:5432/user/login-or-register",
      JSON.stringify(auth0user),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login(response.data))

      axios
        .get("http://localhost:5432/user-settings", {
          withCredentials: true,
        })
        .then((innerResponse) => {
          const colorTheme = innerResponse.data.filter(
            (setting: UserSettingsTypes) => setting.setting_id === 1
          )

          document.body.style.backgroundColor =
            colorTheme[0].value === "dark" ? "#333" : "#ccc"
          document.body.style.color =
            colorTheme[0].value === "dark" ? "#fff" : "#000"
          dispatch(changeTheme(colorTheme[0].value))

          setIsLoading(false)
        })
    })
}
