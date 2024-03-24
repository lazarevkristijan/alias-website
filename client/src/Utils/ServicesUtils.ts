import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorNotifEnding } from "../constants"
import { loadStripe } from "@stripe/stripe-js"

export const getAllServicesByCategory = async (category: string) => {
  const res = await axios
    .get(`http://localhost:5432/services/all/category/${category}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const getCategoryServicesRatings = async (category: string) => {
  const res = await axios
    .get(`http://localhost:5432/ratings/category/${category}`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorNotifEnding}`)
    )

  return res
}

export const makePayment = async () => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

  const response = await axios
    .post(
      "http://localhost:5432/create-checkout-session",
      JSON.stringify({
        products: [{ name: "Пране на кола", price: 55, quantity: 1 }],
      }),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    .then((response) => response.data)

  await stripe?.redirectToCheckout({
    sessionId: response.id,
  })
}
