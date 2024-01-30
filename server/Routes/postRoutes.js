import sql from "../db.js"
import jwt from "jsonwebtoken"
import { cookieOptions, dayinMs } from "../constants/index.js"
import { JWTsecret } from "../utils/verifyToken.js"

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.profile_picture, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    if (existingUser.length !== 0) {
      const token = jwt.sign({ userId: existingUser[0].id }, JWTsecret)

      const userTheme = await sql`
      SELECT value
      FROM user_settings
      WHERE user_id = ${existingUser[0].id} AND setting_id = 1`

      res.cookie("user", token, {
        ...cookieOptions,
        httpOnly: true,
        maxAge: dayinMs * 7,
      })
      res.cookie("theme", userTheme[0].value, {
        ...cookieOptions,
        maxAge: dayinMs * 7,
      })

      return res.json(existingUser[0])
    }
    await sql`
    INSERT INTO users(first_name, last_name, email, profile_picture, role)
    VALUES(${given_name || null}, ${
      family_name || null
    }, ${email}, ${picture}, 'клиент')`

    const newUser = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.profile_picture, b.name as role
    FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE email = ${email}`

    const token = jwt.sign({ userId: newUser[0].id }, JWTsecret)

    const userTheme = await sql`
    SELECT value
    FROM user_settings
    WHERE user_id = ${newUser[0].id} AND setting_id = 1`

    res.cookie("user", token, {
      ...cookieOptions,
      httpOnly: true,
      maxAge: dayinMs * 7,
    })
    res.cookie("theme", userTheme[0].value, {
      ...cookieOptions,
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
    const { service_name, category, price } = req.body

    await sql`
    INSERT INTO services(name, category_id, price)
    VALUES(${service_name}, ${
      category === "Car"
        ? 1
        : category === "Home"
        ? 2
        : category === "Personal"
        ? 3
        : null
    }, ${price})`

    return res.json({ success: "Service added" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when adding service" })
  }
}
