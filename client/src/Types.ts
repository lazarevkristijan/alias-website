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
  providers: ProviderTypes[]
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

export type Purchase = {
  id: number
  buyer_id: number
  buyer_first_name: string
  buyer_last_name: string
  buyer_middle_name: string
  buyer_profile_picture: string
  
  provider_id: number
  provider_first_name: string
  provider_last_name: string
  provider_middle_name: string
  provider_profile_picture: string
  provider_job_title: string
  
  service_id: number
  service_name: string
  service_price: string
  service_category: string
  date_finished: string
  date_of_purchase: string
  quantity: number
  total_paid: number
  finished: number
}
