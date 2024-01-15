import express from "express"
import { getUsers } from "./Routes/getRoutes.js"

const app = express()
const port = process.env.DB_PORT
const server = app.listen(port, () =>
  console.log(`Alias backend listening on port ${port}!`)
)

app.get("/", (req, res) => res.send("DB ROOT"))

app.get("/users", getUsers)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
