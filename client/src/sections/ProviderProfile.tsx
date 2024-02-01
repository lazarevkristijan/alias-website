import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getProvider } from "../Utils/SharedUtils"
import { ProviderTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"

const ProviderProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading: isProviderLoading, data: provider } =
    useQuery<ProviderTypes>({
      queryKey: ["single-provider"],
      queryFn: () => getProvider(Number(id)),
    })

  return (
    <div>
      {isProviderLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <button onClick={() => navigate("/служители")}>Към служители</button>
          <br />
          <img
            src={getPfpLink(provider?.profile_picture || defaultPfpURL)}
            alt={`Профилна снимка на ${provider?.first_name}`}
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
          <p>Име: {provider?.first_name}</p>
          {provider?.middle_name && <p>Презиме: {provider?.middle_name}</p>}
          <p>Фамилия: {provider?.last_name}</p>
          <p>Имейл: {provider?.email}</p>
        </>
      )}{" "}
    </div>
  )
}

export default ProviderProfile
