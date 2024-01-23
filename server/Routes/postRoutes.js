import sql from "../db.js"
import jwt from "jsonwebtoken"
import { cookieOptions, dayinMs } from "../constants/index.js"

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    console.log(req.body)

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.profile_picture
    FROM users as a
    WHERE email = ${email}`

    console.log(existingUser)
    return res.json(existingUser)

    // if (existingUser.length) {
    //   const token = jwt.sign({ userId: existingUser[0].id }, JWTsecret)

    //   const userTheme = await sql`
    //   SELECT value
    //   FROM user_settings
    //   WHERE user_id = ${existingUser[0].id} AND setting_id = 1
    //   `

    //   res.cookie("user", token, {
    //     ...cookieOptions,
    //     httpOnly: true,
    //     maxAge: dayinMs * 7,
    //   })
    //   res.cookie("theme", userTheme[0].value, {
    //     ...cookieOptions,
    //     maxAge: dayinMs * 7,
    //   })
    //   return res.json(existingUser[0])
    // }
    // await sql`
    // INSERT INTO users(first_name, last_name, email, profile_picture)
    // VALUES(${given_name || null}, ${family_name || null}, ${email}, ${picture})`

    // const newUser = await sql`
    // SELECT * FROM a.id, a.first_name, a.last_name, a.email, a.profile_picture
    // FROM users as a
    // WHERE email = ${email}`

    // const token = jwt.sign({ userId: newUser[0].id }, JWTsecret)

    // const userTheme = await sql`
    // SELECT value
    // FROM user_settings
    // WHERE user_id = ${newUser[0].id} AND setting_id = 1`

    // res.cookie("user", token, {
    //   ...cookieOptions,
    //   httpOnly: true,
    //   maxAge: dayinMs * 7,
    // })
    // res.cookie("theme", userTheme[0].value, {
    //   ...cookieOptions,
    //   maxAge: dayinMs * 7,
    // })

    // return res.json(newUser[0])
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when logging in or registering" })
  }
}
