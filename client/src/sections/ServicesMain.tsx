import { useNavigate } from "react-router"

const ServicesMain = () => {
  const navigate = useNavigate()

  return (
    <div>
      ServicesMain
      <button onClick={() => navigate("car")}>car services</button>
      <button onClick={() => navigate("personal")}>personal services</button>
      <button onClick={() => navigate("home")}>home services</button>
    </div>
  )
}

export default ServicesMain
