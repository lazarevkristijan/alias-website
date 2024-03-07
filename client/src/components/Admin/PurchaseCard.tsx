import { Purchase } from "../../Types"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { capitalizeString } from "../../Utils/SharedUtils"

const PurchaseCard = ({
  purchase,
  theme,
}: {
  purchase: Purchase
  theme: string
}) => {
  return (
    <div
      className={`purchase-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>ID покупка: {purchase.id}</p>

      <br />
      <hr />
      <br />

      <img
        src={getPfpLink(purchase.buyer_profile_picture)}
        alt={`Профилна снимка на покупил: ${purchase.buyer_first_name}`}
        width={100}
        height={100}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />
      <p>ID купувач: {purchase.buyer_id}</p>
      <p>
        Купувач: {purchase.buyer_first_name}{" "}
        {purchase.buyer_middle_name && purchase.buyer_middle_name}{" "}
        {purchase.buyer_last_name}
      </p>

      <br />
      <hr />
      <br />

      <img
        src={getPfpLink(purchase.provider_profile_picture)}
        alt={`Профилна снимка на служител: ${purchase.provider_first_name}`}
        width={100}
        height={100}
        style={{
          borderRadius: "50%",
          border: "2px solid black",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <p>
        Служител: {purchase.provider_first_name}{" "}
        {purchase.provider_middle_name && purchase.provider_middle_name}{" "}
        {purchase.provider_last_name}
        <p>Специялност: {purchase.provider_job_title || "Няма специялност"}</p>
      </p>

      <br />
      <hr />
      <br />

      <p>ID усуга: {purchase.service_id}</p>
      <p>Услуга: {purchase.service_name}</p>
      <p>Категория: {capitalizeString(purchase.service_category)}</p>
      <p>Количество: {purchase.quantity}</p>
      <p>Единична цена: {purchase.service_price}лв.</p>
      <p>Общо: {purchase.total_paid}лв.</p>
      <br />
      <p>Дата на поръчване: {purchase.date_of_purchase.split("T")[0]}</p>
      <p>
        Час на поръчване:{" "}
        {purchase.date_of_purchase.split("T")[1].split(".")[0]}
      </p>
      <p>Свършена: {purchase.finished ? "Да" : "Не"}</p>
      {purchase.finished ? (
        <p>Дата на свършване: {purchase.date_of_purchase}</p>
      ) : (
        ""
      )}
    </div>
  )
}

export default PurchaseCard
