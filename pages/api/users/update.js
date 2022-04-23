import { updateUser } from '@utils/mongodb'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  const { email, name, username } = req.body

  // validate req.body

  const update = {}
  if (name) update.name = name
  if (username) update.username = username

  try {
    const { error } = await updateUser(email, update)
    if (error) throw new Error(error)
    await getSession()
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export default handler
