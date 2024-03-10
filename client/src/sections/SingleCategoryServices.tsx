import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getAllCategoryServices } from "../Utils/SharedUtils"
import { ProviderServiceShowcaseTypes, ServiceTypes } from "../Types"
import SingleCategoryServiceCard from "../components/Services/SingleCategoryServiceCard"
import { getAllCategoryProviders } from "../Utils/SharedUtils"
import Button from "../components/Shared/Button"
import "./SingleCategoryServices.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const SingleCategoryServices = () => {
  const navigate = useNavigate()
  const { category } = useParams()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isFetching: areCategoryServicesFetching, data: allCategoryServices } =
    useQuery<ServiceTypes[]>({
      queryKey: [`all-${category}-services`],
      queryFn: () => getAllCategoryServices(category || ""),
    })

  const { isFetching: areProvidersFetching, data: allProviders } = useQuery<
    ProviderServiceShowcaseTypes[]
  >({
    queryKey: [`all-${category}-providers`],
    queryFn: () => getAllCategoryProviders(category || ""),
  })

  if (!allProviders) return
  return (
    <section
      className={`single-category-services ${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areCategoryServicesFetching || areProvidersFetching ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <Button onClick={() => navigate("/услуги")}>Към услуги</Button>
          <h2>Услуги: {category}</h2>
          <div className="category-services-container">
            {allCategoryServices?.map((service) => (
              <SingleCategoryServiceCard
                key={service.id}
                service={service}
                providers={allProviders}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default SingleCategoryServices
