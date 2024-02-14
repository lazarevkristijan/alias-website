import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
  return (
    <footer>
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
      <Link
        to="/"
        color="#00"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        До връха
      </Link>
      <p>Copyright © 2024. All rights reserved.</p>
    </footer>
  )
}

export default Footer
