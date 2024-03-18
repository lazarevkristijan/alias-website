export const checkAccess = (req, res, next) => {
  const clientDomain = req.get("origin")

  const allowedDomains = ["https://alias-test.vercel.app"]

  if (allowedDomains.includes(clientDomain)) {
    next()
  } else {
    return res.status(401).send("Unauthorized!")
  }
}
