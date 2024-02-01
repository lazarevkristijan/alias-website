import { useState } from "react"
import {
  ServiceCategoryTypes,
  ServiceTypes,
  SingleServiceProviderTypes,
} from "../Types"
import {
  getAllServiceCategories,
  handleEditService,
} from "../Utils/SharedUtils"
import { priceRegex, serviceNameRegex } from "../Regex"
import { useQuery } from "@tanstack/react-query"
import { getPfpLink } from "../Utils/SettingsUtils"

const EditServiceDialog = ({
  service,
  isOpen,
  setIsOpen,
  serviceProviders,
}: {
  service: ServiceTypes
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  serviceProviders: SingleServiceProviderTypes[]
}) => {
  const [serviceData, setServiceData] = useState({
    id: service.id,
    name: service.name,
    price: service.price.split(".")[0],
    category: service.category,
    providers: [...serviceProviders],
  })

  const initialServiceData = {
    name: service.name,
    price: service.price.split(".")[0],
    category: service.category,
    providers: [...serviceProviders],
  }

  const [changedFields, setChangedFields] = useState({
    name: false,
    price: false,
    category: false,
    providers: false,
  })

  const { isLoading: areServiceCategoriesLoading, data: allServiceCategories } =
    useQuery({
      queryKey: ["all-service-categories"],
      queryFn: () => getAllServiceCategories(),
    })

  console.log(serviceData)

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
        {serviceData.providers.map((provider: SingleServiceProviderTypes) => (
          <div
            style={{
              border: "1px solid black",
              width: "fit-content",
              height: "fit-content",
              minWidth: 80,
              minHeight: 80,
              textAlign: "center",
              paddingTop: 10,
              cursor: "pointer",
            }}
            onClick={() => {
              if (!changedFields.providers) {
                setChangedFields({ ...changedFields, providers: true })
              }

              setServiceData({
                ...serviceData,
                providers: serviceData.providers.filter(
                  (p) => p.id !== provider.id
                ),
              })
            }}
          >
            <img
              src={getPfpLink(provider.profile_picture)}
              alt={`Профилна снимка на ${provider.first_name}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />

            <p key={provider.id}>{provider.first_name}</p>
          </div>
        ))}
        <button
          disabled={
            !serviceNameRegex.test(serviceData.name) ||
            !priceRegex.test(serviceData.price) ||
            serviceData.category === "" ||
            changedFields.providers ||
            (serviceNameRegex.test(serviceData.name) &&
              initialServiceData.name === serviceData.name &&
              priceRegex.test(serviceData.price) &&
              initialServiceData.price === serviceData.price &&
              initialServiceData.category === serviceData.category)
          }
        >
          Спази
        </button>
      </form>

      <button
        onClick={() => {
          setServiceData({
            id: service.id,
            name: initialServiceData.name,
            price: initialServiceData.price,
            category: initialServiceData.category,
            providers: initialServiceData.providers,
          })
        }}
      >
        Нулиране
      </button>
    </div>
  )
}

export default EditServiceDialog
