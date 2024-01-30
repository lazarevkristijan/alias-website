import { useDispatch } from "react-redux"
import { handleChangeTheme } from "../../Utils/ProfileUtils"

const ChangeTheme = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <p>Промени режим</p>
      <button onClick={() => handleChangeTheme("dark", dispatch)}>Тъмен</button>
      <button onClick={() => handleChangeTheme("light", dispatch)}>
        Светъл
      </button>
    </div>
  )
}

export default ChangeTheme
