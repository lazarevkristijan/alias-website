import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"
import {
  getAllUserOrders,
  getUserRatings,
  handleLogout,
} from "../Utils/ProfileUtils"
import { defaultPfpURL } from "../constants"
import "./Profile.scss"
import { capitalizeString, getPfpLink,displayPhoneNumber } from "../Utils/SharedUtils"
import Button from "../components/Shared/Button"
import { useQuery } from "@tanstack/react-query"
import { Order, Rating } from "../Types"
import displayBio from "../components/Shared/DisplayBio"
import RatingBox from "../components/Profile/RatingBox"
import OrderCard from "../components/Shared/OrderCard"

const Profile = () => {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.session.user)
  const { isLoading: auth0loading, logout: auth0logout } = useAuth0()

  const theme = useSelector((state: RootState) => state.theme.current)

  const { isLoading: areOrdersLoading, data: allOrders } = useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: () => getAllUserOrders(user?.id || 0),
  })

  const { isLoading: areRatingsLoading, data: ratings } = useQuery<Rating[]>({
    queryKey: ["user-orders-ratings"],
    queryFn: () => getUserRatings(user?.id || 0),
  })

  const [openDialogId, setOpenDialogId] = useState(0)

  if (!user || !ratings) return

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

              <p className="mt1rem w300 label-dark-bg">
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
                <OrderCard order={order}>
                  {!areRatingsLoading && !areOrdersLoading && (
                    <RatingBox
                      orderId={order.id}
                      ratings={ratings}
                      openDialogId={openDialogId}
                      setOpenDialogId={setOpenDialogId}
                    />
                  )}
                </OrderCard>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  )
}

export default Profile
