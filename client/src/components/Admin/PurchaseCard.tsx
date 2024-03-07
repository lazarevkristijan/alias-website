import { Purchase } from "../../Types"

const PurchaseCard = ({
  purchase,
  theme,
}: {
  purchase: Purchase
  theme: string
}) => {
  return (
    <div
      className={`provider-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>{purchase.id}</p>
    </div>
  )
}

export default PurchaseCard
