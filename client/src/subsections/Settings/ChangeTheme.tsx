import { useDispatch, useSelector } from "react-redux"
import { handleChangeTheme } from "../../Utils/SettingsUtils"
import { RootState } from "../../Store"

const ChangeTheme = () => {
  const dispatch = useDispatch()
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <section className="settings-theme">
      <h4>Промени режим</h4>
      <button
        onClick={() => handleChangeTheme("dark", dispatch)}
        disabled={colorTheme === "dark"}
      >
        Тъмен
      </button>
      <button
        onClick={() => handleChangeTheme("light", dispatch)}
        disabled={colorTheme === "light"}
      >
        Светъл
      </button>
    </section>
  )
}

export default ChangeTheme
