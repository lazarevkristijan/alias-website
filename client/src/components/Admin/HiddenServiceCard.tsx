import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../Shared/Button"
import { ServiceTypes } from "../../Types"
import { handleUnhideService } from "../../Utils/AdminUtils"

const HiddenServiceCard = ({ service }: { service: ServiceTypes }) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`provider-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>ID: {service.id}</p>
      <p>Име: {service.name}</p>
      <p>Цена: {service.price}лв.</p>
      <p>Категория: {service.category}</p>
      <Button onClick={() => handleUnhideService(service.id)}>
        Направи видима
      </Button>
    </div>
  )
}

export default HiddenServiceCard
