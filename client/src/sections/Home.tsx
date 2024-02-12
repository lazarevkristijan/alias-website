import { useEffect, useState } from "react"
import "./Home.scss"
import { useQuery } from "@tanstack/react-query"
import { getAllServices } from "../Utils/HomeUtils"
import { ServiceTypes } from "../Types"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState("")
  const [awaitedSearchValue, setAwaitedSearchValue] = useState("")

  const { isLoading: areServicesLoading, data: allServices } = useQuery<
    ServiceTypes[]
  >({
    queryKey: ["all-services"],
    queryFn: () => getAllServices(),
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(awaitedSearchValue)
    }, 500)

    return () => clearTimeout(timeout)
  }, [awaitedSearchValue])

  return (
    <section>
      {areServicesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <section className="hero">
          <h1>НАМЕРИ РЕШЕНИЕТО НА ТВОЯТ ПРОБЛЕМ ВЕДНАГА</h1>

          <img
            src="https://www.pngall.com/wp-content/uploads/5/Car-Wash-PNG-Download-Image.png"
            alt="Service image 1"
            className="hero-img1"
          />
          <img
            src="https://www.svgrepo.com/show/530572/accelerate.svg"
            alt="Service image 2"
            className="hero-img2"
          />
          <img
            src="https://www.svgrepo.com/show/530572/accelerate.svg"
            alt="Service image 3"
            className="hero-img3"
          />
          <div className="search-service-container">
            <input
              type="text"
              onChange={(e) => setAwaitedSearchValue(e.target.value)}
              value={awaitedSearchValue}
              placeholder="Услуга..."
            />
            {searchValue !== "" && (
              <div className="services-results-container">
                {allServices
                  ?.filter((service) =>
                    service.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((service) => (
                    <div
                      className="service-result"
                      key={service.id}
                    >
                      <span>{service.name}</span>
                      <span>{service.price}лв.</span>
                      <button
                        onClick={() =>
                          navigate(`/услуги/${service.category}/${service.id}`)
                        }
                      >
                        Подробности
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}
    </section>
  )
}

export default Home
