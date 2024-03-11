import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllServiceCategories } from "../Utils/SharedUtils"
import ServiceCategoryCard from "../subsections/ServicesMain/ServiceCategoryCard"
import { ServiceCategoryTypes } from "../Types"
import "./ServicesMain.scss"
import Button from "../components/Shared/Button"
import AddCategoryDialog from "../components/Services/AddCategoryDialog"

const ServicesMain = () => {
  const user = useSelector((state: RootState) => state.session.user)

  const { isLoading: areCategoriesLoading, data: allServiceCategories } =
    useQuery<ServiceCategoryTypes[]>({
      queryKey: ["categories"],
      queryFn: () => getAllServiceCategories(),
    })
  const theme = useSelector((state: RootState) => state.theme.current)

  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)

  return (
    <section
      className={`services ${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areCategoriesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section>
          <h2>Категории на услуги</h2>
          <div className="services-main-cards-container">
            {allServiceCategories?.map((category: ServiceCategoryTypes) => (
              <ServiceCategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
          {user?.role === "админ" && (
            <>
              <Button
                onClick={() =>
                  setIsAddServiceDialogOpen(
                    isAddServiceDialogOpen ? false : true
                  )
                }
              >
                Добави услуга
              </Button>
              {isAddServiceDialogOpen && (
                <AddServiceDialog setIsOpen={setIsAddServiceDialogOpen} />
              )}

              <Button
                onClick={() =>
                  setIsAddCategoryDialogOpen(
                    isAddCategoryDialogOpen ? false : true
                  )
                }
              >
                Добави категория
              </Button>
              {isAddCategoryDialogOpen && (
                <AddCategoryDialog setIsOpen={setIsAddCategoryDialogOpen} />
              )}
            </>
          )}
        </section>
      )}
    </section>
  )
}

export default ServicesMain
