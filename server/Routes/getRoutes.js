import sql from "../db.js"

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.profile_picture, a.middle_name, a.job_title, a.phone_number, a.bio, b.name as role FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id`

    return res.json(allUsers)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички потребители" })
  }
}

export const getLogout = async (req, res) => {
  try {
    res.clearCookie("user")

    return res.json({ success: "Cookies cleared, logging user out" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when logging out" })
  }
}

export const getAllServices = async (req, res) => {
  try {
    const services = await sql`
    SELECT a.id, a.name, b.name as category, a.price FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id
    WHERE a.hidden != 1 AND b.hidden != 1`

    return res.json(services)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване всички услуги" })
  }
}
export const getAllHiddenServices = async (req, res) => {
  try {
    const services = await sql`
    SELECT a.id, a.name, b.name as category, a.price FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id
    WHERE a.hidden = 1`

    return res.json(services)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване всички скрити услуги" })
  }
}

export const getAllServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params

    const allServices = await sql`
    SELECT a.id, a.name, a.price, b.name as category FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id 
    WHERE b.name = ${category} AND a.hidden != 1 AND b.hidden != 1`

    return res.json(allServices)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({
      error: `Грешка при получаване на всички услуги от категория ${category}`,
    })
  }
}

export const getAllServiceCategories = async (req, res) => {
  try {
    const allServiceCategories = await sql`
    SELECT * FROM service_categories
    WHERE hidden != 1`

    return res.json(allServiceCategories)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички категории на услуги" })
  }
}

export const getSingleService = async (req, res) => {
  try {
    const { category, id } = req.params

    const service = await sql`
    SELECT a.id, a.name, a.price, b.name as category FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id 
    WHERE a.id = ${id} AND b.name = ${category} AND a.hidden != 1`

    return res.json(service)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване единечна услуга" })
  }
}

export const getSingleServiceProviders = async (req, res) => {
  try {
    const { id } = req.params

    const providers = await sql`
    SELECT a.provider_id, a.service_id, b.first_name, b.job_title, b.profile_picture FROM service_providers as a
    JOIN users as b
    ON a.provider_id = b.id
    WHERE a.service_id = ${id}`

    return res.json(providers)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на служители за услугата" })
  }
}

export const getAllServicesAndProviders = async (req, res) => {
  try {
    const providers = await sql`
    SELECT * FROM service_providers`

    return res.json(providers)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване всички служители и услуги" })
  }
}

export const getAllServiceProviders = async (req, res) => {
  try {
    const providers = await sql`
    SELECT * FROM users
    WHERE role_id = 2`

    return res.json(providers)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване всички служители" })
  }
}

export const getCategoryServiceProviders = async (req, res) => {
  try {
    const { category } = req.params

    const providers = await sql`
    SELECT d.first_name, d.profile_picture, a.service_id, a.provider_id, b.name, b.price, c.name as category FROM service_providers as a
    LEFT JOIN services as b
    ON a.service_id = b.id
    JOIN service_categories as c
    ON b.category_id = c.id 
    JOIN users as d
    ON a.provider_id = d.id
    WHERE c.name = ${category} AND b.hidden != 1`

    return res.json(providers)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({
      error: `Грешка при получаване на служители от категория ${category}`,
    })
  }
}

export const getProvider = async (req, res) => {
  try {
    const { id } = req.params

    const provider = await sql`
    SELECT * FROM users
    WHERE id = ${id} AND role_id = 2`

    if (!provider.length)
      return res
        .status(404)
        .json({ error: "Служителя не е намерен или не е служител" })

    return res.json(provider)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при отваряне на профил" })
  }
}

export const getSingleProviderServices = async (req, res) => {
  try {
    const { id } = req.params

    const services = await sql`
    SELECT a.id, a.name, b.name as category, a.price FROM services as a
    JOIN service_categories as b
    ON a.category_id = b.id
    JOIN service_providers as c
    ON a.id = c.service_id
    WHERE c.provider_id = ${id} AND a.hidden != 1`

    return res.json(services)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на услугите на служителя" })
  }
}

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.profile_picture, a.middle_name, a.job_title, a.phone_number, a.bio, b.name as role FROM users as a
    JOIN user_roles as b
    ON a.role_id = b.id
    WHERE a.id = ${id}`

    return res.json(user[0])
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на потребителя" })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await sql`
    SELECT a.id, a.buyer_id, b.first_name as buyer_first_name, b.last_name as buyer_last_name, b.middle_name as buyer_middle_name, b.profile_picture as buyer_profile_picture,
    provider_id, d.first_name as provider_first_name, d.last_name as provider_last_name, d.middle_name as provider_middle_name, d.job_title as provider_job_title, d.profile_picture as provider_profile_picture,
    a.service_id, c.name as service_name, c.price as service_price, a.total_paid, a.quantity,e.name as service_category, a.date_of_order, a.finished, a.date_finished, c.hidden
    FROM orders as a
    JOIN users as b
    ON a.buyer_id = b.id
    JOIN services as c
    ON a.service_id = c.id
    JOIN users as d
    ON a.provider_id = d.id
    JOIN service_categories as e
    ON e.id = c.category_id`

    return res.json(orders)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички покупки" })
  }
}

export const getAllProviderOrders = async (req, res) => {
  try {
    const { id: providerId } = req.params

    const orders = await sql`
    SELECT * FROM orders
    WHERE provider_id = ${providerId} AND finished = 1`

    return res.json(orders)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички покупки за служител" })
  }
}

export const getAllCategoryOrders = async (req, res) => {
  try {
    const { category } = req.params

    const orders = await sql`
    SELECT a.service_id FROM orders as a
    JOIN services as b
    ON a.service_id = b.id
    JOIN service_categories as c
    ON b.category_id = c.id
    WHERE c.name = ${category}`

    return res.json(orders)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички покупки за услуга" })
  }
}

export const getAllUserOrders = async (req, res) => {
  try {
    const { id: userId } = req.params

    const orders = await sql`
    SELECT a.id, a.buyer_id, b.first_name as buyer_first_name, b.last_name as buyer_last_name, b.middle_name as buyer_middle_name, b.profile_picture as buyer_profile_picture,
    provider_id, d.first_name as provider_first_name, d.last_name as provider_last_name, d.middle_name as provider_middle_name, d.job_title as provider_job_title, d.profile_picture as provider_profile_picture,
    a.service_id, c.name as service_name, c.price as service_price, a.total_paid, a.quantity,e.name as service_category, a.date_of_order, a.finished, a.date_finished
    FROM orders as a
    JOIN users as b
    ON a.buyer_id = b.id
    JOIN services as c
    ON a.service_id = c.id
    JOIN users as d
    ON a.provider_id = d.id
    JOIN service_categories as e
    ON e.id = c.category_id
    WHERE buyer_id = ${userId}`

    return res.json(orders)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при получаване на всички покупки на потребител" })
  }
}

export const getAllHiddenCategories = async (req, res) => {
  try {
    const hiddenCategories = await sql`
    SELECT * FROM service_categories
    WHERE hidden = 1`

    return res.json(hiddenCategories)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({
      error: "Грешка при получаване на всички скрити категории на услуги",
    })
  }
}
