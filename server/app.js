import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import multer from "multer"
import { storage } from "./utils/cloudinary.js"
const upload = multer({ storage })
import { getAllUsers, getLogout } from "./Routes/getRoutes.js"
import { postLoginOrRegister } from "./Routes/postRoutes.js"

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
app.post("/login-or-register", postLoginOrRegister)
app.get("/logout", getLogout)

const server = app.listen(port, () =>
  console.log(`Alias is listening on port ${port}!`)
)
server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
