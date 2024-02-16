import { useEffect, useState } from "react"
import "./Home.scss"
import { useQuery } from "@tanstack/react-query"
import { getAllServices } from "../Utils/HomeUtils"
import { ServiceCategoryTypes, ServiceTypes } from "../Types"
import { useNavigate } from "react-router"
import { useAuth0 } from "@auth0/auth0-react"
import { capitalizeString, getAllServiceCategories } from "../Utils/SharedUtils"

const Home = () => {
  const navigate = useNavigate()

  const { loginWithPopup: auth0login, isAuthenticated: auth0Authenticated } =
    useAuth0()

  const [searchValue, setSearchValue] = useState("")
  const [awaitedSearchValue, setAwaitedSearchValue] = useState("")

  const { isLoading: areServicesLoading, data: allServices } = useQuery<
    ServiceTypes[]
  >({
    queryKey: ["all-services"],
    queryFn: () => getAllServices(),
  })

  const { isLoading: areCategoriesLoading, data: allCategories } = useQuery<
    ServiceCategoryTypes[]
  >({
    queryKey: ["all-categories"],
    queryFn: () => getAllServiceCategories(),
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(awaitedSearchValue)
    }, 500)

    return () => clearTimeout(timeout)
  }, [awaitedSearchValue])

  if (!allCategories) return

  return (
    <section>
      {areServicesLoading || areCategoriesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <section className="hero">
            <h1>НАМЕРИ РЕШЕНИЕТО НА ТВОЯТ ПРОБЛЕМ ВЕДНАГА</h1>

            <img
              src="https://www.pngall.com/wp-content/uploads/5/Car-Wash-PNG-Download-Image.png"
              alt="Service image 1"
              className="hero-img1"
            />
            <img
              src="services-img2.png"
              alt="Service image 2"
              className="hero-img2"
            />
            <img
              src="services-img3.png"
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
                            navigate(
                              `/услуги/${service.category}/${service.id}`
                            )
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

          <section className="why-choose-us">
            <h2>ЗАЩО ДА ИЗБЕРЕТЕ НАС?</h2>

            <div className="why-choose-us-boxes">
              <div>
                <h3>Разнообразие от услуги:</h3>
                <p>
                  Широк спектър от услуги за всеки вкус и нужда. Покриваме
                  домакинство, здраве, красота, информационни технологии и още.
                  Разнообразие от опции за всякакви предпочитания и изисквания.
                </p>
              </div>

              <div>
                <h3>Гарантирано качество и надеждност:</h3>
                <p>
                  Само сертифицирани и професионални доставчици на услуги.
                  Строги стандарти за избор и проверка на нашите партньори.
                  Отлично качество и надеждност във всяка предлагана услуга.
                </p>
              </div>

              <div>
                <h3>Лесно използване на уеб сайта:</h3>
                <p>
                  Интуитивен и лесен за навигация уеб сайт. Бързо търсене и
                  филтриране на желаните услуги. Прост процес за резервиране или
                  поръчка на услуга.
                </p>
              </div>

              <div>
                <h3>Професионална клиентска поддръжка:</h3>
                <p>
                  Отдадени и готови да помогнат служители. Бързи и ефективни
                  реакции на всякакви въпроси или проблеми. Обслужване на
                  клиенти на високо ниво през целия процес.
                </p>
              </div>
            </div>
          </section>

          <section className="how-to-get-started">
            <h2>КАК ДА ЗАПОЧНЕТЕ?</h2>
            {auth0Authenticated ? (
              <div>
                <p> Избери категория на услуги които искаш да разглеждаш </p>
                <div className="button-container">
                  {allCategories.map((category: ServiceCategoryTypes) => (
                    <button
                      key={category.id}
                      onClick={() => navigate(`/услуги/${category.name}`)}
                    >
                      {capitalizeString(category.name)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p>Създай си профил или си влезни в същестуващия</p>
                <button onClick={() => auth0login()}>Вход</button>
              </div>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default Home
