import { useNavigate, useParams } from "react-router"
import { getSingleService, handleDeleteService } from "../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import { ServiceTypes } from "../Types"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useState } from "react"
import EditServiceDialog from "../components/EditServiceDialog"

const SingleService = () => {
  const navigate = useNavigate()

  const { category = "", id = "" } = useParams<{
    id: string
    category: string
  }>()

  const user = useSelector((state: RootState) => state.session.user)

  const { isLoading: gettingService, data: service } = useQuery<ServiceTypes>({
    queryKey: ["singleService"],
    queryFn: () => getSingleService(category, id),
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (!service) return null

  return (
    <div>
      <button onClick={() => navigate(`/услуги/${category}`)}>Назад</button>
      {gettingService ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <p>Услуга: {service?.name}</p>
          <p>
            Категория:{" "}
            {service?.category.charAt(0).toUpperCase() +
              service?.category.slice(1)}
          </p>
          <p>Цена: {service?.price}</p>
          {user?.role === "админ" && (
            <button
              onClick={() =>
                setIsEditDialogOpen(isEditDialogOpen ? false : true)
              }
            >
              Редактирай
            </button>
          )}
          <br />
          {isEditDialogOpen && (
            <EditServiceDialog
              service={service}
              isOpen={isEditDialogOpen}
              setIsOpen={setIsEditDialogOpen}
              // setIsEditDialogOpen={setIsEditDialogOpen}
            />
          )}
          <button onClick={() => handleDeleteService(service.id)}>
            Изтрий
          </button>
        </>
      )}
    </div>
  )
}

export default SingleService
