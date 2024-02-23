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

const SingleService = () => {
  const navigate = useNavigate()

  const { category = "", id = "" } = useParams<{
    id: string
    category: string
  }>()

  const user = useSelector((state: RootState) => state.session.user)
  const theme = useSelector((state: RootState) => state.theme.current)

  const { isLoading: isServiceLoading, data: service } = useQuery<ServiceTypes>(
    {
      queryKey: ["single-service"],
      queryFn: () => getSingleService(category, id),
    }
  )

  const {
    isLoading: areServiceProvidersLoading,
    data: singleServiceProviders,
  } = useQuery<ProviderServiceShowcaseTypes[]>({
    queryKey: ["single-service-providers"],
    queryFn: () => getSingleServiceProviders(id),
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (!service || !singleServiceProviders) return null

  return (
    <section>
      {isServiceLoading || areServiceProvidersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section
          className={`${theme === "dark" ? "dark-bg" : "light-bg"} box-shadow`}
        >
          <p
            className={`single-service-tag ${
              theme === "dark" ? "black-bg" : "white-bg"
            }`}
          >
            Услуга: {service?.name}
          </p>
          <p
            className={`single-service-tag ${
              theme === "dark" ? "black-bg" : "white-bg"
            }`}
          >
            Категория: {capitalizeString(service.category)}
          </p>
          <p
            className={`single-service-tag ${
              theme === "dark" ? "black-bg" : "white-bg"
            }`}
          >
            Цена: {service?.price}лв.
          </p>

          <h3>Служители предлагащи услугата</h3>
          <div className="service-providers-container">
            {singleServiceProviders.map(
              (provider: ProviderServiceShowcaseTypes) => (
                <div
                  className={`provider-card card-padding box-shadow ${
                    theme === "dark" ? "black-bg" : "white-bg"
                  }`}
                  key={provider.provider_id}
                  onClick={() => navigate(`/служител/${provider.provider_id}`)}
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
                  <Button>Виж служителя</Button>
                </div>
              )
            )}
          </div>

          {user?.role === "админ" && (
            <>
              <Button
                onClick={() =>
                  setIsEditDialogOpen(isEditDialogOpen ? false : true)
                }
              >
                Редактирай
              </Button>
            </>
          )}
          <br />
          {isEditDialogOpen && (
            <EditServiceDialog
              service={service}
              isOpen={isEditDialogOpen}
              setIsOpen={setIsEditDialogOpen}
              serviceProviders={singleServiceProviders}
            />
          )}

          <Button onClick={() => handleDeleteService(service.id)}>
            Изтрий
          </Button>
        </section>
      )}
    </section>
  )
}

export default SingleService
