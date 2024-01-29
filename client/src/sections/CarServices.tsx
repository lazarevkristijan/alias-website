import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { CarServiceTypes } from "../Types"

const CarServices = () => {
  const navigate = useNavigate()

  const {
    isLoading: areCarServicesLoading,
    data: allCarServices,
    error: carServicesError,
  } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllCarServices(),
  })

  return (
    <div>
      {carServicesError ? (
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
                  <p>{service.name}</p>
                ))}
            </>
          )}
        </>
      ) : (
        <p>Error while getting all car services</p>
      )}
    </div>
  )
}

export default CarServices
