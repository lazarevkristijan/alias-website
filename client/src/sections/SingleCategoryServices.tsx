import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getAllCategoryOrders } from "../Utils/SharedUtils"
import {
  OrderCount,
  ProviderServiceShowcase,
  Service,
} from "../Types"
import SingleCategoryServiceCard from "../components/Services/SingleCategoryServiceCard"
import { getAllCategoryProviders } from "../Utils/SharedUtils"
import { getAllServicesByCategory } from "../Utils/ServicesUtils"
import Button from "../components/Shared/Button"
import "./SingleCategoryServices.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useState } from "react"
import ConfirmationDialog from "../components/Shared/ConfirmationDialog"
import { handleCategoryDelete } from "../Utils/AdminUtils"

const SingleCategoryServices = () => {
  const navigate = useNavigate()
  const { category } = useParams()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isFetching: areCategoryServicesFetching, data: allCategoryServices } =
    useQuery<Service[]>({
      queryKey: [`all-${category}-services`],
      queryFn: () => getAllServicesByCategory(category || ""),
    }) as { isFetching: boolean; data: Service[] }

  const { isFetching: areProvidersFetching, data: allProviders } = useQuery<
    ProviderServiceShowcase[]
  >({
    queryKey: [`all-${category}-providers`],
    queryFn: () => getAllCategoryProviders(category || ""),
  }) as { isFetching: boolean; data: ProviderServiceShowcase[] }

  const { isFetching: areServiceOrdersFetching, data: allOrders } = useQuery<
    OrderCount[]
  >({
    queryKey: ["service-orders"],
    queryFn: () => getAllCategoryOrders(category || ""),
  }) as { isFetching: boolean; data: OrderCount[] }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <section
      className={`single-category-services ${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areCategoryServicesFetching ||
      areProvidersFetching ||
      areServiceOrdersFetching ? (
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
                orders={
                  allOrders.filter((s) => s.service_id === service.id).length
                }
              />
            ))}
          </div>

          <Button onClick={() => setIsDeleteDialogOpen(true)}>
            Изтрий категория
          </Button>
          {isDeleteDialogOpen && (
            <ConfirmationDialog
              cancelBtnEvent={() => setIsDeleteDialogOpen(false)}
              deleteBtnEvent={() => handleCategoryDelete(category || "")}
            />
          )}
        </section>
      )}
    </section>
  )
}

export default SingleCategoryServices
