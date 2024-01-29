import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { CarServiceTypes } from "../Types"

const CarServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllCarServices(),
  })

  console.log(allCarServices)

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
            <button>add service</button>

            <p>All car services</p>
            {allCarServices &&
              allCarServices.map((service: CarServiceTypes) => (
                <div>
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
