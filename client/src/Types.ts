export type SessionSliceTypes = {
  user: {
    id: number
    first_name: string | null
    middle_name: string | null
    last_name: string | null
    email: string
    profile_picture: string
    role: string
    job_title: string
    phone_number: string
  } | null
}

export type ThemeSliceTypes = {
  current: string
}

export type UserTypes = {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  email: string
  profile_picture: string
  role: string
  job_title: string
  phone_number: string
} | null

export type ServiceTypes = {
  id: number
  name: string
  price: string
  category: string
}
export type ModifyServiceTypes = {
  id: number
  name: string
  price: string
  category: string
  providers: ProviderServiceShowcaseTypes[]
}

export type AddServiceTypes = {
  name: string
  price: string
  category: string
  providers: number[]
}

export type ServiceCategoryTypes = {
  id: number
  name: string
}

export type ProviderServiceShowcaseTypes = {
  first_name: string
  provider_id: number
  service_id: number
  profile_picture: string
}

export type ProviderTypes = {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  email: string
  role_id: number
  profile_picture: string
  job_title: string
  phone_number: string
}

export type SingleServiceTypes = {
  id: number
  name: string
  category: string
  price: number
}

export type AdminEditUserDataTypes = {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  email: string
  profile_picture: string
  role: string
  job_title: string
  phone_number: string
}
