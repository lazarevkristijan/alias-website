import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getAllCategoryServices } from "../Utils/SharedUtils"
import { ProviderServiceShowcaseTypes, ServiceTypes } from "../Types"
import ServiceCard from "../components/Services/SingleCategoryServiceCard"
import { getAllCategoryProviders } from "../Utils/SharedUtils"
import React from "react"
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
        theme === "dark" ? "dark-bg" : "light-bg"
      }`}
    >
      <>
        {areCategoryServicesFetching || areProvidersFetching ? (
          <p>Зареждане...</p>
        ) : (
          <section>
            <Button onClick={() => navigate("/услуги")}>Към услуги</Button>
            <h2>
              Всички {category === "персонални" && category} услуги{" "}
              {category !== "персонални" && `за ${category}`}
            </h2>
            <div className="category-services-container">
              {allCategoryServices?.map((service) => (
                <React.Fragment key={service.id}>
                  <ServiceCard
                    service={service}
                    providers={allProviders}
                  />
                </React.Fragment>
              ))}
            </div>
          </section>
        )}
      </>
    </section>
  )
}

export default SingleCategoryServices
