import { createSlice } from "@reduxjs/toolkit"
import { UserTypes } from "../../Types"

const initialState: UserTypes = {
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  profile_picture: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload
    },
  },
})

export const { login } = sessionSlice.actions

export default sessionSlice.reducer
