import { useEffect, useState } from "react"
import {
  capitalizeString,
  getAllServiceCategories,
  handleAddService,
} from "../../Utils/SharedUtils"
import { useQuery } from "@tanstack/react-query"
import {
  AddServiceTypes,
  ProviderTypes,
  ServiceCategoryTypes,
} from "../../Types"
import { priceRegex, serviceNameRegex } from "../../Regex"
import { getAllServiceProviders } from "../../Utils/ServiceProvidersUtils"
import { getPfpLink } from "../../Utils/SettingsUtils"
import Button from "../Shared/Button"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const AddServiceDialog = ({
  setIsOpen,
}: {
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  const [serviceData, setServiceData] = useState<AddServiceTypes>({
    name: "",
    category: "",
    price: "",
    providers: [],
  })

  const [changedFields, setChangedFields] = useState({
    name: false,
    category: false,
    price: false,
  })

  const {
    isFetching: areServiceCategoriesFetching,
    data: allServiceCategories,
  } = useQuery({
    queryKey: ["all-service-categories"],
    queryFn: () => getAllServiceCategories(),
  })

  const { isFetching: areServiceProvidersFetching, data: allServiceProviders } =
    useQuery<ProviderTypes[]>({
      queryKey: ["all-providers"],
      queryFn: () => getAllServiceProviders(),
    })

  const [waitedSearchValue, setWaitedSearchValue] = useState("")
  const [providerSearchValue, setProviderSearchValue] = useState("")

  useEffect(() => {
    const addValueTimeout = setTimeout(() => {
      setProviderSearchValue(waitedSearchValue)
    }, 500)

    return () => clearTimeout(addValueTimeout)
  }, [waitedSearchValue])

  return (
    <div
      className={`service-related-dialog card-padding ${
        theme === "dark" ? "black-bg" : "white-bg"
      }`}
    >
      {areServiceCategoriesFetching || areServiceProvidersFetching ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Затвори
          </Button>

          <form
            onSubmit={(e) =>
              handleAddService(e, serviceData).then(() => {
                setChangedFields({
                  name: false,
                  category: false,
                  price: false,
                })
                setServiceData({
                  name: "",
                  category: "",
                  price: "",
                  providers: [],
                })
                setProviderSearchValue("")
                setWaitedSearchValue("")
              })
            }
          >
            <label htmlFor="new_service_name">Име на услугата:</label>
            <input
              id="new_service_name"
              autoComplete="off"
              type="text"
              placeholder="Пране"
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
            <label htmlFor="new_service_category">Категория:</label>
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
                  {capitalizeString(cat.name)}
                </option>
              ))}
            </select>
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

            <p>Търси служители:</p>
            <input
              value={waitedSearchValue}
              onChange={(e) => setWaitedSearchValue(e.target.value)}
            />
            <div className="service-related-providers-container">
              {providerSearchValue !== "" &&
                allServiceProviders
                  ?.filter(
                    (provider) =>
                      provider.first_name
                        .toLowerCase()
                        .includes(providerSearchValue.toLowerCase()) ||
                      provider.last_name
                        .toLowerCase()
                        .includes(providerSearchValue.toLowerCase()) ||
                      (provider.middle_name &&
                        provider.middle_name
                          .toLowerCase()
                          .includes(providerSearchValue.toLowerCase())) ||
                      provider.email
                        .toLowerCase()
                        .includes(providerSearchValue.toLowerCase())
                  )
                  .filter(
                    (provider) => !serviceData.providers.includes(provider)
                  )
                  .map((provider) => (
                    <div
                      key={provider.id}
                      className={`service-related-provider card-padding ${
                        theme === "dark" ? "btn-dark-bg" : "btn-light-bg"
                      }`}
                      onClick={() => {
                        setServiceData({
                          ...serviceData,
                          providers: [...serviceData.providers, provider],
                        })

                        setWaitedSearchValue("")
                        setProviderSearchValue("")
                      }}
                    >
                      <img
                        src={getPfpLink(provider.profile_picture)}
                        alt={`${provider.first_name}'s profile picture`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <p>{provider.first_name}</p>
                    </div>
                  ))}
            </div>

            <p>Изберени служители:</p>
            <div className="service-related-providers-container">
              {serviceData.providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`service-related-provider card-padding ${
                    theme === "dark" ? "btn-dark-bg" : "btn-light-bg"
                  }`}
                  onClick={() => {
                    setServiceData({
                      ...serviceData,
                      providers: serviceData.providers.filter(
                        (currentProvider) => currentProvider.id !== provider.id
                      ),
                    })
                  }}
                >
                  <img
                    src={getPfpLink(provider.profile_picture)}
                    alt={`${provider.first_name}'s profile picture`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <p>{provider.first_name}</p>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={
                !priceRegex.test(serviceData.price) ||
                !serviceNameRegex.test(serviceData.name) ||
                serviceData.category === ""
              }
            >
              Добави
            </Button>

            <Button
              onClick={() => {
                setIsOpen(false)

                setChangedFields({
                  name: false,
                  category: false,
                  price: false,
                })

                setServiceData({
                  name: "",
                  category: "",
                  price: "",
                  providers: [],
                })
              }}
            >
              Отказ
            </Button>

            <Button
              onClick={() => {
                setChangedFields({
                  name: false,
                  category: false,
                  price: false,
                })

                setServiceData({
                  name: "",
                  category: "",
                  price: "",
                  providers: [],
                })
                setProviderSearchValue("")
                setWaitedSearchValue("")
              }}
            >
              Нулиране
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default AddServiceDialog
