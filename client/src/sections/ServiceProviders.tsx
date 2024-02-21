import { useQuery } from "@tanstack/react-query"
import { getAllServiceProviders } from "../Utils/ServiceProvidersUtils"
import { ProviderTypes } from "../Types"
import ProviderCard from "../components/Providers/ProviderCard"
import "./ServiceProviders.scss"

const Providers = () => {
  const theme = localStorage.getItem("theme")

  const { isLoading: areProvidersLoading, data: providers } = useQuery<
    ProviderTypes[]
  >({
    queryKey: ["providers"],
    queryFn: () => getAllServiceProviders(),
  })

  if (!providers) return

  return (
    <section
      className={`service-providers ${
        theme === "dark" ? "dark-bg" : "light-bg"
      }`}
    >
      {areProvidersLoading ? (
        "Зареждане..."
      ) : (
        <>
          <section>
            <h2>Всички служители:</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 50,
                marginTop: 20,
              }}
            >
              {providers.map((provider: ProviderTypes) => (
                <ProviderCard
                  provider={provider}
                  key={provider.id}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  )
}

export default Providers
