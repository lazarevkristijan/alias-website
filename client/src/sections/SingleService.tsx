import { useNavigate, useParams } from "react-router"
import {
  capitalizeString,
  getSingleService,
  getSingleServiceProviders,
  handleDeleteService,
} from "../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import { ProviderServiceShowcaseTypes, ServiceTypes } from "../Types"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useState } from "react"
import EditServiceDialog from "../components/Services/EditServiceDialog"
import { getPfpLink } from "../Utils/SettingsUtils"
import Button from "../components/Shared/Button"
import "./SingleService.scss"
import BuyServiceDialog from "../components/Services/BuyServiceDialog"

const SingleService = () => {
  const navigate = useNavigate()

  const { category = "", id = "" } = useParams<{
    id: string
    category: string
  }>()

  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  const { isFetching: isServiceFetching, data: service } =
    useQuery<ServiceTypes>({
      queryKey: ["single-service"],
      queryFn: () => getSingleService(category, id),
    })

  const {
    isFetching: areServiceProvidersFetching,
    data: singleServiceProviders,
  } = useQuery<ProviderServiceShowcaseTypes[]>({
    queryKey: ["single-service-providers"],
    queryFn: () => getSingleServiceProviders(id),
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)

  if (!service || !singleServiceProviders) return null

  return (
    <section>
      {isServiceFetching || areServiceProvidersFetching ? (
        <p>Зареждане...</p>
      ) : (
        <section
          className={`${
            theme === "dark"
              ? "dark-bg box-shadow-white"
              : "light-bg box-shadow-black"
          }`}
        >
          <h2>Преглед на услуга</h2>
          <p
            className={`single-service-tag box-shadow ${
              theme === "dark"
                ? "card-black-bg box-shadow-white"
                : "card-white-bg box-shadow-black"
            }`}
          >
            Услуга: {service?.name}
          </p>
          <p
            className={`single-service-tag box-shadow ${
              theme === "dark"
                ? "card-black-bg box-shadow-white"
                : "card-white-bg box-shadow-black"
            }`}
          >
            Категория: {capitalizeString(service.category)}
          </p>
          <p
            className={`single-service-tag box-shadow ${
              theme === "dark"
                ? "card-black-bg box-shadow-white"
                : "card-white-bg box-shadow-black"
            }`}
          >
            Цена: {service?.price}лв.
          </p>

          <h3>Служители предлагащи услугата</h3>
          <div className="service-providers-container">
            {singleServiceProviders.map((provider) => (
              <div
                className={`provider-card card-padding ${
                  theme === "dark"
                    ? "card-black-bg box-shadow-white"
                    : "card-white-bg box-shadow-black"
                }`}
                key={provider.provider_id}
              >
                <img
                  src={getPfpLink(provider.profile_picture)}
                  alt={`Профилна снимка на ${provider.first_name}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />

                <p>{provider.first_name}</p>
                <Button
                  onClick={() => navigate(`/служител/${provider.provider_id}`)}
                >
                  Виж служителя
                </Button>
              </div>
            ))}
          </div>

          <div>
            <Button onClick={() => setIsBuyDialogOpen((prev) => !prev)}>
              Поръчай
            </Button>
            {isBuyDialogOpen && (
              <BuyServiceDialog
                setIsBuyDialogOpen={setIsBuyDialogOpen}
                providers={singleServiceProviders}
              />
            )}
          </div>

          <div>
            {user?.role === "админ" && (
              <Button
                onClick={() =>
                  setIsEditDialogOpen(isEditDialogOpen ? false : true)
                }
              >
                Редактирай
              </Button>
            )}
            {isEditDialogOpen && (
              <EditServiceDialog
                service={service}
                setIsOpen={setIsEditDialogOpen}
                serviceProviders={singleServiceProviders}
                handleDelete={handleDeleteService}
              />
            )}
          </div>
        </section>
      )}
    </section>
  )
}

export default SingleService
