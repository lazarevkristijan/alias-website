import { useState } from "react"
import { ServiceCategoryTypes, ServiceTypes } from "../Types"
import {
  getAllServiceCategories,
  handleEditService,
} from "../Utils/SharedUtils"
import { priceRegex, serviceNameRegex } from "../Regex"
import { useQuery } from "@tanstack/react-query"

const EditServiceDialog = ({
  service,
  isOpen,
  setIsOpen,
}: {
  service: ServiceTypes
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const [serviceData, setServiceData] = useState({
    id: service.id,
    name: service.name,
    price: service.price.split(".")[0],
    category: service.category,
  })

  const initialServiceData = {
    name: service.name,
    price: service.price.split(".")[0],
    category: service.category,
  }

  const [changedFields, setChangedFields] = useState({
    name: false,
    price: false,
    category: false,
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
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "red",
      }}
    >
      <p>Меню за редактиране</p>

      <button onClick={() => setIsOpen(false)}>Затвори</button>

      <form
        onSubmit={(e) => {
          handleEditService(e, serviceData)
        }}
      >
        <label htmlFor="new_service_name">Име: </label>
        <input
          type="text"
          id="new_service_name"
          value={serviceData.name}
          onChange={(e) => {
            if (!changedFields.name) {
              setChangedFields({ ...changedFields, name: true })
            }
            setServiceData({ ...serviceData, name: e.target.value })
          }}
          style={{
            backgroundColor:
              !serviceNameRegex.test(serviceData.name) && changedFields.name
                ? "red"
                : "#fff",
          }}
        />
        <br />
        <br />
        <label htmlFor="new_service_category">Категория: </label>
        {!areServiceCategoriesLoading && (
          <select
            id="new_service_category"
            value={serviceData.category}
            onChange={(e) => {
              if (!changedFields.category) {
                setChangedFields({ ...changedFields, category: true })
              }
              setServiceData({ ...serviceData, category: e.target.value })
            }}
          >
            <option value="">Избери</option>
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
        <label htmlFor="new_service_price">Цена: </label>
        <input
          type="text"
          id="new_service_price"
          value={serviceData.price}
          onChange={(e) => {
            if (!changedFields.price) {
              setChangedFields({ ...changedFields, price: true })
            }
            setServiceData({ ...serviceData, price: e.target.value })
          }}
          style={{
            backgroundColor:
              !priceRegex.test(String(serviceData.price)) && changedFields.price
                ? "red"
                : "#fff",
          }}
        />
        <button
          disabled={
            !serviceNameRegex.test(serviceData.name) ||
            !priceRegex.test(serviceData.price) ||
            serviceData.category === "" ||
            (serviceNameRegex.test(serviceData.name) &&
              initialServiceData.name === serviceData.name &&
              priceRegex.test(String(serviceData.price)) &&
              initialServiceData.price === serviceData.price &&
              initialServiceData.category === serviceData.category)
          }
        >
          Спази
        </button>
      </form>
    </div>
  )
}

export default EditServiceDialog
