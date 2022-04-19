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
