export const checkAccess = (req, res, next) => {
  const clientDomain = req.get("origin")

  const allowedDomains = ["http://localhost:5173"]

  if (
    allowedDomains.includes(clientDomain) ||
    req.get("User-Agent").startsWith("Stripe/") ||
    req.get("User-Agent").startsWith("axios/")
  ) {
    next()
  } else {
    return res.status(401).send("Unauthorized!")
  }
}
