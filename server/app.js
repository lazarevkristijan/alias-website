import express from "express"
import { getUsers } from "./Routes/getRoutes.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

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

app.get("/", (req, res) => res.send("DB ROOT"))

app.get("/users", getUsers)

const server = app.listen(port, () =>
  console.log(`Alias is listening on port ${port}!`)
)
server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
