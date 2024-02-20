import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useQuery } from "@tanstack/react-query"
import { getAllServiceCategories } from "../Utils/SharedUtils"
import ServiceCategoryCard from "../subsections/ServicesMain/ServiceCategoryCard"
import { ServiceCategoryTypes } from "../Types"
import "./ServicesMain.scss"

const ServicesMain = () => {
  const user = useSelector((state: RootState) => state.session.user)

  const { isLoading: areCategoriesLoading, data: allServiceCategories } =
    useQuery<ServiceCategoryTypes[]>({
      queryKey: ["categories"],
      queryFn: () => getAllServiceCategories(),
    })
  const theme = localStorage.getItem("theme")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <section
      className={`services ${theme === "dark" ? "dark-bg" : "light-bg"}`}
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
              <br />
              <br />
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
        </section>
      )}
    </section>
  )
}

export default ServicesMain
