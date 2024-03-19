import { useState } from "react"
import { FaStar } from "react-icons/fa"
import Button from "../Shared/Button"
import { handleSendRating } from "../../Utils/ProfileUtils"
import { Rating, SendRatingData } from "../../Types"

const RatingBox = ({
  orderId,
  ratings,
  openDialogId,
  setOpenDialogId,
}: {
  orderId: number
  ratings: Rating[]
  openDialogId: number
  setOpenDialogId: (value: React.SetStateAction<number>) => void
}) => {
  const [hover, setHover] = useState<number | null>(null)

  const [ratingData, setRatingData] = useState<SendRatingData>({
    orderId,
    rating: 0,
    text: "",
  })

  const ratingOrderIds = ratings.map((r) => r.order_id)
  const thisRating = ratings.filter((r) => r.order_id === orderId)
  console.log(thisRating[0]?.rating || "none")
  return (
    <>
      {ratingOrderIds.includes(orderId) ? (
        <>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={40}
              color={thisRating[0]?.rating >= index + 1 ? "#ffc107" : "#e4e5e9"}
            />
          ))}
          <p className="w300">{thisRating[0]?.text}</p>
        </>
      ) : (
        <>
          <Button
            onClick={() =>
              setOpenDialogId(openDialogId === orderId ? 0 : orderId)
            }
          >
            Оцени
          </Button>
          {openDialogId === orderId && (
            <form
              onSubmit={(e) => {
                e.preventDefault()

                handleSendRating(ratingData)
              }}
              className="mt1rem"
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
                        setRatingData((prev) => ({
                          ...prev,
                          rating: currentrating,
                        }))
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
              {ratingData.rating !== 0 && (
                <p>Оценката ви е {ratingData.rating}</p>
              )}

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
                style={{
                  backgroundColor: ratingData.text.length > 200 ? "red" : "",
                }}
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
          )}
        </>
      )}
    </>
  )
}

export default RatingBox
