import { useNavigate } from "react-router"
import { ServiceCategoryTypes } from "../../Types"
import { capitalizeString } from "../../Utils/SharedUtils"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const ServiceCategoryCard = ({
  category,
}: {
  category: ServiceCategoryTypes
}) => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`services-main-category-card ${
        theme === "dark" ? "dark-bg white-border" : "light-bg black-border"
      }`}
    >
      <p>{capitalizeString(category.name)}</p>

      <button onClick={() => navigate(`/услуги/${category.name}`)}>
        Виж повече
      </button>
    </div>
  )
}

export default ServiceCategoryCard
