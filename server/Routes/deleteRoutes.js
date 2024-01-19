import sql from "../db.js"
import { cloudinary } from "../utils/cloudinary.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
    DELETE FROM users
    WHERE id = ${userId}`

    req.clearCookie("user")
    req.clearCookie("theme")

    return res.json({ success: "Successfully deleted user" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when deleting user" })
  }
}
