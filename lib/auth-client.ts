import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

const nextUrl = process.env.NEXT_PUBLIC_URL as string

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: nextUrl,
  plugins: [adminClient()],
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()
