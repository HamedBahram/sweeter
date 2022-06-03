import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'

import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { findUserByEmail } from '@utils/mongodb'

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.MAIL_SERVER_HOST,
          port: process.env.MAIL_SERVER_PORT,
          auth: {
            user: process.env.MAIL_SERVER_USER,
            pass: process.env.MAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    callbacks: {
      async jwt({ user, isNewUser, token }) {
        // the first time the user creates an account
        if (isNewUser) {
          return token
        }

        // add the username to the token when the user signs in
        // that is the only time the user object is passed to jwt()
        if (user) {
          token.username = user.username
          token.userId = user.id
          return token
        }

        // when the reloadSession helper is called like when the user updates her profile
        // fetch the user from the database to reflect the new changes in the token
        const { update } = req.query
        if (update) {
          const { user: userFromDB } = await findUserByEmail(token.email)
          token.name = userFromDB.name
          token.username = userFromDB.username
          token.picture = userFromDB.image
        }

        return token
      },
      // make the added properties available in the browser
      async session({ session, token }) {
        session.user.username = token.username
        session.user.userId = token.userId

        const { update } = req.query
        if (update) {
          session.user.name = token.name
          session.user.image = token.picture
        }

        return session
      },
    },
    pages: {
      signIn: '/auth/signin',
      verifyRequest: '/auth/verify',
      error: '/auth/error',
    },
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: 'jwt',
    },
  })
}
