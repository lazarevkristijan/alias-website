export type SessionSliceTypes = {
  user: {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
    profile_picture: string
  } | null
}

export type UserTypes = {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
  profile_picture: string
} | null

export type UserSettingsTypes = {
  id: number
  user_id: number
  setting_id: number
  value: string
}

export type SettingsSliceTypes = {
  colorTheme: string
}

export type CarServiceTypes = {
  name: string
}
