import { useNavigate } from "react-router"
import { ProviderTypes } from "../../Types"
import { getPfpLink } from "../../Utils/SettingsUtils"
import Button from "../Shared/Button"
import { RootState } from "../../Store"
import { useSelector } from "react-redux"

const ProviderCard = ({ provider }: { provider: ProviderTypes }) => {
  const navigate = useNavigate()

  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`provider-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
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
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {provider.job_title && <p>{provider.job_title}</p>}

      <Button
        onClick={() => {
          navigate(`/служител/${provider.id}`)
        }}
      >
        Подробности
      </Button>
    </div>
  )
}

export default ProviderCard
