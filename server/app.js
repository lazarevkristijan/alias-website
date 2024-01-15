import express from "express"

const app = express()
const port = process.env.PORT || 3001

app.get("/", (req, res) => res.send("DB ROOT"))

server.keepAliveTimeout = 120 * 1000
server.headersTimeout = 120 * 1000

const server = app.listen(port, () =>
  console.log(`Alias backend listening on port ${port}!`)
)
