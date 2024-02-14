import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <div>
          <h4>Услуги</h4>
          <ul>
            <li>
              <Link to="/услуги/коли">Коли</Link>
            </li>
            <li>
              <Link to="/услуги/персонални">Персонални</Link>
            </li>
            <li>
              <Link to="/услуги/вкъщи">Вкъщи</Link>
            </li>
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
      </div>

      <p className="footer-legal">
        Copyright © 2024 Alias Group. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
