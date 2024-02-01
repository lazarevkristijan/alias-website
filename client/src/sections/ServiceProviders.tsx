import { useQuery } from "@tanstack/react-query"
import { getAllServiceProviders } from "../Utils/ServiceProvidersUtils"

const Providers = () => {
  const { isLoading: areProvidersLoading, data: providers } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getAllServiceProviders(),
  })

  return (
    <div>
      {areProvidersLoading ? (
        "Зареждане..."
      ) : (
        <>
          Всички служители:
          <p>Providers: {providers.length}</p>
        </>
      )}
    </div>
  )
}

export default Providers
