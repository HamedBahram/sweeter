import { findUserByUsername } from '@utils/mongodb'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { username } = req.query

    try {
      const { user } = await findUserByUsername(username)
      if (user) return res.status(400).json({ error: 'Username already exists.' })
      return res.status(200).json({ message: 'Username is valid' })
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }

  res.setHeader('Allow', ['GET'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
