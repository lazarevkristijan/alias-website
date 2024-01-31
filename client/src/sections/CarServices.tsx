import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { ServiceTypes } from "../Types"
import ServiceCard from "../components/Services/ServiceCard"

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
          <p>Зареждане...</p>
        ) : (
          <>
            <button onClick={() => navigate("/услуги")}>Към услуги</button>
            <br />
            <br />
            <h2>Всички услуги за коли</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <ServiceCard service={service} />
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default CarServices
