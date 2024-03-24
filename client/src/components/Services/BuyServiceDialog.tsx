import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import Button from "../Shared/Button"
import { ProviderServiceShowcase } from "../../Types"
import { getPfpLink } from "../../Utils/SharedUtils"
import { useState } from "react"
import { makePayment } from "../../Utils/ServicesUtils"

const BuyServiceDialog = ({
  setIsBuyDialogOpen,
  providers,
}: {
  setIsBuyDialogOpen: (value: React.SetStateAction<boolean>) => void
  providers: ProviderServiceShowcase[]
}) => {
  const theme = useSelector((state: RootState) => state.theme.current)

  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(
    null
  )

  return (
    <div
      className={`service-related-dialog card-padding ${
        theme === "dark"
          ? "card-black-bg box-shadow-white"
          : "card-white-bg box-shadow-black"
      }`}
    >
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
              selectedProviderId === provider.provider_id
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
                setSelectedProviderId((prev) =>
                  prev === provider.provider_id ? null : provider.provider_id
                )
              }
            >
              Избери
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={() => makePayment()}>Направи поръчка</Button>
    </div>
  )
}

export default BuyServiceDialog
