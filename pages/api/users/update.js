import { updateUser } from '@utils/mongodb'
import { userSchema } from '@utils/schema'

const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    const { name, username, image, email } = req.body

    const update = {}
    if (name) update.name = name
    if (username) update.username = username
    if (image) update.image = image

    try {
      await userSchema.validate({ email, ...update })
    } catch (error) {
      return res.status(422).json({ error: { path: error.path, message: error.errors[0] } })
    }

    try {
      const { error } = await updateUser(email, update)
      if (error) throw new Error(error)
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  res.setHeader('Allow', ['PATCH'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
