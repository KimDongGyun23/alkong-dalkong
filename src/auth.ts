import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login, logOut } from '@/store/queries/apis'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await login({
          id: credentials.username as string,
          password: credentials.password as string,
        })

        if (authResponse.status !== 200) {
          console.log('authResponse is not okay')
          return null
        }

        const accessToken = authResponse.headers['authorization']
        const user = await authResponse.data

        return { ...user, accessToken }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return {
          ...token,
          userId: user.userId,
          name: user.name,
          familyCode: user.familyCode,
          accessToken: user.accessToken,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as string
        session.user.name = token.name as string
        session.user.familyCode = token.familyCode as string
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
  events: {
    signOut(data) {
      console.log(
        'auth.ts events signout',
        'session' in data && data.session,
        'token' in data && data.token,
      )
      logOut()
      if ('session' in data) data.session = null
      if ('token' in data) data.token = null
    },
  },
})
