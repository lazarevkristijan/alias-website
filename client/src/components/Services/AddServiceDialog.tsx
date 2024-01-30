import { useState } from "react"
import {
  getAllServiceCategories,
  handleAddService,
} from "../../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import { ServiceCategoryTypes } from "../../Types"
import { priceRegex, serviceNameRegex } from "../../Regex"

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
    price: "",
  })

  const [changedFields, setChangedFields] = useState({
    service_name: false,
    category: false,
    price: false,
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

      <form
        onSubmit={(e) =>
          handleAddService(e, serviceData).then(() => {
            setChangedFields({
              service_name: false,
              category: false,
              price: false,
            })
            setServiceData({
              service_name: "",
              category: "",
              price: "",
            })
          })
        }
      >
        <label htmlFor="new_service_name">Име на услугата:</label>
        <input
          id="new_service_name"
          autoComplete="off"
          type="text"
          placeholder="Пране..."
          value={serviceData.service_name}
          onChange={(e) => {
            if (!changedFields.service_name) {
              setChangedFields({ ...changedFields, service_name: true })
            }

            setServiceData({ ...serviceData, service_name: e.target.value })
          }}
          style={{
            backgroundColor:
              !serviceNameRegex.test(serviceData.service_name) &&
              changedFields.service_name
                ? "red"
                : "#fff",
          }}
        />
        <br />
        <br />
        <label htmlFor="new_service_category">Категория:</label>
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
        <label htmlFor="new_service_price">Цена в лв:</label>
        <input
          id="new_service_price"
          autoComplete="off"
          type="text"
          placeholder="10"
          value={serviceData.price}
          onChange={(e) => {
            if (!changedFields.price) {
              setChangedFields({ ...changedFields, price: true })
            }
            setServiceData({ ...serviceData, price: e.target.value })
          }}
          style={{
            backgroundColor:
              !priceRegex.test(serviceData.price) && changedFields.price
                ? "red"
                : "#fff",
          }}
        />
        <br />
        <button
          disabled={
            !priceRegex.test(serviceData.price) ||
            !serviceNameRegex.test(serviceData.service_name) ||
            serviceData.category === ""
          }
        >
          Добави
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false)

            setChangedFields({
              service_name: false,
              category: false,
              price: false,
            })

            setServiceData({
              service_name: "",
              category: "",
              price: "",
            })
          }}
        >
          Отказ
        </button>
        <button
          type="button"
          onClick={() => {
            setChangedFields({
              service_name: false,
              category: false,
              price: false,
            })

            setServiceData({
              service_name: "",
              category: "",
              price: "",
            })
          }}
        >
          Нулиране
        </button>
      </form>
    </div>
  )
}

export default AddServiceDialog
