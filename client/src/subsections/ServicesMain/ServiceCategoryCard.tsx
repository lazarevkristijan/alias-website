import { useNavigate } from "react-router"
import { ServiceCategoryTypes, SingleServiceTypes } from "../../Types"
import { capitalizeString } from "../../Utils/SharedUtils"
import { getAllServicesByCategory } from "../../Utils/ServicesUtils"
import { useQuery } from "@tanstack/react-query"

const ServiceCategoryCard = ({
  category,
}: {
  category: ServiceCategoryTypes
}) => {
  const navigate = useNavigate()

  const { isLoading: areServicesLoading, data: allServices } = useQuery<
    SingleServiceTypes[]
  >({
    queryKey: [`all-${category.name}-services`],
    queryFn: () => getAllServicesByCategory(category.name),
  })

  return (
    <div className={`services-main-category-card`}>
      <p>{capitalizeString(category.name)}</p>

      <p>
        {areServicesLoading
          ? "Зареждане..."
          : `Налични ${allServices?.length} услуги`}
      </p>

      <button onClick={() => navigate(`/услуги/${category.name}`)}>
        Виж услугите
      </button>
    </div>
  )
}

export default ServiceCategoryCard
