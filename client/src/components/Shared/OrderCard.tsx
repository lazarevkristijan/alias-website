import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { Order } from "../../Types"
import { capitalizeString, getPfpLink } from "../../Utils/SharedUtils"

const OrderCard = ({
  order,
  children,
}: {
  order: Order
  children: React.ReactNode
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

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
      <p>Час на поръчване: {order.date_of_order.split("T")[1].split(".")[0]}</p>
      <p>Свършена: {order.finished ? "Да" : "Не"}</p>
      {order.finished ? (
        <>
          <p>Дата на свършване: {order.date_finished.split("T")[0]}</p>
          <p>
            Час на свършване: {order.date_finished.split("T")[1].split(".")[0]}
          </p>
        </>
      ) : (
        ""
      )}

      <br />
      <hr />
      <br />

      {children}
    </div>
  )
}

export default OrderCard
