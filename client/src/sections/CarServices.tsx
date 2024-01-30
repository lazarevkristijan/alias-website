import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { ServiceTypes } from "../Types"

const CarServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllCarServices(),
  })

  return (
    <div>
      <>
        {areCarServicesLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <button onClick={() => navigate("/services")}>
              back to services
            </button>
            <br />
            <br />
            <h2>All car services</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <div key={service.id}>
                  <p>Услуга: {service.name}</p>
                  <p>Категория: {service.category}</p>
                  <p>Цена: {service.price}</p>
                </div>
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default CarServices
