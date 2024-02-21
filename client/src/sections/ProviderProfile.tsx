import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getProvider, getSingleProviderServices } from "../Utils/SharedUtils"
import { ProviderTypes, SingleServiceTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import React from "react"
import Button from "../components/Shared/Button"

const ProviderProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading: isProviderLoading, data: provider } =
    useQuery<ProviderTypes>({
      queryKey: ["single-provider"],
      queryFn: () => getProvider(Number(id)),
    })

  const { isLoading: areServicesLoading, data: services } = useQuery<
    SingleServiceTypes[]
  >({
    queryKey: ["provider-services"],
    queryFn: () => getSingleProviderServices(id || ""),
  })

  if (!services) return

  return (
    <div>
      {isProviderLoading || areServicesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <Button onClick={() => navigate("/служители")}>Към служители</Button>
          <br />
          <img
            src={getPfpLink(provider?.profile_picture || defaultPfpURL)}
            alt={`Профилна снимка на ${provider?.first_name}`}
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
          <p>Име: {provider?.first_name}</p>
          {provider?.middle_name && <p>Презиме: {provider?.middle_name}</p>}
          <p>Фамилия: {provider?.last_name}</p>
          <p>Имейл: {provider?.email}</p>

          <h2>Услуги които предлага {provider?.first_name}</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              textAlign: "center",
            }}
          >
            {services.map((service) => (
              <React.Fragment key={service.id}>
                <div
                  key={service.id}
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: 10,
                    margin: 10,
                    width: 250,
                  }}
                >
                  <p>Услуга: {service.name}</p>
                  <p>Категория: {service.category}</p>
                  <p>Цена: {service.price}лв.</p>
                  <Button
                    onClick={() =>
                      navigate(`/услуги/${service.category}/${service.id}`)
                    }
                  >
                    Към услуга
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProviderProfile
