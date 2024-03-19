import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import {
  capitalizeString,
  getProvider,
  getRatings,
  getSingleProviderServices,
} from "../Utils/SharedUtils"
import { Provider, RatingLength, SingleService } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import Button from "../components/Shared/Button"
import "./ProviderProfile.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { displayPhoneNumber } from "../Utils/ProfileUtils"
import { getProviderOrders } from "../Utils/AdminUtils"
import displayBio from "../components/Shared/DisplayBio"
import RatingStarsShow from "../components/Shared/RatingStarsShow"

const ProviderProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isFetching: isProviderFetching, data: provider } = useQuery<Provider>(
    {
      queryKey: ["single-provider"],
      queryFn: () => getProvider(Number(id)),
    }
  )

  const { isFetching: areServicesFetching, data: services } = useQuery({
    queryKey: ["provider-services"],
    queryFn: () => getSingleProviderServices(id || ""),
  }) as { isFetching: boolean; data: SingleService[] }

  const { isFetching: areOrdersFetching, data: orders } = useQuery({
    queryKey: ["provider-ordered-services"],
    queryFn: () => getProviderOrders(Number(id)),
  })

  const { isFetching: areRatingsFetching, data: ratings } = useQuery({
    queryKey: ["all-ratings"],
    queryFn: () => getRatings(),
  }) as { isFetching: boolean; data: RatingLength[] }

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
            {provider?.bio && (
              <p className="profile-bio">{displayBio(provider?.bio)}</p>
            )}
            <p>
              Предоставил {orders.length} услуг{orders.length === 1 ? "а" : "и"}
            </p>
          </div>

          <h3>Услуги които предлага {provider?.first_name}</h3>
          <div className="provider-services-container">
            {!areRatingsFetching && (
              <>
                {services.map((service) => {
                  const rs = ratings
                    .map((r) => (r.service_id === service.id ? r.rating : 0))
                    .filter((r) => r !== 0)

                  return (
                    <div
                      key={service.id}
                      className={`provider-service-card card-padding ${
                        theme === "dark"
                          ? "card-black-bg box-shadow-white"
                          : "card-white-bg box-shadow-black"
                      }`}
                    >
                      <p>Услуга: {service.name}</p>
                      <p>Категория: {capitalizeString(service.category)}</p>
                      <p>Цена: {service.price}лв.</p>

                      <RatingStarsShow
                        rating={
                          !rs.length
                            ? 0
                            : rs.length === 1
                            ? rs[0]
                            : rs.reduce((a, b) => a + b) / rs.length
                        }
                        size={20}
                      />

                      <Button
                        onClick={() =>
                          navigate(`/услуги/${service.category}/${service.id}`)
                        }
                      >
                        Към услуга
                      </Button>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </section>
      )}
    </section>
  )
}

export default ProviderProfile
