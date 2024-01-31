import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllPersonalServices } from "../Utils/PersonalServicesUtils"
import { ServiceTypes } from "../Types"
import ServiceCard from "../components/Services/ServiceCard"

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
                <ServiceCard
                  service={service}
                  key={service.id}
                />
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default PersonalServices
