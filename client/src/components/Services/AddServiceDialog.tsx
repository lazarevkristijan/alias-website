import { useState } from "react"
import {
  getAllServiceCategories,
  handleAddService,
} from "../../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import { ServiceCategoryTypes } from "../../Types"

const AddServiceDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const [serviceData, setServiceData] = useState({
    service_name: "",
    category: "",
    price: 0,
  })

  const { isLoading: areServiceCategoriesLoading, data: allServiceCategories } =
    useQuery({
      queryKey: ["all-service-categories"],
      queryFn: () => getAllServiceCategories(),
    })

  return (
    <div
      style={{
        display: isOpen ? "block" : "none",
        width: 200,
        height: 200,
        backgroundColor: "red",
      }}
    >
      <button onClick={() => setIsOpen(false)}>close dialog</button>

      <form onSubmit={(e) => handleAddService(e, serviceData)}>
        <input
          type="text"
          placeholder="Service name"
          value={serviceData.service_name}
          onChange={(e) => {
            setServiceData({ ...serviceData, service_name: e.target.value })
          }}
        />
        Category:
        {!areServiceCategoriesLoading && (
          <select
            value={serviceData.category}
            onChange={(e) =>
              setServiceData({ ...serviceData, category: e.target.value })
            }
          >
            {allServiceCategories.map((cat: ServiceCategoryTypes) => (
              <option
                key={cat.id}
                value={cat.name}
              >
                {cat.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          placeholder="Service price"
          value={serviceData.price}
          onChange={(e) => {
            setServiceData({ ...serviceData, price: Number(e.target.value) })
          }}
        />
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddServiceDialog
