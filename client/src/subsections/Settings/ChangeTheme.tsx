import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { changeTheme } from "../../features/theme/themeSlice"

const ChangeTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <section className="settings-theme">
      <h4>Промени режим</h4>
      <button
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
      </button>
      <button
        onClick={() => {
          const root = document.getElementById("root")
          if (!root) return

          root.style.backgroundColor = "#fff"
          root.style.color = "#000"

          localStorage.setItem("theme", "light")
          dispatch(changeTheme("light"))
        }}
        disabled={theme === "light"}
      >
        Светъл
      </button>
    </section>
  )
}

export default ChangeTheme
