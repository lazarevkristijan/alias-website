import React from "react"
import { ServiceTypes } from "../../Types"
import { useNavigate } from "react-router"

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
        <p>Цена: {service.price}</p>

        <button onClick={() => navigate(`${service.id}`)}>Подробности</button>
      </div>
      <br />
    </React.Fragment>
  )
}

export default ServiceCard
