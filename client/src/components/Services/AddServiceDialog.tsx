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
      <button onClick={() => setIsOpen(false)}>Затвори</button>

      <form onSubmit={(e) => handleAddService(e, serviceData)}>
        <label htmlFor="new_service_name">Име на услугата:</label>
        <input
          id="new_service_name"
          type="text"
          placeholder="Пране..."
          value={serviceData.service_name}
          onChange={(e) => {
            setServiceData({ ...serviceData, service_name: e.target.value })
          }}
        />
        <br />
        <br />
        <label htmlFor="new_service_category">Категория:</label>
        {!areServiceCategoriesLoading && (
          <select
            id="new_service_category"
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
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </option>
            ))}
          </select>
        )}
        <br />
        <br />
        <label htmlFor="new_service_price">Цена:</label>
        <input
          id="new_service_price"
          type="number"
          placeholder="Цена"
          value={serviceData.price}
          onChange={(e) => {
            setServiceData({ ...serviceData, price: Number(e.target.value) })
          }}
        />
        <br />
        <button>Добави</button>
      </form>
    </div>
  )
}

export default AddServiceDialog
