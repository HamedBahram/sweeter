import { addTweet, getTweet, getNewsFeed } from '@utils/mongodb'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const session = await getSession({ req })
    const { userId } = session.user

    try {
      const { tweets = [], error } = await getNewsFeed(userId)
      if (error) throw new Error(error)
      return res.status(200).json({ tweets })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    const { userId, text } = req.body

    // validate (max 280 characters)

    const newTweet = {
      userId: ObjectId(userId),
      text,
      likes: [],
      comments: [],
      retweets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const { insertedId, error: insertError } = await addTweet(newTweet)
      if (insertError) throw new Error(insertError)

      const { tweet, error: fetchError } = await getTweet(insertedId)
      if (fetchError) throw new Error(fetchError)

      return res.status(201).json({ tweet })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default handler
