import {
  jobTitleRegex,
  middleNameRegex,
  nameRegex,
  phoneRegex,
} from "../Regex.js"
import sql from "../db.js"

export const patchChangeCreds = async (req, res) => {
  try {
    const userId = req.userId
    let updatedUser = {}

    const user = await sql`
    SELECT *
    FROM users
    WHERE id = ${userId}`

    const { firstName, lastName, middleName, jobTitle, phoneNumber } = req.body

    if (
      !nameRegex.test(firstName) ||
      !nameRegex.test(lastName) ||
      !middleNameRegex.test(middleName) ||
      !jobTitleRegex.test(jobTitle) ||
      !phoneRegex.test(phoneNumber)
    ) {
      return res.status(400).json({
        error: "Данните са с невалиден формат",
      })
    }

    if (user[0].first_name !== firstName) {
      await sql`
        UPDATE users
        SET first_name = ${firstName}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, first_name: firstName }
    }

    if (user[0].last_name !== lastName) {
      await sql`
        UPDATE users
        SET last_name = ${lastName}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, last_name: lastName }
    }

    if (user[0].middle_name !== middleName) {
      await sql`
        UPDATE users
        SET middle_name = ${middleName}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, middle_name: middleName }
    }

    if (user[0].job_title !== jobTitle) {
      await sql`
        UPDATE users
        SET job_title = ${jobTitle}
        WHERE id = ${userId}`

      updatedUser = { ...updatedUser, job_title: jobTitle }
    }

    if (user[0].phone_number !== phoneNumber) {
      await sql`
      UPDATE users
      SET phone_number = ${phoneNumber}
      WHERE id = ${userId}`

      updatedUser = { ...updatedUser, phone_number: phoneNumber }
    }

    return res.json(updatedUser)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when changing credentials" })
  }
}

export const patchChangeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId

    const pfpData = { url: req.file.path, fileName: req.file.filename }
    const stringedPfp = JSON.stringify(pfpData)

    await sql`
    UPDATE users
    SET profile_picture = ${stringedPfp}
    WHERE id = ${userId}`

    return res.json({
      success: "Успешна промяна на профилна снимка",
      profilePicture: stringedPfp,
    })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при промяна на профилна снимка" })
  }
}

export const patchAdminChangeProfilePicture = async (req, res) => {
  try {
    const { id } = req.params
    const pfpData = { url: req.file.path, fileName: req.file.filename }
    const stringedPfp = JSON.stringify(pfpData)

    await sql`
    UPDATE users
    SET profile_picture = ${stringedPfp}
    WHERE id = ${id}`

    return res.json({
      success: "Успешна промяна на профилна снимка от админ",
      profilePicture: stringedPfp,
    })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при промяна на профилна снимка от админ" })
  }
}

export const patchEditService = async (req, res) => {
  try {
    const {
      id: serviceId,
      name,
      price,
      category,
      providers: newProviders,
    } = req.body

    const oldProviders = await sql`
    SELECT * FROM service_providers
    WHERE service_id = ${serviceId}`

    const oldProvidersIds = oldProviders.map((provider) => provider.provider_id)
    const newProviderIds = newProviders.map((provider) => provider.provider_id)

    oldProvidersIds.map(async (id) => {
      if (newProviderIds.includes(id)) return
      await sql`
      DELETE FROM service_providers
      WHERE service_id = ${serviceId} AND provider_id = ${id}`
    })

    newProviderIds.map(async (id) => {
      if (oldProvidersIds.includes(id)) return
      await sql`
      INSERT INTO service_providers (service_id, provider_id)
      VALUES (${serviceId}, ${id})`
    })

    await sql`
    UPDATE services
    SET name = ${name}, price = ${Number(price)}, category_id = ${
      category === "коли"
        ? 1
        : category === "вкъщи"
        ? 2
        : category === "персонални"
        ? 3
        : null
    }
    WHERE id = ${serviceId}`

    return res.json({ success: "Успешно редактирана услуга" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при редактиране услуга" })
  }
}

export const patchAdminChangeCreds = async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      middle_name,
      job_title,
      phone_number,
      role,
    } = req.body

    if (
      !nameRegex.test(first_name) ||
      !nameRegex.test(last_name) ||
      !middleNameRegex.test(middle_name) ||
      !jobTitleRegex.test(job_title) ||
      !phoneRegex.test(phone_number)
    ) {
      return res.status(400).json({
        error: "Данните са с невалиден формат",
      })
    }

    await sql`
    UPDATE users
    SET first_name = ${first_name}, last_name = ${last_name}, middle_name = ${middle_name},job_title = ${job_title}, role_id = ${
      role === "админ" ? 3 : role === "служител" ? 2 : 1
    }, phone_number = ${phone_number}
    WHERE id = ${id}`

    res.json({ success: "Успешно променени лични данни от админ" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при промяна на лични данни от админ" })
  }
}

export const patchChangeOrderStatus = async (req, res) => {
  try {
    const { id: orderId } = req.params

    await sql`
    UPDATE orders
    SET finished = 1, date_finished = NOW() AT TIME ZONE 'Europe/Sofia'
    WHERE id = ${orderId}`

    return res.json({ success: "Успешна промяна на статус на покупка" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Грешка при промяана на статус на покупка" })
  }
}

export const patchUnhideCategory = async (req, res) => {
  try {
    const { id } = req.params

    await sql`
    UPDATE service_categories
    SET hidden = 0
    WHERE id = ${id}`

    return res.json({ success: "Успешно разкрита категория" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при разкриване на категория" })
  }
}

export const patchUnhideService = async (req, res) => {
  try {
    const { id } = req.params

    await sql`
    UPDATE services
    SET hidden = 0
    WHERE id = ${id}`

    return res.json({ success: "Успешно разкрита услуга" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Грешка при разкриване на услуга" })
  }
}
