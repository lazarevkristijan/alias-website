import { useSelector } from "react-redux"
import Button from "../components/Shared/Button"
import { RootState } from "../Store"
import { useNavigate } from "react-router"

const NotFound = () => {
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <section>
      <section
        className={`box-shadow-${
          theme === "dark" ? "white dark-bg" : "black light-bg"
        }`}
      >
        <h2>Оп-а! Не може да бъде намерено </h2>
        <Button onClick={() => navigate("/")}>Начало</Button>
        <Button onClick={() => navigate("/услуги")}>Услуги</Button>
        <div>
          <img
            src="/search-icon.svg"
            style={{ width: 30, marginTop: 10 }}
          />
        </div>
      </section>
    </section>
  )
}

export default NotFound
