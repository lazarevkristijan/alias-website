import { useNavigate, useParams } from "react-router"
import { getSingleService } from "../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import { ServiceTypes } from "../Types"

const SingleService = () => {
  const navigate = useNavigate()

  const { category = "", id = "" } = useParams<{
    id: string
    category: string
  }>()

  const { isLoading: gettingService, data: service } = useQuery<ServiceTypes>({
    queryKey: ["singleService"],
    queryFn: () => getSingleService(category, id),
  })

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
        </>
      )}
    </div>
  )
}

export default SingleService
