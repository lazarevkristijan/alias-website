import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { HiddenCategory } from "../../Types"
import Button from "../Shared/Button"

const HiddenCategoryCard = ({ category }: { category: HiddenCategory }) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div
      className={`provider-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>ID: {category.id}</p>
      <p>Име: {category.name}</p>
      <Button onClick={()=> {}}>Направи видима</Button>
    </div>
  )
}

export default HiddenCategoryCard
