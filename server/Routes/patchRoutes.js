import { nameRegex } from "../Regex.js"
import sql from "../db.js"
import { cookieOptions } from "../constants/index.js"

export const patchChangeTheme = async (req, res) => {
  try {
    const userId = req.userId
    const { theme } = req.body

    await sql`
    UPDATE user_settings
    SET value = ${theme}
    WHERE setting_id = 1 AND user_id = ${userId}`

    res.cookie("theme", theme, {
      ...cookieOptions,
      expires: new Date("9999-12-31T23:59:59"),
    })

    return res.json({ theme: theme })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when changing theme" })
  }
}
