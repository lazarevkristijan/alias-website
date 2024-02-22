import { ProviderServiceShowcaseTypes, ServiceTypes } from "../../Types"
import { useNavigate } from "react-router"
import Button from "../Shared/Button"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const SingleCategoryServiceCard = ({
  service,
  providers,
}: {
  service: ServiceTypes
  providers: ProviderServiceShowcaseTypes[]
}) => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`single-category-service-card card-padding ${
        theme === "dark" ? "black-bg" : "white-bg"
      } `}
    >
      <p>Услуга: {service.name}</p>
      <p>Цена: {service.price}лв.</p>
      <Button onClick={() => navigate(`${service.id}`)}>Подробности</Button>
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
                  style={{ borderRadius: "50%", cursor: "pointer" }}
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