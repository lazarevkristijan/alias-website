import { createSlice } from "@reduxjs/toolkit"
import { UserTypes } from "../../Types"

const initialState: UserTypes = {
  user: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { login } = sessionSlice.actions

export default sessionSlice.reducer
