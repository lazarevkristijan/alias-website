import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import {
  capitalizeString,
  getProvider,
  getSingleProviderServices,
} from "../Utils/SharedUtils"
import { ProviderTypes, SingleServiceTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import React from "react"
import Button from "../components/Shared/Button"
import "./ProviderProfile.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const ProviderProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isFetching: isProviderFetching, data: provider } =
    useQuery<ProviderTypes>({
      queryKey: ["single-provider"],
      queryFn: () => getProvider(Number(id)),
    })

  const { isFetching: areServicesFetching, data: services } = useQuery<
    SingleServiceTypes[]
  >({
    queryKey: ["provider-services"],
    queryFn: () => getSingleProviderServices(id || ""),
  })

  if (!services) return

  return (
    <section>
      {isProviderFetching || areServicesFetching ? (
        <p>Зареждане...</p>
      ) : (
        <section
          className={`provider-profile ${
            theme === "dark" ? "dark-bg" : "light-bg"
          }`}
        >
          <h2>Преглед на служител</h2>

          <div
            className={`provider-creds-container box-shadow card-padding ${
              theme === "dark" ? "black-bg" : "white-bg"
            }`}
          >
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
            <p>Специялност: {provider?.job_title}</p>
            <p>Имейл: {provider?.email}</p>
          </div>

          <h2>Услуги които предлага {provider?.first_name}</h2>
          <div className="provider-services-container">
            {services.map((service) => (
              <React.Fragment key={service.id}>
                <div
                  key={service.id}
                  style={{
                    padding: 10,
                    margin: 10,
                    width: 250,
                  }}
                  className={`provider-service-card box-shadow card-padding ${
                    theme === "dark" ? "black-bg" : "white-bg"
                  }`}
                >
                  <p>Услуга: {service.name}</p>
                  <p>Категория: {capitalizeString(service.category)}</p>
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
        </section>
      )}
    </section>
  )
}

export default ProviderProfile
