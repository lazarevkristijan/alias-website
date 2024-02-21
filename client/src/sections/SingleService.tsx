import { useNavigate, useParams } from "react-router"
import {
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

const SingleService = () => {
  const navigate = useNavigate()

  const { category = "", id = "" } = useParams<{
    id: string
    category: string
  }>()

  const user = useSelector((state: RootState) => state.session.user)

  const { isLoading: isServiceLoading, data: service } = useQuery<ServiceTypes>(
    {
      queryKey: ["single-service"],
      queryFn: () => getSingleService(category, id),
    }
  )

  const { isLoading: areServiceProvidersLoading, data: serviceProviders } =
    useQuery<ProviderServiceShowcaseTypes[]>({
      queryKey: ["single-service-providers"],
      queryFn: () => getSingleServiceProviders(id),
    })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (!service || !serviceProviders) return null

  return (
    <div>
      {isServiceLoading || areServiceProvidersLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <Button onClick={() => navigate(`/услуги/${category}`)}>Назад</Button>
          <p>Услуга: {service?.name}</p>
          <p>
            Категория:{" "}
            {service?.category.charAt(0).toUpperCase() +
              service?.category.slice(1)}
          </p>
          <p>Цена: {service?.price}лв.</p>

          {serviceProviders.map((provider: ProviderServiceShowcaseTypes) => (
            <div
              key={provider.provider_id}
              style={{
                border: "1px solid black",
                width: "fit-content",
                height: "fit-content",
                minWidth: 80,
                minHeight: 80,
                textAlign: "center",
                paddingTop: 10,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/служител/${provider.provider_id}`)}
            >
              <img
                src={getPfpLink(provider.profile_picture)}
                alt={`Профилна снимка на ${provider.first_name}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />

              <p>{provider.first_name}</p>
            </div>
          ))}
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
              serviceProviders={serviceProviders}
            />
          )}

          <Button onClick={() => handleDeleteService(service.id)}>
            Изтрий
          </Button>
        </>
      )}
    </div>
  )
}

export default SingleService
