import { useState } from "react"
import { FaStar } from "react-icons/fa"
import Button from "../Shared/Button"

const RatingBox = () => {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [ratingText, setRatingText] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        console.log("form submitted")
        console.log("star value: ", rating)
        console.log("text: ", ratingText)
      }}
      className="rating-box"
    >
      {[...Array(5)].map((_, index) => {
        const currentrating = index + 1
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentrating}
              onClick={() => setRating(currentrating)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              size={40}
              color={
                currentrating <= (hover || rating || 0) ? "#ffc107" : "#e4e5e9"
              }
              onMouseEnter={() => setHover(currentrating)}
            />
          </label>
        )
      })}
      {rating && <p>Оценката ви е {rating}</p>}

      <br />

      <textarea
        rows={3}
        cols={30}
        value={ratingText}
        onChange={(e) => setRatingText(e.target.value)}
        className="rating-textbox card-padding"
      />

      <br />

      <Button type="submit">Изпрати</Button>
    </form>
  )
}

export default RatingBox
