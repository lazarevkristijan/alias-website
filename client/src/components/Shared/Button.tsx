import "../../master.scss"

const Button = ({
  text,
  onClick,
  extraClasses,
  disabled = false,
}: {
  text: string
  onClick?: () => void
  extraClasses?: string
  disabled?: boolean
}) => {
  const theme = localStorage.getItem("theme")
  return (
    <button
      onClick={onClick}
      className={`${
        theme === "dark" ? "btn-dark-bg" : "btn-light-bg"
      } ${extraClasses}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
