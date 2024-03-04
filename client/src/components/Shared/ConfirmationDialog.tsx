import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "./Button"

const ConfirmationDialog = ({
  cancelBtnEvent,
  deleteBtnEvent,
}: {
  cancelBtnEvent: () => void
  deleteBtnEvent: () => void
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  return (
    <div className="confirmation-dialog-blur">
      <div
        className={`confirmation-dialog card-padding ${
          theme === "dark"
            ? "card-black-bg box-shadow-white"
            : "card-white-bg box-shadow-black"
        }`}
      >
        <h3>
          Сигурен ли си? <br /> Това не може да бъде отменено!
        </h3>
        <Button onClick={() => cancelBtnEvent()}>Откажи</Button>
        <Button onClick={() => deleteBtnEvent()}>Изтрий</Button>
      </div>
    </div>
  )
}

export default ConfirmationDialog
