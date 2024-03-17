import { useEffect, useState } from "react"
import "./Home.scss"
import { useQuery } from "@tanstack/react-query"
import { getAllServices } from "../Utils/HomeUtils"
import { ServiceCategory, Service } from "../Types"
import { useNavigate } from "react-router"
import { useAuth0 } from "@auth0/auth0-react"
import { capitalizeString, getAllServiceCategories } from "../Utils/SharedUtils"
import Button from "../components/Shared/Button"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Home = () => {
  const navigate = useNavigate()

  const { loginWithPopup: auth0login, isAuthenticated: auth0Authenticated } =
    useAuth0()

  const theme = useSelector((state: RootState) => state.theme.current)

  const [searchValue, setSearchValue] = useState("")
  const [awaitedSearchValue, setAwaitedSearchValue] = useState("")

  const { isLoading: areServicesLoading, data: allServices } = useQuery<
    Service[]
  >({
    queryKey: ["all-services"],
    queryFn: () => getAllServices(),
  })

  const { isLoading: areCategoriesLoading, data: allCategories } = useQuery<
    ServiceCategory[]
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

  const [isHeroBgLoading, setIsHeroBgLoading] = useState(true)
  if (!allCategories) return

  const heroBg = new Image()
  heroBg.onload = () => {
    if (window.innerWidth > 600) {
      document.querySelector(".hero")?.classList.add("hero-bg")
    } else {
      document.querySelector(".hero")?.classList.add("hero-mob-bg")
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        document.querySelector(".hero")?.classList.remove("hero-bg")
        document.querySelector(".hero")?.classList.add("hero-mob-bg")
      } else {
        document.querySelector(".hero")?.classList.add("hero-bg")
        document.querySelector(".hero")?.classList.remove("hero-mob-bg")
      }
    })
    setIsHeroBgLoading(false)
  }
  heroBg.src = "/hero.jpg"

  return (
    <section>
      {!isHeroBgLoading && (
        <>
          <section
            className={`hero box-shadow-${
              theme === "dark" ? "white" : "black"
            }`}
          >
            <h1 className={`${theme === "dark" ? "black-bg" : "white-bg"}`}>
              ТВОЯТ ПРОБЛЕМ ИМА РЕШЕНИЕ ПРИ НАС
            </h1>

            <div className={`search-service-container`}>
              <input
                onChange={(e) => setAwaitedSearchValue(e.target.value)}
                value={awaitedSearchValue}
                placeholder="Услуга"
              />
              {searchValue !== "" &&
                !areCategoriesLoading &&
                !areServicesLoading && (
                  <div
                    className={`services-results-container box-shadow-${
                      theme === "dark" ? "white" : "black"
                    } ${theme === "dark" ? "black-bg" : "white-bg"}`}
                  >
                    {allServices?.filter((service) =>
                      service.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    ).length !== 0 ? (
                      allServices
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
                            <p>{service.name}</p>
                            <p>{service.price}лв.</p>
                            <Button
                              onClick={() =>
                                navigate(
                                  `/услуги/${service.category}/${service.id}`
                                )
                              }
                            >
                              Подробности
                            </Button>
                          </div>
                        ))
                    ) : (
                      <p>Няма такави усуги</p>
                    )}
                  </div>
                )}
            </div>
          </section>

          <section>
            <h2>ЗАЩО ДА ИЗБЕРЕТЕ НАС?</h2>

            <div className="why-choose-us-boxes">
              <div>
                <h3>Разнообразие от услуги за вас:</h3>
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

          <section
            className={`how-to-get-started box-shadow-${
              theme === "dark" ? "white dark-bg" : "black light-bg"
            }`}
          >
            <h2>КАК ДА ЗАПОЧНЕТЕ?</h2>
            {auth0Authenticated ? (
              <div>
                <p> Избери категория на услуги от която се нуждаеш </p>
                <div className="button-container">
                  {allCategories.map((category: ServiceCategory) => (
                    <Button
                      key={category.id}
                      onClick={() => navigate(`/услуги/${category.name}`)}
                    >
                      {capitalizeString(category.name)}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p>Създай си профил или си влезни в същестуващия</p>
                <Button onClick={() => auth0login()}>Вход</Button>
              </div>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default Home
