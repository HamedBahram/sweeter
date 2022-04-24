import { unFollowUser } from '@utils/mongodb'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    const { userId } = req.query
    const session = await getSession({ req })
    const { userId: myId } = session.user

    if (userId === myId) {
      return res.status(403).json({ error: 'You are not following yourself!' })
    }

    try {
      const { error } = await unFollowUser(userId, myId)
      if (error) throw new Error(error)

      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.setHeader('Allow', ['PATCH'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
