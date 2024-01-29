import { useNavigate } from "react-router"

const CarServices = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate("/services")}>back to services</button>
      <button>add service</button>

      <p>All car services</p>
    </div>
  )
}

export default CarServices
