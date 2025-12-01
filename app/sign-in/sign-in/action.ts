"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function signIn(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: await headers(),
    })
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}
