import { useNavigate } from "react-router"
import { ServiceCategoryTypes, SingleServiceTypes } from "../../Types"
import { capitalizeString } from "../../Utils/SharedUtils"
import { getAllServicesByCategory } from "../../Utils/ServicesUtils"
import { useQuery } from "@tanstack/react-query"
import Button from "../../components/Shared/Button"
import { RootState } from "../../Store"
import { useSelector } from "react-redux"

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
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`services-main-category-card card-padding box-shadow ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>{capitalizeString(category.name)}</p>

      <p>
        {areServicesLoading ? "..." : `Налични ${allServices?.length} услуги`}
      </p>

      <Button onClick={() => navigate(`/услуги/${category.name}`)}>
        Виж услугите
      </Button>
    </div>
  )
}

export default ServiceCategoryCard
