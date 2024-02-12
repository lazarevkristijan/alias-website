import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllPersonalServices } from "../Utils/PersonalServicesUtils"
import { ProviderServiceShowcaseTypes, ServiceTypes } from "../Types"
import ServiceCard from "../components/Services/ServiceCard"
import { getPfpLink } from "../Utils/SettingsUtils"
import { getAllCategoryProviders } from "../Utils/SharedUtils"
import React from "react"

const PersonalServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllPersonalServices(),
  })

  const { isLoading: areProvidersLoading, data: allProviders } = useQuery({
    queryKey: ["all-providers"],
    queryFn: () => getAllCategoryProviders("персонални"),
  })

  return (
    <div>
      <>
        {areCarServicesLoading || areProvidersLoading ? (
          <p>Зареждане...</p>
        ) : (
          <>
            <button onClick={() => navigate("/услуги")}>Към услуги</button>
            <br />
            <br />
            <h2>Всички персонални услуги</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <React.Fragment key={service.id}>
                  <ServiceCard
                    service={service}
                    key={service.id}
                  />
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

export default PersonalServices
