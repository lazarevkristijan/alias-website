import sql from "../db.js"

export const getUsers = async (req, res) => {
  try {
    const users = await sql`
        SELECT * FROM users`

    return res.json(users)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when getting all users" })
  }
}
