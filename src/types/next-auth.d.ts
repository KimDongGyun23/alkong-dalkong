/* eslint-disable unused-imports/no-unused-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
      id: string
      familyCode: string
      name: string
      accessToken: string
    } & DefaultSession['user']
  }

  interface User {
    userId: string
    id: string
    familyCode: string
    name: string
    accessToken: string
  }
}
