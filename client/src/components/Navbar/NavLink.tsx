import { Link } from "react-router-dom"
import { capitalizeString } from "../../Utils/SharedUtils"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const NavLink = ({ to, title }: { to: string; title?: string }) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <Link
      to={to}
      className={`${theme === "dark" ? "nav-link-white" : "nav-link-black"}`}
    >
      {capitalizeString(title || to)}
    </Link>
  )
}

export default NavLink
