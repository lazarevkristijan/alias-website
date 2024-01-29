import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getAllCarServices } from "../Utils/CarServicesUtils"
import { ServiceTypes } from "../Types"
import AddServiceDialog from "../components/Services/AddServiceDialog"
import { useState } from "react"

const CarServices = () => {
  const navigate = useNavigate()

  const { isLoading: areCarServicesLoading, data: allCarServices } = useQuery({
    queryKey: ["all-car-services"],
    queryFn: () => getAllCarServices(),
  })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div>
      <>
        {areCarServicesLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <button onClick={() => navigate("/services")}>
              back to services
            </button>
            <button
              onClick={() => setIsAddDialogOpen(isAddDialogOpen ? false : true)}
            >
              add service
            </button>
            <AddServiceDialog
              isOpen={isAddDialogOpen}
              setIsOpen={setIsAddDialogOpen}
            />
            <br />
            <br />
            <h2>All car services</h2>
            {allCarServices &&
              allCarServices.map((service: ServiceTypes) => (
                <div>
                  <p>Услуга: {service.name}</p>
                  <p>Категория: {service.category}</p>
                  <p>Цена: {service.price}</p>
                </div>
              ))}
          </>
        )}
      </>
    </div>
  )
}

export default CarServices
