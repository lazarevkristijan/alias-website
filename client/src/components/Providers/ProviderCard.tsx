import { useNavigate } from "react-router"
import { ProviderTypes } from "../../Types"
import { getPfpLink } from "../../Utils/SettingsUtils"

const ProviderCard = ({ provider }: { provider: ProviderTypes }) => {
  const navigate = useNavigate()

  return (
    <div className="provider-card box-shadow">
      <p>{provider.first_name}</p>
      {provider.middle_name && <p>{provider.middle_name}</p>}
      <p>{provider.last_name}</p>
      <img
        src={getPfpLink(provider.profile_picture)}
        alt={`${provider.first_name}'s profile picture`}
        style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%",
        }}
      />

      <button
        onClick={() => {
          navigate(`/служител/${provider.id}`)
        }}
      >
        Подробности
      </button>
    </div>
  )
}

export default ProviderCard
