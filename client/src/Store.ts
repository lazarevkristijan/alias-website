import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionSlice from "./features/session/sessionSlice"

const rootReducer = combineReducers({
  session: sessionSlice,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
