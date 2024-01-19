import axios from "axios"

export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:5432/all-users")
  return res.data
}
