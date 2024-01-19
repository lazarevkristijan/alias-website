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

export const patchChangeCreds = async (req, res) => {
  try {
    const userId = req.userId
    let updatedUser = {}

    const user = await sql`
    SELECT *
    FROM users
    WHERE id = ${userId}`

    const { firstName, lastName } = req.body

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res
        .status(400)
        .json({ error: "First name or last name have invalid format" })
    }

    if (user[0].first_name !== firstName) {
      await sql`
        UPDATE users
        SET first_name = ${firstName}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, first_name: firstName }
    }

    if (user[0].last_name !== lastName) {
      await sql`
        UPDATE users
        SET last_name = ${lastName}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, last_name: lastName }
    }

    return res.json(updatedUser)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when changing credentials" })
  }
}

export const patchChangeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId

    const pfpData = { url: req.file.path, fileName: req.file.filename }
    const stringedPfp = JSON.stringify(pfpData)

    await sql`
    UPDATE users
    SET profile_picture = ${stringedPfp}
    WHERE id = ${userId}`

    return res.json(stringedPfp)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when changing profile picture" })
  }
}
