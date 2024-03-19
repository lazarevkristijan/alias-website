import { FaStar } from "react-icons/fa"

const RatingStarsShow = ({
  rating,
  size = 40,
}: {
  rating: number
  size?: number
}) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={size}
          color={rating >= index + 1 ? "#ffc107" : "#e4e5e9"}
        />
      ))}
    </div>
  )
}

export default RatingStarsShow
