import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../Shared/Button"
import { useState } from "react"
import { categoryNameRegex } from "../../Regex"
import { handleAddCategory } from "../../Utils/AdminUtils"
import {
  capitalizeString,
  getAllServiceCategories,
} from "../../Utils/SharedUtils"
import { ServiceCategory } from "../../Types"
import { useQuery } from "@tanstack/react-query"

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

  const { isLoading: areCategoriesLoading, data: categories } = useQuery<
    ServiceCategory[]
  >({
    queryKey: ["all-categories"],
    queryFn: () => getAllServiceCategories(),
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
              setChangedFields((prev) => ({ ...prev, name: true }))
            }

            setCategoryData((prev) => ({
              prev,
              name: capitalizeString(e.target.value),
            }))
          }}
          style={{
            backgroundColor:
              (!categoryNameRegex.test(categoryData.name) &&
                changedFields.name) ||
              categories
                ?.map((c) => c.name)
                .includes(categoryData.name.toLowerCase())
                ? "red"
                : "#fff",
          }}
        />

        {categories
          ?.map((c) => c.name)
          .includes(categoryData.name.toLowerCase()) && (
          <p>Тази категория вече съществува</p>
        )}

        <Button
          type="submit"
          disabled={
            !categoryData.name ||
            categories
              ?.map((c) => c.name)
              .includes(categoryData.name.toLowerCase()) ||
            areCategoriesLoading
          }
        >
          Добави
        </Button>
      </form>
    </div>
  )
}

export default AddCategoryDialog
