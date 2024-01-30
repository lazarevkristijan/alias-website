import { useNavigate } from "react-router"
import { ServiceTypes } from "../Types"
import { getAllHomeServices } from "../Utils/HomeServicesUtils"
import { useQuery } from "@tanstack/react-query"

const HomeServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-home-services"],
    queryFn: () => getAllHomeServices(),
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
            <h2>All home services</h2>
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

export default HomeServices
