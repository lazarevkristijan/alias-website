import { useDispatch } from "react-redux"
import { handleChangeTheme } from "../../Utils/ProfileUtils"

const ChangeTheme = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <p>Change theme</p>
      <button onClick={() => handleChangeTheme("dark", dispatch)}>dark</button>
      <button onClick={() => handleChangeTheme("light", dispatch)}>
        light
      </button>
    </div>
  )
}

export default ChangeTheme
