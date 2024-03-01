import { Link } from "react-router-dom"
import "./Footer.scss"
import { useQuery } from "@tanstack/react-query"
import { ServiceCategoryTypes } from "../Types"
import { capitalizeString, getAllServiceCategories } from "../Utils/SharedUtils"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Footer = () => {
  const { isLoading: areCategoriesLoading, data: allServiceCategories } =
    useQuery<ServiceCategoryTypes[]>({
      queryKey: ["categories"],
      queryFn: () => getAllServiceCategories(),
    })
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <footer
      className={`box-shadow-${theme === "dark" ? "white" : "black"} ${
        theme === "dark" ? "dark-bg" : "light-bg"
      }`}
    >
      {areCategoriesLoading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <div className="footer-links">
            <div>
              <h4>Услуги</h4>
              <ul>
                {allServiceCategories?.map((category) => (
                  <li key={category.id}>
                    <Link to={`/услуги/${category.name}`}>
                      {capitalizeString(category.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Общо</h4>
              <ul>
                <li>
                  <Link
                    to="/"
                    onClick={() =>
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    }
                  >
                    До връха
                  </Link>
                </li>
                <li>
                  <Link to="/профил">Профил</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Контакти</h4>
              <ul>
                <li>
                  <a href="tel:+359999999999">+359 999 999 999</a>
                </li>
                <li>
                  <a href="mailto:info@aliasgroup.bg">support@aliasgroup.bg</a>
                </li>
              </ul>
            </div>
          </div>

          <p className="footer-legal">
            Copyright © 2024 Alias Group. All rights reserved.
          </p>
        </>
      )}
    </footer>
  )
}

export default Footer
