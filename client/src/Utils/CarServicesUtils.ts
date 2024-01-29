import axios from "axios"

export const getAllCarServices = async () => {
  const res = await axios
    .get("http://localhost:5432/services/all-car-services")
    .then((response) => response.data)
    .catch(() => console.log("asd"))

  return res
}
