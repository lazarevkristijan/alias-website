import sql from "../db.js"
import { cloudinary } from "../utils/cloudinary.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
    DELETE FROM users
    WHERE id = ${userId}`

    res.clearCookie("user")

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
    const { id: serviceId } = req.body

    const serviceOrders = await sql`
    SELECT * FROM orders
    WHERE service_id = ${serviceId}`

    if (serviceOrders.length) {
      await sql`
      UPDATE services 
      SET hidden = 1 
      WHERE id = ${serviceId}`

      return res.json({
        success:
          "Услугата има поръчки, сега е скрита, но съществува в системата",
      })
    }

    await sql`
    DELETE FROM services
    WHERE id = ${serviceId}`

    return res.json({ success: "Успешно изтриена услуга" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при изтриване на услуга" })
  }
}

export const deleteUserPfpByAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const picturePath = req.body.pfpFileName

    await sql`
    UPDATE users
    SET profile_picture = 'https://i.postimg.cc/7LzHDxQv/download.png'
    WHERE id = ${id}`

    if (picturePath) {
      cloudinary.uploader.destroy(picturePath)
    }

    return res.json({ success: "Успешно изтриена профилна картинка от админ" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при изтриване на профилна снимка от админ" })
  }
}

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params

    await sql`
    DELETE FROM users
    WHERE id = ${id}`

    return res.json({ success: "Успешно изтрит потребител от админ" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при изтриване на потребител от админ" })
  }
}
