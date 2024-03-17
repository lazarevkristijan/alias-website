import { createSlice } from "@reduxjs/toolkit"
import { ThemeSlice} from "../../Types"

const initialState: ThemeSlice= {
  current: localStorage.getItem("theme") || "light",
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.current = action.payload
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
