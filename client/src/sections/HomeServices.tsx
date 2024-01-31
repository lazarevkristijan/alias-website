import { useNavigate } from "react-router"
import { ServiceTypes } from "../Types"
import { getAllHomeServices } from "../Utils/HomeServicesUtils"
import { useQuery } from "@tanstack/react-query"
import ServiceCard from "../components/Services/ServiceCard"
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
          <p>Зареждане...</p>
        ) : (
          <>
            <button onClick={() => navigate("/услуги")}>Към услуги</button>
            <br />
            <br />
            <h2>Всички услуги за вкъщи</h2>
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

export default HomeServices
