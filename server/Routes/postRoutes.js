import sql from "../db.js"
import jwt from "jsonwebtoken"
import { cookieOptions, dayinMs } from "../constants/index.js"
import { JWTsecret } from "../utils/verifyToken.js"

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    if (existingUser.length !== 0) {
      const token = jwt.sign({ userId: existingUser[0].id }, JWTsecret)

      res.cookie("user", token, {
        ...cookieOptions,
        httpOnly: true,
        maxAge: dayinMs * 7,
      })

      return res.json(existingUser[0])
    }
    await sql`
    INSERT INTO users(first_name, last_name, email, profile_picture, role_id, job_title)
    VALUES(${given_name || null}, ${
      family_name || null
    }, ${email}, ${picture}, 1, "")`

    const newUser = await sql`
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    const token = jwt.sign({ userId: newUser[0].id }, JWTsecret)

    res.cookie("user", token, {
      ...cookieOptions,
      httpOnly: true,
      maxAge: dayinMs * 7,
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
    VALUES(${name}, ${
      category === "коли"
        ? 1
        : category === "вкъщи"
        ? 2
        : category === "персонални"
        ? 3
        : null
    }, ${Number(price)})
    RETURNING id`

    providers.forEach(async (element) => {
      await sql`
      INSERT INTO service_providers(provider_id, service_id)
      VALUES(${element}, ${newServiceId[0].id})`
    })

    return res.json({ success: "Service added" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when adding service" })
  }
}
