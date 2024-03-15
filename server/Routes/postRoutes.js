import sql from "../db.js"
import jwt from "jsonwebtoken"
import { cookieOptions, dayinMs } from "../constants/index.js"
import { JWTsecret } from "../utils/verifyToken.js"

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, a.phone_number, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    if (existingUser.length !== 0) {
      const token = jwt.sign({ userId: existingUser[0].id }, JWTsecret)

      res.cookie("user", token, {
        ...cookieOptions,
        httpOnly: true,
        maxAge: dayinMs * 1,
      })

      return res.json(existingUser[0])
    }
    await sql`
    INSERT INTO users(first_name, last_name, email, profile_picture, role_id)
    VALUES(${given_name || null}, ${
      family_name || null
    }, ${email}, ${picture}, 1)`

    const newUser = await sql`
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, a.phone_number, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    const token = jwt.sign({ userId: newUser[0].id }, JWTsecret)

    res.cookie("user", token, {
      ...cookieOptions,
      httpOnly: true,
      maxAge: dayinMs * 1,
    })

    return res.json(newUser[0])
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when logging in or registering" })
  }
}

export const postAddService = async (req, res) => {
  try {
    const { name, category, price, providers } = req.body

    const newServiceId = await sql`
    INSERT INTO services(name, category_id, price)
    VALUES(${name}, (SELECT id FROM service_categories WHERE name = ${category}),
     ${Number(price)})
    RETURNING id`

    providers.forEach(async (element) => {
      await sql`
      INSERT INTO service_providers(provider_id, service_id)
      VALUES(${element.id}, ${newServiceId[0].id})`
    })

    return res.json({ success: "Успешно добавена услуга" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при добавяне на услуга" })
  }
}

export const postAddCategory = async (req, res) => {
  try {
    const { name } = req.body
    const nameLowCase = name.toUpperCase()

    await sql`
    INSERT INTO service_categories(name, hidden)
    VALUES (${nameLowCase}, 0)`

    return res.json({ success: "Успешно добавена категория" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при добавяне на категория" })
  }
}
