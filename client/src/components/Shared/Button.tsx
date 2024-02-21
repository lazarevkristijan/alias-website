import "../../master.scss"

const Button = ({
  onClick,
  extraClasses,
  disabled = false,
  type = "button",
  children,
}: {
  onClick?: () => void
  extraClasses?: string
  disabled?: boolean
  type?: "button" | "submit"
  children: React.ReactNode
}) => {
  const theme = localStorage.getItem("theme")
  return (
    <button
      onClick={onClick}
      className={`${
        theme === "dark" ? "btn-dark-bg" : "btn-light-bg"
      } ${extraClasses}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
