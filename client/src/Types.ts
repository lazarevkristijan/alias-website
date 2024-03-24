export type SessionSlice = {
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
    bio: string
  } | null
}

export type ThemeSlice = {
  current: string
}

export type User = {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  email: string
  profile_picture: string
  role: string
  job_title: string
  phone_number: string
  bio: string
} | null

export type Service = {
  id: number
  name: string
  price: string
  category: string
}
export type ModifyService = {
  id: number
  name: string
  price: string
  category: string
  providers: ProviderServiceShowcase[]
}

export type AddService = {
  name: string
  price: string
  category: string
  providers: Provider[]
}

export type ServiceCategory = {
  id: number
  name: string
}

export type ProviderServiceShowcase = {
  first_name: string
  provider_id: number
  service_id: number
  profile_picture: string
}

export type Provider = {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  email: string
  role_id: number
  profile_picture: string
  job_title: string
  phone_number: string
  bio: string
}

export type SingleService = {
  id: number
  name: string
  category: string
  price: number
}

export type AdminEditUserData = {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  email: string
  profile_picture: string
  role: string
  job_title: string
  phone_number: string
  bio: string
}

export type Order = {
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
  hidden: number
  date_finished: string
  date_of_order: string
  quantity: number
  total_paid: number
  finished: number
}

export type OrderGeneral = {
  buyer_id: number
  date_finished: string
  date_of_order: string
  finished: number
  id: number
  provider_id: number
  quantity: number
  service_id: number
  total_paid: number
}

export type OrderCount = {
  service_id: number
}

export type AddCategory = {
  name: string
}

export type Category = {
  id: number
  name: string
  hidden: number
}

export type SendRatingData = {
  orderId: number
  rating: number
  text: string
}

export type Rating = {
  order_id: number
  rating: number
  text: string
}

export type RatingLength = {
  rating: number
  service_id: number
}

export type MakePayment = {
  buyer_id: number
  service: string
  service_id: number
  provider_id: number
  price: number 
}
