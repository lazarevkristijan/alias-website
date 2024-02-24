import { useEffect, useState } from "react"
import {
  ModifyServiceTypes,
  ProviderServiceShowcaseTypes,
  ProviderTypes,
  ServiceCategoryTypes,
  ServiceTypes,
} from "../../Types"
import {
  getAllServiceCategories,
  handleEditService,
} from "../../Utils/SharedUtils"
import { priceRegex, serviceNameRegex } from "../../Regex"
import { useQuery } from "@tanstack/react-query"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { getAllServiceProviders } from "../../Utils/ServiceProvidersUtils"
import Button from "../Shared/Button"

const EditServiceDialog = ({
  service,
  isOpen,
  setIsOpen,
  serviceProviders,
}: {
  service: ServiceTypes
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  serviceProviders: ProviderServiceShowcaseTypes[]
}) => {
  const [serviceData, setServiceData] = useState<ModifyServiceTypes>({
    id: service.id,
    name: service.name,
    category: service.category,
    price: service.price,
    providers: [...serviceProviders],
  })

  const initialServiceData = {
    id: service.id,
    name: service.name,
    price: service.price,
    category: service.category,
    providers: [...serviceProviders],
  }

  const [changedFields, setChangedFields] = useState({
    name: false,
    price: false,
    category: false,
    providers: false,
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

  const [selectedProviders, setSelectedProviders] = useState<
    ProviderServiceShowcaseTypes[]
  >([...serviceProviders])

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
      {areServiceProvidersFetching || areServiceCategoriesFetching ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <p>Меню за редактиране</p>
          <Button onClick={() => setIsOpen(false)}>Затвори</Button>

          <form
            onSubmit={(e) => {
              handleEditService(e, serviceData)

              setChangedFields({
                name: false,
                price: false,
                category: false,
                providers: false,
              })
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
            {!areServiceCategoriesFetching && (
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
                  !priceRegex.test(String(serviceData.price)) &&
                  changedFields.price
                    ? "red"
                    : "#fff",
              }}
            />

            <p>CURRENT PROVIDERS</p>
            {selectedProviders.map(
              (serviceAndProvider: ProviderServiceShowcaseTypes) => (
                <div
                  key={serviceAndProvider.provider_id}
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
                    setChangedFields({ ...changedFields, providers: true })
                    setServiceData({
                      ...serviceData,
                      providers: serviceData.providers.filter(
                        (p) =>
                          p.service_id !== serviceAndProvider.service_id &&
                          p.provider_id !== serviceAndProvider.provider_id
                      ),
                    })

                    setSelectedProviders(
                      selectedProviders.filter(
                        (p) =>
                          p.service_id !== serviceAndProvider.service_id &&
                          p.provider_id !== serviceAndProvider.provider_id
                      )
                    )
                  }}
                >
                  <img
                    src={getPfpLink(serviceAndProvider.profile_picture)}
                    alt={`Профилна снимка на ${serviceAndProvider.first_name}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />

                  <p>{serviceAndProvider.first_name}</p>
                </div>
              )
            )}

            <p>ADD PROVIDERS</p>
            <input
              type="text"
              value={waitedSearchValue}
              onChange={(e) => setWaitedSearchValue(e.target.value)}
            />
            {allServiceProviders
              ?.filter(
                (provider) =>
                  provider.first_name
                    .toLowerCase()
                    .includes(providerSearchValue.toLowerCase()) ||
                  provider.last_name
                    .toLowerCase()
                    .includes(providerSearchValue.toLowerCase()) ||
                  provider.middle_name
                    .toLowerCase()
                    .includes(providerSearchValue.toLowerCase()) ||
                  provider.email
                    .toLowerCase()
                    .includes(providerSearchValue.toLowerCase())
              )
              .filter(
                (provider) =>
                  !selectedProviders
                    .map((serviceAndProvider) => serviceAndProvider.provider_id)
                    .includes(provider.id)
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
                    if (
                      serviceData.providers
                        .map(
                          (serviceAndProvider) => serviceAndProvider.provider_id
                        )
                        .includes(provider.id)
                    )
                      return

                    setWaitedSearchValue("")
                    setProviderSearchValue("")

                    setChangedFields({ ...changedFields, providers: true })

                    setServiceData({
                      ...serviceData,
                      providers: [
                        ...serviceData.providers,
                        {
                          first_name: provider.first_name,
                          profile_picture: provider.profile_picture,
                          provider_id: provider.id,
                          service_id: service.id,
                        },
                      ],
                    })

                    setSelectedProviders([
                      ...selectedProviders,
                      {
                        first_name: provider.first_name,
                        profile_picture: provider.profile_picture,
                        provider_id: provider.id,
                        service_id: service.id,
                      },
                    ])
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
            <Button
              type="submit"
              disabled={
                !serviceNameRegex.test(serviceData.name) ||
                !priceRegex.test(serviceData.price) ||
                serviceData.category === "" ||
                (serviceNameRegex.test(serviceData.name) &&
                  initialServiceData.name === serviceData.name &&
                  priceRegex.test(serviceData.price) &&
                  initialServiceData.price === serviceData.price &&
                  initialServiceData.category === serviceData.category &&
                  !changedFields.providers)
              }
            >
              Спази
            </Button>
          </form>

          <Button
            onClick={() => {
              setServiceData({
                id: service.id,
                name: initialServiceData.name,
                price: initialServiceData.price,
                category: initialServiceData.category,
                providers: initialServiceData.providers,
              })
              setChangedFields({
                name: false,
                price: false,
                category: false,
                providers: false,
              })
            }}
          >
            Нулиране
          </Button>
        </>
      )}
    </div>
  )
}

export default EditServiceDialog
