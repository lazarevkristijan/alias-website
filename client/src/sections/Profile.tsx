import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import {
  displayPhoneNumber,
  getAllUserOrders,
  handleLogout,
} from "../Utils/ProfileUtils"
import { getPfpLink } from "../Utils/SettingsUtils"
import { defaultPfpURL } from "../constants"
import "./Profile.scss"
import { capitalizeString } from "../Utils/SharedUtils"
import Button from "../components/Shared/Button"
import { useQuery } from "@tanstack/react-query"
import { Order } from "../Types"
import displayBio from "../components/Shared/DisplayBio"
import RatingBox from "../components/Profile/RatingBox"

const Profile = () => {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.session.user)
  const {
    isLoading: auth0loading,
    isAuthenticated: auth0authenticated,
    logout: auth0logout,
  } = useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isLoading: areOrdersLoading, data: allOrders } = useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: () => getAllUserOrders(user?.id || 0),
  })

  const [openDialogId, setOpenDialogId] = useState(0)

  if (!user) return

  return (
    <section>
      {auth0loading ? (
        <p>Зареждане...</p>
      ) : (
        <>
          <section
            className={`profile ${
              theme === "dark"
                ? "dark-bg box-shadow-white"
                : "light-bg box-shadow-black"
            }`}
          >
            <h2>Профил</h2>
            <div className="creds-container">
              <img
                src={getPfpLink(user?.profile_picture || defaultPfpURL)}
                width={100}
                height={100}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "2px solid #000",
                }}
                alt={`Профилна снимка на ${user?.first_name}`}
              />
              <div className="full-name-profile">
                <p>{user?.first_name}</p>
                {user.middle_name && <p>{user?.middle_name}</p>}
                <p>{user?.last_name}</p>
              </div>
              {user.job_title && <p>{user.job_title}</p>}
              {user.phone_number && (
                <p>{displayPhoneNumber(user.phone_number)}</p>
              )}
              <p>{capitalizeString(user?.role)}</p>

              <p className="profile-bio label-dark-bg">
                {displayBio(user.bio)}
              </p>
            </div>
            <Button onClick={() => handleLogout(auth0logout)}>Изход</Button>
            <Button onClick={() => navigate("/настройки")}>Настройки</Button>
          </section>

          <section
            className={`user-orders ${
              theme === "dark"
                ? "dark-bg box-shadow-white"
                : "light-bg box-shadow-black"
            }`}
          >
            <h2>
              Поръчали сте {areOrdersLoading ? "..." : allOrders?.length} услуги
            </h2>
            <div className="user-orders-container">
              {allOrders?.map((order: Order) => (
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
                  <p>
                    Специялност:{" "}
                    {order.provider_job_title || "Няма специялност"}
                  </p>

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
                      <p>
                        Дата на свършване: {order.date_finished.split("T")[0]}
                      </p>
                      <p>
                        Час на свършване:{" "}
                        {order.date_finished.split("T")[1].split(".")[0]}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                  <Button
                    onClick={() =>
                      setOpenDialogId(openDialogId === order.id ? 0 : order.id)
                    }
                  >
                    Оцени
                  </Button>
                  {openDialogId === order.id && (
                    <RatingBox orderId={order.id} />
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  )
}

export default Profile
