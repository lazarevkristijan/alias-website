import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../Shared/Button"
import { useState } from "react"
import { categoryNameRegex } from "../../Regex"
import { handleAddCategory } from "../../Utils/AdminUtils"
import { capitalizeString } from "../../Utils/SharedUtils"

const AddCategoryDialog = ({
  setIsOpen,
}: {
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  const [categoryData, setCategoryData] = useState({
    name: "",
  })

  const [changedFields, setChangedFields] = useState({
    name: false,
  })

  return (
    <div
      className={`service-related-dialog card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <Button
        onClick={() => {
          setIsOpen(false)
        }}
      >
        Затвори
      </Button>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddCategory(categoryData)
        }}
      >
        <label htmlFor="new_category_name">Име на категория</label>
        <input
          id="new_category_name"
          autoComplete="off"
          placeholder="Пране"
          value={categoryData.name}
          onChange={(e) => {
            if (!changedFields.name) {
              setChangedFields({ ...changedFields, name: true })
            }

            setCategoryData({
              ...categoryData,
              name: capitalizeString(e.target.value),
            })
          }}
          style={{
            backgroundColor:
              !categoryNameRegex.test(categoryData.name) && changedFields.name
                ? "red"
                : "#fff",
          }}
        />

        <Button type="submit">Добави</Button>
      </form>
    </div>
  )
}

export default AddCategoryDialog
