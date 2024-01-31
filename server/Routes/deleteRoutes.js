import sql from "../db.js"
import { cloudinary } from "../utils/cloudinary.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
    DELETE FROM users
    WHERE id = ${userId}`

    res.clearCookie("user")
    res.clearCookie("theme")

    return res.json({ success: "Успешно изтриен потребител" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при изтриване на потребител" })
  }
}

export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.userId
    const picturePath = req.body.pfpFileName

    await sql`
    UPDATE users
    SET profile_picture = 'https://i.postimg.cc/7LzHDxQv/download.png'
    WHERE id = ${userId}`

    if (picturePath) {
      cloudinary.uploader.destroy(picturePath)
    }

    return res.json({ success: "Успешно изтриена профилна картинка" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при изтриване на профилна снимка" })
  }
}

export const deleteService = async (req, res) => {
  try {
    const { id } = req.body

    await sql`
    DELETE FROM services
    WHERE id = ${id}`

    return res.json({ success: "Успешно изтриена услуга" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при изтриване на услуга" })
  }
}
