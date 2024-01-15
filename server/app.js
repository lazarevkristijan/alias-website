import express from "express"
import sql from "./db.js"

const app = express()
const port = process.env.DB_PORT
const server = app.listen(port, () =>
  console.log(`Alias backend listening on port ${port}!`)
)

app.get("/", (req, res) => res.send("DB ROOT"))

app.get("/users", async (req, res) => {
  try {
    const users = await sql`
    SELECT * FROM users`

    return res.json(users)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when getting all users" })
  }
})

server.keepAliveTimeout = 120 * 1000
server.headersTimeout = 120 * 1000
