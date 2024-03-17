import { useQuery } from "@tanstack/react-query"
import { getAllServiceProviders } from "../Utils/ServiceProvidersUtils"
import { Provider } from "../Types"
import ProviderCard from "../components/Providers/ProviderCard"
import "./ServiceProviders.scss"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Providers = () => {
  const { isLoading: areProvidersLoading, data: providers } = useQuery<
    Provider[]
  >({
    queryKey: ["providers"],
    queryFn: () => getAllServiceProviders(),
  })
  const theme = useSelector((state: RootState) => state.theme.current)

  if (!providers) return

  return (
    <section
      className={`service-providers ${
        theme === "dark"
          ? "dark-bg box-shadow-white"
          : "light-bg box-shadow-black"
      }`}
    >
      {areProvidersLoading ? (
        "Зареждане..."
      ) : (
        <section>
          <h2>Всички служители:</h2>
          <div className={`service-providers-container `}>
            {providers.map((provider: Provider) => (
              <ProviderCard
                provider={provider}
                key={provider.id}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default Providers
