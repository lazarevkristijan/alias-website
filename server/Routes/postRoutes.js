import sql from "../db.js"
import jwt from "jsonwebtoken"
import { cookieOptions, dayinMs } from "../constants/index.js"
import { JWTsecret } from "../utils/verifyToken.js"
import stripePackage from "stripe"
import axios from "axios"
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, a.phone_number, a.bio, b.name as role
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
    SELECT a.id, a.first_name, a.middle_name, a.last_name, a.email, a.profile_picture, a.job_title, a.phone_number, a.bio, b.name as role
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
    const nameLowCase = name.toLowerCase()

    await sql`
    INSERT INTO service_categories(name, hidden)
    VALUES (${nameLowCase}, 0)`

    return res.json({ success: "Успешно добавена категория" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при добавяне на категория" })
  }
}

export const postRateOrder = async (req, res) => {
  try {
    const { rating, text, orderId } = req.body

    await sql`
    INSERT INTO ratings (order_id, rating, text)
    VALUES(${orderId},${rating}, ${text})`

    return res.json({ success: "Успешно изпратена оценка" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при спазване на оценка" })
  }
}

export const postMakeCheckout = async (req, res) => {
  try {
    const { products, other } = req.body

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "bgn",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8/%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D0%BD%D0%B8/26",
      cancel_url: "http://localhost:5173",
      metadata: {
        ...other,
      },
    })

    res.json({ id: session.id })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при поръчване услуга" })
  }
}

export const postStripeWebhook = async (req, res) => {
  const event = req.body
  try {
    // const event = await stripe.webhooks.constructEvent(
    //   req.body,
    //   req.headers["stripe-signature"],
    //   process.env.STRIPE_WEBHOOK_SECRET
    // )

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        // const paymentIntent = await stripe.paymentIntents.retrieve(
        //   session.payment_intent
        // )
        await stripe.paymentIntents.retrieve(session.payment_intent)

        await axios.post(
          "http://localhost:5432/stripe/save-order",
          JSON.stringify(session.metadata),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )

        break
      case "checkout.session.failed":
        console.error("Payment failed: ", event)
        break
    }

    res.json({ received: true })
  } catch (error) {
    console.error("Error verifying webhook signature: ", error)
    res.status(400).send(`Webhook Error: ${error.message}`)
  }
}

export const postStripeSaveOrder = async (req, res) => {
  try {
    const { buyer_id, provider_id, price, service_id } = req.body

    let providers
    if (Number(provider_id) === 0) {
      providers = await sql`
      SELECT provider_id FROM service_providers
      WHERE service_id = ${service_id}`
    }

    await sql`
    INSERT INTO orders (buyer_id, service_id, quantity, date_of_order, provider_id, total_paid, finished)
    VALUES(${Number(buyer_id)}, ${Number(
      service_id
    )}, 1, NOW() AT TIME ZONE 'Europe/Sofia', ${
      Number(provider_id) !== 0
        ? Number(provider_id)
        : providers[Math.round(Math.random() * providers.length - 1)]
            .provider_id
    }, ${Number(price)}, 0)`

    return res.json({ success: "Успешно спазена покупка" })
  } catch (error) {
    console.error("Error while saving order", error)
    res.status(500).send("Грешка при спазване на покупка")
  }
}
