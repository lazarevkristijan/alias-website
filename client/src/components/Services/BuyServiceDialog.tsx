import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../Shared/Button"
import { MakePayment, ProviderServiceShowcase, Service } from "../../Types"
import { getPfpLink } from "../../Utils/SharedUtils"
import { useState } from "react"
import { makePayment } from "../../Utils/ServicesUtils"

const BuyServiceDialog = ({
  setIsBuyDialogOpen,
  providers,
  service,
}: {
  setIsBuyDialogOpen: (value: React.SetStateAction<boolean>) => void
  providers: ProviderServiceShowcase[]
  service: Service
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)
  const user = useSelector((state: RootState) => state.session.user)

  const [data, setData] = useState<MakePayment>({
    buyer_id: user?.id || 0,
    service: service.name,
    service_id: service.id,
    provider_id: 0,
    price: Number(service.price),
  })

  return (
    <div
      className={`service-related-dialog card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
      {providers.length === 0 ? (
        <p>Няма служители</p>
      ) : (
        <>
          <Button
            onClick={() => {
              setIsBuyDialogOpen(false)
            }}
          >
            Затвори
          </Button>

          <p>Избери служител</p>
          <p>( или ще получиш случаен )</p>
          <div className="service-providers-container">
            {providers.map((provider) => (
              <div
                className={`provider-card card-padding ${
                  theme === "dark" ? "card-black-bg" : "card-white-bg"
                } ${
                  data.provider_id === provider.provider_id
                    ? "box-shadow-white"
                    : ""
                } `}
                key={provider.provider_id}
              >
                <img
                  src={getPfpLink(provider.profile_picture)}
                  alt={`Профилна снимка на ${provider.first_name}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  className="cover-center-img"
                />

                <p>{provider.first_name}</p>
                <Button
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      provider_id:
                        data.provider_id === provider.provider_id
                          ? 0
                          : provider.provider_id,
                    }))
                  }
                >
                  Избери
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={() => makePayment(data)}>Направи поръчка</Button>
        </>
      )}
    </div>
  )
}

export default BuyServiceDialog
