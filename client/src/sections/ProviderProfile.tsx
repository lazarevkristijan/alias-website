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
import Button from "../components/Shared/Button"
import "./ProviderProfile.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { displayPhoneNumber } from "../Utils/ProfileUtils"
import { getProviderOrders } from "../Utils/AdminUtils"
import displayBio from "../components/Shared/DisplayBio"

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

  const { isFetching: areOrdersFetching, data: orders } = useQuery({
    queryKey: ["provider-ordered-services"],
    queryFn: () => getProviderOrders(Number(id)),
  })

  if (!services) return

  return (
    <section>
      {isProviderFetching || areServicesFetching || areOrdersFetching ? (
        <p>Зареждане...</p>
      ) : (
        <section
          className={`provider-profile ${
            theme === "dark"
              ? "dark-bg box-shadow-white"
              : "light-bg box-shadow-black"
          }`}
        >
          <h2>Преглед на служител</h2>

          <div
            className={`provider-creds-container card-padding ${
              theme === "dark"
                ? "card-black-bg box-shadow-white"
                : "card-white-bg box-shadow-black"
            }`}
          >
            <img
              src={getPfpLink(provider?.profile_picture || defaultPfpURL)}
              alt={`Профилна снимка на ${provider?.first_name}`}
              width={100}
              height={100}
              className="cover-center-img"
            />
            <p
              className={`${
                theme === "dark" ? "label-dark-bg" : "label-light-bg"
              }`}
            >
              {provider?.first_name}{" "}
              {provider?.middle_name && provider?.middle_name + " "}
              {provider?.last_name}
            </p>
            {provider?.job_title && <p>{provider?.job_title}</p>}
            {provider?.phone_number && (
              <p>{displayPhoneNumber(provider?.phone_number)}</p>
            )}
            <p>{provider?.email}</p>
            {provider?.bio && (
              <p className="profile-bio">{displayBio(provider?.bio)}</p>
            )}
            <p>
              Предоставил {orders.length} услуг{orders.length === 1 ? "а" : "и"}
            </p>
          </div>

          <h3>Услуги които предлага {provider?.first_name}</h3>
          <div className="provider-services-container">
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  padding: 10,
                  margin: 10,
                  width: 250,
                }}
                className={`provider-service-card box-shadow card-padding ${
                  theme === "dark"
                    ? "card-black-bg box-shadow-white"
                    : "card-white-bg box-shadow-black"
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
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default ProviderProfile
