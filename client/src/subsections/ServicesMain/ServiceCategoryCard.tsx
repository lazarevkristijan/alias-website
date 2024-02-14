import { useNavigate } from "react-router"
import { ServiceCategoryTypes } from "../../Types"
import { capitalizeString } from "../../Utils/SharedUtils"

const ServiceCategoryCard = ({
  category,
}: {
  category: ServiceCategoryTypes
}) => {
  const navigate = useNavigate()

  return (
    <div className="services-main-category-card">
      <p>{capitalizeString(category.name)}</p>

      <button onClick={() => navigate(`/услуги/${category.name}`)}>
        Виж повече
      </button>
    </div>
  )
}

export default ServiceCategoryCard
