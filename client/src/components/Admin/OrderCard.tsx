import { Order } from "../../Types"
import { handleOrderStatusChange } from "../../Utils/AdminUtils"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { capitalizeString } from "../../Utils/SharedUtils"
import Button from "../Shared/Button"

const OrderCard = ({
  order,
  theme,
}: {
  order: Order
  theme: string
}) => {
  console.log(order)
  return (
    <div
      className={`order-card card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      <p>ID покупка: {order.id}</p>

      <br />
      <hr />
      <br />

      <img
        src={getPfpLink(order.buyer_profile_picture)}
        alt={`Профилна снимка на покупил: ${order.buyer_first_name}`}
        width={100}
        height={100}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />
      <p>ID купувач: {order.buyer_id}</p>
      <p>
        Купувач: {order.buyer_first_name}{" "}
        {order.buyer_middle_name && order.buyer_middle_name}{" "}
        {order.buyer_last_name}
      </p>

      <br />
      <hr />
      <br />

      <img
        src={getPfpLink(order.provider_profile_picture)}
        alt={`Профилна снимка на служител: ${order.provider_first_name}`}
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
        Служител: {order.provider_first_name}{" "}
        {order.provider_middle_name && order.provider_middle_name}{" "}
        {order.provider_last_name}
      </p>
      <p>Специялност: {order.provider_job_title || "Няма специялност"}</p>

      <br />
      <hr />
      <br />

      <p>ID усуга: {order.service_id}</p>
      <p>Услуга: {order.service_name}</p>
      <p>Категория: {capitalizeString(order.service_category)}</p>
      <p>Количество: {order.quantity}</p>
      <p>Единична цена: {order.service_price}лв.</p>
      <p>Общо: {order.total_paid}лв.</p>
      <br />
      <p>Дата на поръчване: {order.date_of_order.split("T")[0]}</p>
      <p>
        Час на поръчване:{" "}
        {order.date_of_order.split("T")[1].split(".")[0]}
      </p>
      <p>Свършена: {order.finished ? "Да" : "Не"}</p>
      {order.finished ? (
        <>
          <p>Дата на свършване: {order.date_finished.split("T")[0]}</p>
          <p>
            Час на свършване:{" "}
            {order.date_finished.split("T")[1].split(".")[0]}
          </p>
        </>
      ) : (
        ""
      )}

      <br />
      <hr />
      <br />

      <Button
        onClick={() => handleOrderStatusChange(order.id)}
        disabled={Boolean(order.finished)}
      >
        Маркирай свършена
      </Button>
    </div>
  )
}

export default OrderCard
