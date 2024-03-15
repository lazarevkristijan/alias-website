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

export const deleteCategory = async (req, res) => {
  try {
    const { name: categoryName } = req.params

    const services = await sql`
    SELECT a.id, b.name FROM services as a 
    JOIN service_categories as b
    ON a.category_id = b.id 
    WHERE b.name = ${categoryName} AND a.hidden != 1`

    let hasOrders = false

    for (const s of services) {
      const orders = await sql`
      SELECT * FROM orders
      WHERE service_id = ${s.id}`

      if (orders.length) {
        hasOrders = true
        break
      }
    }

    if (hasOrders) {
      await sql`
          UPDATE services
          SET hidden = 1
          WHERE id IN (
            SELECT b.id FROM orders as a
            JOIN services as b
            ON a.service_id = b.id
            JOIN service_categories as c
            ON b.category_id = c.id
            WHERE c.name = ${categoryName} AND b.hidden != 1      
          )`

      await sql`
        DELETE FROM services
        WHERE id IN (
          SELECT a.id FROM services as a
          LEFT JOIN orders as b
          ON a.id = b.service_id
          JOIN service_categories as c
          ON a.category_id = c.id
          WHERE b.id IS NULL AND c.name = ${categoryName}
        )`

      await sql`
        DELETE FROM service_providers
        WHERE service_id IN (
          SELECT id FROM services
          WHERE id IN (
            SELECT a.id FROM services as a
            LEFT JOIN orders as b
            ON a.id = b.service_id
            JOIN service_categories as c
            ON a.category_id = c.id
            WHERE c.name = ${categoryName}
          )
        )`

      await sql`
      UPDATE service_categories
      SET hidden = 1
      WHERE name = ${categoryName}`

      return res.json({
        success:
          "Съществуват поръчки в категорията, услугите с поръчки и категорията са скрити, а услугите които нямат поръчки са изтрити.",
      })
    }

    await sql`
    DELETE FROM services
    WHERE id IN (
      SELECT a.id FROM services as a
      JOIN service_categories as b
      ON a.category_id = b.id
      WHERE b.name = ${categoryName}
    )`

    await sql`
    DELETE FROM service_categories
    WHERE name = ${categoryName}`

    return res.json({
      success: `Успешно изтрита категорията "${categoryName}" и услугите и`,
    })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при изтриване на категория" })
  }
}
