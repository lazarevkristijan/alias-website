export type SessionSliceTypes = {
  user: {
    id: number
    first_name: string | null
    middle_name: string | null
    last_name: string | null
    email: string
    profile_picture: string
    role: string
  } | null
}

export type UserTypes = {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  email: string
  profile_picture: string
  role: string
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

export type ServiceTypes = {
  id: number
  name: string
  price: string
  category: string
}
export type ModifyServiceTypes = {
  name: string
  price: string
  category: string
}

export type ServiceCategoryTypes = {
  id: number
  name: string
}
