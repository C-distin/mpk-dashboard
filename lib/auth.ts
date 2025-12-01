import argon2 from "argon2"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
// import { nextCookies } from "better-auth/next-js"
import { admin, haveIBeenPwned } from "better-auth/plugins"
import { db } from "./db"
import { account, session, user, verification } from "./db/schema"

export const auth = betterAuth({
  experimental: {
    joins: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
    password: {
      hash: async (password: string) => {
        return argon2.hash(password, {
          type: argon2.argon2i,
          hashLength: 50,
        })
      },
      verify: async ({ password, hash }: { password: string; hash: string }) => {
        return await argon2.verify(hash, password)
      },
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: true,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    cookiePrefix: "mpk-dashboard",
    useSecureCookies: true,
  },
  plugins: [
    admin({
      defaultBanReason: "Spamming",
    }),
    // nextCookies(),
    haveIBeenPwned(),
  ],
})
