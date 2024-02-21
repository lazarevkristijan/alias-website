import { useQuery } from "@tanstack/react-query"
import { getAllServiceProviders } from "../Utils/ServiceProvidersUtils"
import { ProviderTypes } from "../Types"
import { getPfpLink } from "../Utils/SettingsUtils"
import { useNavigate } from "react-router"

const Providers = () => {
  const navigate = useNavigate()

  const theme = localStorage.getItem("theme")

  const { isLoading: areProvidersLoading, data: providers } = useQuery<
    ProviderTypes[]
  >({
    queryKey: ["providers"],
    queryFn: () => getAllServiceProviders(),
  })

  if (!providers) return

  return (
    <section className={`${theme === "dark" ? "dark-bg" : "light-bg"}`}>
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
                    navigate(`/служител/${provider.id}`)
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
            </div>
          </section>
        </>
      )}
    </section>
  )
}

export default Providers
