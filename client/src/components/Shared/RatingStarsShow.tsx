import { FaStar } from "react-icons/fa"
import { RootState } from "../../Store"
import { useSelector } from "react-redux"

const RatingStarsShow = ({
  rating,
  size = 40,
}: {
  rating: number
  size?: number
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={size}
          color={
            rating >= index + 1
              ? "#ff9607"
              : theme === "dark"
              ? "#e4e5e9"
              : "#121212"
          }
        />
      ))}
    </div>
  )
}

export default RatingStarsShow
