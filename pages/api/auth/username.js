const handler = (req, res) => {
  const { value } = req.query
  console.log(value)

  const random = Math.random()

  if (random > 0.5) {
    return res.status(200).json({ message: 'username is valid' })
  }

  return res.status(400).json({ error: 'Username already exists' })
}

export default handler
