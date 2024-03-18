import { useState } from "react"
import { FaStar } from "react-icons/fa"
import Button from "../Shared/Button"
import { handleSendRating } from "../../Utils/ProfileUtils"
import { SendRatingData } from "../../Types"

const RatingBox = ({ orderId }: { orderId: number }) => {
  const [hover, setHover] = useState<number | null>(null)

  const [ratingData, setRatingData] = useState<SendRatingData>({
    orderId,
    rating: 0,
    text: "",
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        handleSendRating(ratingData)
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
              onClick={() => {
                setRatingData((prev) => ({ ...prev, rating: currentrating }))
                setHover(currentrating)
              }}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              size={40}
              color={
                currentrating <= (hover || ratingData.rating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => {
                if (ratingData.rating !== 0) {
                  return
                }
                setHover(currentrating)
              }}
            />
          </label>
        )
      })}
      {ratingData.rating !== 0 && <p>Оценката ви е {ratingData.rating}</p>}

      <br />

      <textarea
        rows={3}
        cols={30}
        value={ratingData.text}
        onChange={(e) =>
          setRatingData((prev) => ({ ...prev, text: e.target.value }))
        }
        className="rating-textbox card-padding"
        maxLength={200}
        style={{ backgroundColor: ratingData.text.length > 200 ? "red" : "" }}
      />
      <p>{ratingData.text.length}/200</p>
      <br />

      <Button
        type="submit"
        disabled={
          ratingData.text.length > 200 ||
          ratingData.rating < 1 ||
          ratingData.rating > 5
        }
      >
        Изпрати
      </Button>
    </form>
  )
}

export default RatingBox
