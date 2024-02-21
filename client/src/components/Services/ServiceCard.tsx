import React from "react"
import { ServiceTypes } from "../../Types"
import { useNavigate } from "react-router"
import Button from "../Shared/Button"

const ServiceCard = ({ service }: { service: ServiceTypes }) => {
  const navigate = useNavigate()

  return (
    <React.Fragment key={service.id}>
      <div>
        <p>Услуга: {service.name}</p>
        <p>
          Категория:{" "}
          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
        </p>
        <p>Цена: {service.price}лв.</p>

        <Button onClick={() => navigate(`${service.id}`)}>Подробности</Button>
      </div>
      <br />
    </React.Fragment>
  )
}

export default ServiceCard
