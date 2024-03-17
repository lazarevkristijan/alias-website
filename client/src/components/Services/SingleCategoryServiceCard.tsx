import { ProviderServiceShowcase, Service } from "../../Types"
import { useNavigate } from "react-router"
import Button from "../Shared/Button"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const SingleCategoryServiceCard = ({
  service,
  providers,
  orders,
}: {
  service: Service
  providers: ProviderServiceShowcase[]
  orders: number
}) => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`single-category-service-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      } `}
    >
      <p>Услуга: {service.name}</p>
      <p>Цена: {service.price}лв.</p>
      <Button onClick={() => navigate(`${service.id}`)}>Подробности</Button>
      <p>Поръчана {orders} пъти</p>
      Служители на услугата:
      <br />
      <div className="providers-container">
        {providers.map((provider) => {
          if (provider.service_id === service.id) {
            return (
              <div key={provider.provider_id}>
                <img
                  src={getPfpLink(provider.profile_picture)}
                  alt={`Профилна снимка на ${provider.first_name}`}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  onClick={() => navigate(`/служител/${provider.provider_id}`)}
                />
                <p>{provider.first_name}</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default SingleCategoryServiceCard
