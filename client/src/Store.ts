import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionSlice from "./features/session/sessionSlice"
import themeSlice from "./features/theme/themeSlice"

const rootReducer = combineReducers({
  session: sessionSlice,
  theme: themeSlice,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
