import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'

import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { findUserByEmail } from '@utils/mongodb'

export default NextAuth({
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
      if (isNewUser) {
        return token
      }
      if (user) {
        token.username = user.username
        return token
      }
      const { user: userFromDB } = await findUserByEmail(token.email)
      token.name = userFromDB.name
      token.picture = userFromDB.image
      token.username = userFromDB.username
      token.userId = userFromDB._id
      return token
    },
    async session({ session, token }) {
      session.user.name = token.name
      session.user.username = token.username
      session.user.image = token.picture
      session.user.userId = token.userId
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
})
