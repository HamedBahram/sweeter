import { ObjectId } from 'mongodb'
import clientPromise from '../lib/mongodb'

let client
let db

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
  } catch (error) {
    throw new Error('Failed to stablish connection to database')
  }
}

/////////////
/// USERS ///
/////////////

export async function getUsers() {
  try {
    await init()
    const users = await db.collection('users')
    const result = await users
      .find({})
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray()

    return { users: result }
  } catch (error) {
    return { error: 'Failed to fetch users!' }
  }
}

export async function findUserById(userId) {
  try {
    await init()
    const users = await db.collection('users')
    const user = await users.findOne({ _id: ObjectId(userId) })

    if (!user) throw new Error()

    return { user: { ...user, _id: user._id.toString() } }
  } catch (error) {
    return { error: 'Failed to find the user.' }
  }
}

export async function findUserByEmail(email) {
  try {
    await init()
    const users = await db.collection('users')
    const user = await users.findOne({ email })

    if (!user) throw new Error()

    return { user: { ...user, _id: user._id.toString() } }
  } catch (error) {
    return { error: 'Failed to find the user.' }
  }
}

export async function findUserByUsername(username) {
  try {
    await init()
    const users = await db.collection('users')
    const user = await users.findOne({ username })

    if (!user) return { user: null }

    return { user: { ...user, _id: user._id.toString() } }
  } catch (error) {
    throw error
  }
}

export async function updateUser(email, update) {
  try {
    await init()
    const users = await db.collection('users')
    await users.updateOne({ email }, { $set: update })

    return { success: true }
  } catch (error) {
    return { error: 'Failed to reset the password.' }
  }
}

export async function followUser(userId, myId) {
  try {
    await init()
    const users = await db.collection('users')
    await users.updateOne({ _id: ObjectId(userId) }, { $addToSet: { followers: ObjectId(myId) } })
    await users.updateOne({ _id: ObjectId(myId) }, { $addToSet: { following: ObjectId(userId) } })
    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function unFollowUser(userId, myId) {
  try {
    await init()
    const users = await db.collection('users')
    await users.updateOne({ _id: ObjectId(userId) }, { $pull: { followers: ObjectId(myId) } })
    await users.updateOne({ _id: ObjectId(myId) }, { $pull: { following: ObjectId(userId) } })
    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function getUserFollowing(userId) {
  try {
    await init()
    const users = await db.collection('users')
    const result = await users
      .find({ followers: ObjectId(userId) })
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray()
    return { users: result }
  } catch (error) {
    return { error }
  }
}

//////////////
/// Tweets ///
//////////////

export async function addTweet(tweet) {
  try {
    await init()
    const tweets = await db.collection('tweets')
    return await tweets.insertOne(tweet)
  } catch (error) {
    return { error }
  }
}

export async function getTweet(tweetId) {
  try {
    await init()
    const tweets = await db.collection('tweets')
    const tweet = await tweets.findOne({ _id: ObjectId(tweetId) })

    if (!tweet) throw new Error('Sweet not found!')

    return { tweet: { ...tweet, _id: tweet._id.toString() } }
  } catch (error) {
    return { error }
  }
}

export async function getTimeline(userId) {
  try {
    await init()
    const tweets = await db.collection('tweets')

    const pipeline = [
      {
        $match: {
          userId: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            id: '$userId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$id'],
                },
              },
            },
            {
              $project: {
                name: 1,
                username: 1,
                image: 1,
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]

    const result = await tweets.aggregate(pipeline).toArray()
    return { tweets: result }
  } catch (error) {
    return { error }
  }
}

export async function getNewsFeed(userId) {
  try {
    await init()
    const tweets = await db.collection('tweets')
    const { user } = await findUserById(userId)
    const users = user.following ? [...user.following, ObjectId(userId)] : [ObjectId(userId)]

    const pipeline = [
      {
        $match: {
          userId: { $in: users },
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            id: '$userId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$id'],
                },
              },
            },
            {
              $project: {
                name: 1,
                username: 1,
                image: 1,
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]

    const result = await tweets.aggregate(pipeline).toArray()
    return { tweets: result }
  } catch (error) {
    return { error }
  }
}
