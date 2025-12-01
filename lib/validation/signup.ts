import { z } from "zod"

export const signupSchema = z
  .object({
    name: z.string().min(5, "Name is too short").max(50, "Name is too long"),
    email: z.email("Invalid email").transform((email) => email.toLowerCase()),
    role: z.enum(["admin", "user"]),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type SignupData = z.infer<typeof signupSchema>
