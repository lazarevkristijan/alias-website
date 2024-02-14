import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllServiceCategories } from "../Utils/SharedUtils"
import ServiceCategoryCard from "../subsections/ServicesMain/ServiceCategoryCard"
import { ServiceCategoryTypes } from "../Types"
import "./Services.scss"

const ServicesMain = () => {
  const user = useSelector((state: RootState) => state.session.user)

  const { isLoading: areCategoriesLoading, data: allServiceCategories } =
    useQuery<ServiceCategoryTypes[]>({
      queryKey: ["categories"],
      queryFn: () => getAllServiceCategories(),
    })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <section>
      {areCategoriesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <section className="services-main-cards-container">
            {allServiceCategories?.map((category: ServiceCategoryTypes) => (
              <ServiceCategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </section>
          <br />
          <br />
          {user?.role === "админ" && (
            <>
              <button
                onClick={() =>
                  setIsAddDialogOpen(isAddDialogOpen ? false : true)
                }
              >
                Добави услуга
              </button>
              <AddServiceDialog
                isOpen={isAddDialogOpen}
                setIsOpen={setIsAddDialogOpen}
              />
            </>
          )}
        </>
      )}
    </section>
  )
}

export default ServicesMain
