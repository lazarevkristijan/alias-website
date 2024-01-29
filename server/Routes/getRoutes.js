import sql from "../db.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await sql`
        SELECT * FROM users`

    return res.json(users)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when getting all users" })
  }
}

export const getLogout = async (req, res) => {
  try {
    res.clearCookie("user")
    res.clearCookie("theme")

    return res.json({ success: "Cookies cleared, logging user out" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when logging out" })
  }
}

export const getUserSettings = async (req, res) => {
  try {
    const userId = req.userId

    const userSettings = await sql`
    SELECT *
    FROM user_settings
    WHERE user_id = ${userId}`

    return res.json(userSettings)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when getting user settings" })
  }
}

export const getAllCarServices = async (req, res) => {
  try {
    const allCarServices = await sql`
    SELECT a.id, a.name, a.price, b.name as category FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id 
    WHERE b.name = 'Car'`

    return res.json(allCarServices)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when getting all car services" })
  }
}
