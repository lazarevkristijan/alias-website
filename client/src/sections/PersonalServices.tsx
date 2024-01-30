import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllPersonalServices } from "../Utils/PersonalServicesUtils"
import { ServiceTypes } from "../Types"
import React from "react"

const PersonalServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllPersonalServices(),
  })

  return (
    <div>
      <>
        {areCarServicesLoading ? (
          <p>Зареждане...</p>
        ) : (
          <>
            <button onClick={() => navigate("/услуги")}>Към услуги</button>
            <br />
            <br />
            <h2>Всички услуги за себе си</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <React.Fragment key={service.id}>
                  <div>
                    <p>Услуга: {service.name}</p>
                    <p>Категория: {service.category}</p>
                    <p>Цена: {service.price}</p>

                    <button onClick={() => navigate(`${service.id}`)}>
                      Подробности
                    </button>
                  </div>

                  <br />
                </React.Fragment>
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default PersonalServices
