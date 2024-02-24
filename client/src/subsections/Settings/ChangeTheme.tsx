import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { changeTheme } from "../../features/theme/themeSlice"
import Button from "../../components/Shared/Button"

const ChangeTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <section className="settings-theme">
      <h4>Промени режим</h4>
      <Button
        onClick={() => {
          const root = document.getElementById("root")
          if (!root) return

          root.style.backgroundColor = "#000"
          root.style.color = "#fff"

          localStorage.setItem("theme", "dark")
          dispatch(changeTheme("dark"))
        }}
        disabled={theme === "dark"}
      >
        Тъмен
      </Button>
      <Button
        onClick={() => {
          const root = document.getElementById("root")
          if (!root) return

          document.body.style.backgroundColor = "#fff"
          document.body.style.color = "#000"

          root.style.backgroundColor = "#fff"
          root.style.color = "#000"

          localStorage.setItem("theme", "light")
          dispatch(changeTheme("light"))
        }}
        disabled={theme === "light"}
      >
        Светъл
      </Button>
    </section>
  )
}

export default ChangeTheme
