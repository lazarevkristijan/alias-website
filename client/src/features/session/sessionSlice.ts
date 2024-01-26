import { createSlice } from "@reduxjs/toolkit"
import { SessionSliceTypes } from "../../Types"

const initialState: SessionSliceTypes = {
  user: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state
      state.user = null
    },
    changeProfilePicture: (state, action) => {
      if (state.user) {
        state.user.profile_picture = action.payload
      }
    },
  },
})

export const { login, logout, changeProfilePicture } = sessionSlice.actions

export default sessionSlice.reducer
