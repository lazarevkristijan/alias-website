import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import multer from "multer"
import { storage } from "./utils/cloudinary.js"
const upload = multer({ storage })
import { verifyToken } from "./utils/verifyToken.js"
import { checkAccess } from "./utils/checkAccess.js"
import {
  getAllUsers,
  getLogout,
  getAllServiceCategories,
  getAllServicesByCategory,
  getSingleService,
  getAllServicesAndProviders,
  getCategoryServiceProviders,
  getProvider,
  getAllServiceProviders,
  getSingleServiceProviders,
  getSingleProviderServices,
  getSingleUser,
  getAllServices,
  getAllProviderOrders,
  getAllOrders,
  getAllCategoryOrders,
  getAllUserOrders,
  getAllHiddenServices,
  getAllHiddenCategories,
  getUserRatings,
  getCategoryServicesRatings,
  getRatings,
} from "./Routes/getRoutes.js"
import {
  postAddCategory,
  postAddService,
  postLoginOrRegister,
  postMakeCheckout,
  postRateOrder,
  postStripeSaveOrder,
  postStripeWebhook,
} from "./Routes/postRoutes.js"
import {
  deleteCategory,
  deleteProfilePicture,
  deleteService,
  deleteUser,
  deleteUserByAdmin,
  deleteUserPfpByAdmin,
} from "./Routes/deleteRoutes.js"
import {
  patchAdminChangeCreds,
  patchAdminChangeProfilePicture,
  patchChangeCreds,
  patchChangeProfilePicture,
  patchEditService,
  patchChangeOrderStatus,
  patchUnhideCategory,
  patchUnhideService,
} from "./Routes/patchRoutes.js"

dotenv.config()

const app = express()
const port = process.env.DB_PORT

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkAccess)

// GENERAL
app.get("/", (req, res) => res.send("DB ROOT"))

// AUTHENTICATION RELATED
app.post("/user/authenticate", postLoginOrRegister)
app.get("/user/logout", getLogout)
app.delete("/user/delete-user", verifyToken, deleteUser)

// USER SETTINGS
app.patch("/user-settings/change-creds", verifyToken, patchChangeCreds)
app.patch(
  "/user-settings/change-profile-picture",
  verifyToken,
  upload.single("profilePicture"),
  patchChangeProfilePicture
)
app.delete(
  "/user-settings/delete-profile-picture",
  verifyToken,
  deleteProfilePicture
)

// SERVICES
app.get("/services/all", getAllServices)
app.get("/services/all/category/:category", getAllServicesByCategory)
app.get("/services/all/hidden", getAllHiddenServices)
app.get("/services/all-service-categories", getAllServiceCategories)
app.get("/service/info/:category/:id", getSingleService)
app.get("/service/providers/all/:id", getSingleServiceProviders)

app.post("/services/add-service", verifyToken, postAddService)
app.patch("/services/edit-service", verifyToken, patchEditService)
app.delete("/services/delete-service", verifyToken, deleteService)
app.patch("/service/unhide/:id", verifyToken, patchUnhideService)

app.post("/category/add", verifyToken, postAddCategory)
app.delete("/category/delete/:name", verifyToken, deleteCategory)
app.get("/categories/hidden", verifyToken, getAllHiddenCategories)
app.patch("/category/unhide/:id", verifyToken, patchUnhideCategory)

app.get("/services/all-providers", getAllServicesAndProviders)
app.get("/all-providers", getAllServiceProviders)
app.get("/services/providers/:category", getCategoryServiceProviders)
app.get("/provider/:id", getProvider)
app.get("/providers/single/services/:id", getSingleProviderServices)

// ADMIN ROUTES
app.get("/users/all", verifyToken, getAllUsers)
app.get("/admin/get-user/:id", verifyToken, getSingleUser)
app.patch(
  "/admin/user/change-profile-picture/:id",
  verifyToken,
  upload.single("profilePicture"),
  patchAdminChangeProfilePicture
)
app.delete(
  "/admin/user/delete-profile-picture/:id",
  verifyToken,
  deleteUserPfpByAdmin
)
app.patch(
  "/admin/user/change-credentials/:id",
  verifyToken,
  patchAdminChangeCreds
)
app.delete("/admin/user/delete/:id", verifyToken, deleteUserByAdmin)

// ORDERS
app.get("/orders", verifyToken, getAllOrders)
app.get("/orders/provider/:id", getAllProviderOrders)
app.get("/orders/category/:category", getAllCategoryOrders)
app.get("/orders/user/:id", verifyToken, getAllUserOrders)
app.patch("/order/mark-finished/:id", verifyToken, patchChangeOrderStatus)

// RATINGS
app.get("/ratings", getRatings)
app.get("/ratings/category/:name", getCategoryServicesRatings)
app.get("/ratings/user/:id", verifyToken, getUserRatings)
app.post("/rating/submit", verifyToken, postRateOrder)

app.post("/create-checkout-session", postMakeCheckout)
app.post("/webhook", postStripeWebhook)
app.post("/stripe/save-order", postStripeSaveOrder)
// LISTEN
const server = app.listen(port, () =>
  console.log(`Alias is listening on port ${port}!`)
)
server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
