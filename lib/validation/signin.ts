import { z } from "zod"

export const signinSchema = z.object({
  email: z.email("Invalid email").transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password is too short"),
})

export type SigninData = z.infer<typeof signinSchema>
