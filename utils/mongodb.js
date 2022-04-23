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
