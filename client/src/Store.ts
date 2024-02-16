import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionSlice from "./features/session/sessionSlice"
import settingsSlice from "./features/settings/settingsSlice"

const rootReducer = combineReducers({
  session: sessionSlice,
  settings: settingsSlice,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
