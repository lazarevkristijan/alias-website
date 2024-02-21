import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { ProviderServiceShowcaseTypes, ServiceTypes } from "../Types"
import ServiceCard from "../components/Services/ServiceCard"
import { getAllCategoryProviders } from "../Utils/SharedUtils"
import { getPfpLink } from "../Utils/SettingsUtils"
import React from "react"
import Button from "../components/Shared/Button"

const CarServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllCarServices(),
  })

  const { isLoading: areProvidersLoading, data: allProviders } = useQuery({
    queryKey: ["all-providers"],
    queryFn: () => getAllCategoryProviders("коли"),
  })

  return (
    <div>
      <>
        {areCarServicesLoading || areProvidersLoading ? (
          <p>Зареждане...</p>
        ) : (
          <>
            <Button onClick={() => navigate("/услуги")}>Към услуги</Button>
            <br />
            <br />
            <h2>Всички услуги за коли</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <React.Fragment key={service.id}>
                  <ServiceCard service={service} />
                  Служители на услугата:
                  <br />
                  {allProviders.map(
                    (provider: ProviderServiceShowcaseTypes) => {
                      if (provider.service_id === service.id) {
                        return (
                          <React.Fragment key={provider.provider_id}>
                            <img
                              src={getPfpLink(provider.profile_picture)}
                              alt={`Профилна снимка на ${provider.first_name}`}
                              width={40}
                              height={40}
                              style={{ borderRadius: "50%", cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/служител/${provider.provider_id}`)
                              }
                            />
                          </React.Fragment>
                        )
                      }
                    }
                  )}
                </React.Fragment>
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default CarServices
