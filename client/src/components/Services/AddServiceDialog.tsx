import { useEffect, useState } from "react"
import {
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

const AddServiceDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const [serviceData, setServiceData] = useState<AddServiceTypes>({
    name: "",
    category: "",
    price: "",
    providers: [],
  })

  const [selectedProviders, setSelectedProviders] = useState<
    { first_name: string; profile_picture: string; id: number }[]
  >([])

  const [changedFields, setChangedFields] = useState({
    name: false,
    category: false,
    price: false,
  })

  const { isLoading: areServiceCategoriesLoading, data: allServiceCategories } =
    useQuery({
      queryKey: ["all-service-categories"],
      queryFn: () => getAllServiceCategories(),
    })

  const { isLoading: areServiceProvidersLoading, data: allServiceProviders } =
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
      style={{
        display: isOpen ? "block" : "none",
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "red",
      }}
    >
      {areServiceCategoriesLoading || areServiceProvidersLoading ? (
        <p>Loading...</p>
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
                setSelectedProviders([])
              })
            }
          >
            <label htmlFor="new_service_name">Име на услугата:</label>
            <input
              id="new_service_name"
              autoComplete="off"
              type="text"
              placeholder="Пране..."
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
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
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
            <br />
            <p>Търси служители:</p>
            <input
              type="text"
              value={waitedSearchValue}
              onChange={(e) => setWaitedSearchValue(e.target.value)}
            />
            {allServiceProviders
              ?.filter(
                (provider) => provider.first_name === providerSearchValue
              )
              .filter(
                (provider) => !serviceData.providers.includes(provider.id)
              )
              .map((provider) => (
                <div
                  key={provider.id}
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
                    if (serviceData.providers.includes(provider.id)) return

                    setServiceData({
                      ...serviceData,
                      providers: [...serviceData.providers, provider.id],
                    })

                    setSelectedProviders([...selectedProviders, provider])
                  }}
                >
                  {provider.first_name} <br style={{ paddingBottom: 2 }} />
                  <img
                    src={getPfpLink(provider.profile_picture)}
                    alt={`${provider.first_name}'s profile picture`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ))}
            <br />
            Изберени служители:
            {selectedProviders?.map((provider) => (
              <div
                key={provider.id}
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
                  if (serviceData.providers.includes(provider.id)) {
                    setServiceData({
                      ...serviceData,
                      providers: serviceData.providers.filter(
                        (id) => id !== provider.id
                      ),
                    })
                    setSelectedProviders(
                      selectedProviders.filter((p) => p.id !== provider.id)
                    )
                  }
                }}
              >
                {provider.first_name} <br style={{ paddingBottom: 2 }} />
                <img
                  src={getPfpLink(provider.profile_picture)}
                  alt={`${provider.first_name}'s profile picture`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}
            <br />
            <br />
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
                setSelectedProviders([])
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
