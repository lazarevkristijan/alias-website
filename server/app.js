import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import multer from "multer"
import { storage } from "./utils/cloudinary.js"
const upload = multer({ storage })
import { verifyToken } from "./utils/verifyToken.js"
import {
  getAllUsers,
  getUserSettings,
  getLogout,
  getAllServiceCategories,
  getAllServices,
  getSingleService,
  getAllServicesAndProviders,
  getCategoryServiceProviders,
  getProvider,
  getAllServiceProviders,
  getSingleServiceProviders,
  getSingleProviderServices,
} from "./Routes/getRoutes.js"
import { postAddService, postLoginOrRegister } from "./Routes/postRoutes.js"
import {
  deleteProfilePicture,
  deleteService,
  deleteUser,
} from "./Routes/deleteRoutes.js"
import {
  patchChangeCreds,
  patchChangeProfilePicture,
  patchChangeTheme,
  patchEditService,
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

// GENERAL
app.get("/", (req, res) => res.send("DB ROOT"))

// GET DATA
app.get("/all-users", getAllUsers)

// AUTHENTICATION RELATED
app.post("/user/login-or-register", postLoginOrRegister)
app.get("/user/logout", getLogout)
app.delete("/user/delete-user", verifyToken, deleteUser)

// USER SETTINGS
app.get("/user-settings", verifyToken, getUserSettings)
app.patch("/user-settings/change-theme", verifyToken, patchChangeTheme)
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

app.get("/services/all/:category", getAllServices)
app.get("/service/info/:category/:id", getSingleService)
app.get("/service/providers/all/:id", getSingleServiceProviders)
app.get("/services/all-service-categories", getAllServiceCategories)

app.post("/services/add-service", verifyToken, postAddService)
app.patch("/services/edit-service", verifyToken, patchEditService)
app.delete("/services/delete-service", verifyToken, deleteService)

app.get("/services/all-providers", getAllServicesAndProviders)
app.get("/all-providers", getAllServiceProviders)
app.get("/services/providers/:category", getCategoryServiceProviders)
app.get("/provider/:id", getProvider)
app.get("/providers/single/services/:id", getSingleProviderServices)

// LISTEN

const server = app.listen(port, () =>
  console.log(`Alias is listening on port ${port}!`)
)
server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
