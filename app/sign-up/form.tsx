"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, LockKeyhole, Mail, ShieldUser, User } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type SignupData, signupSchema } from "@/lib/validation/signup"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (formData: SignupData) => {
    setIsLoading(true)

    try {
      console.log("Attempting sign up...") // Debug

      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })

      console.log("Sign up response:", { data, error }) // Debug

      if (error) {
        toast.error(error.message || "Sign up failed")
        setIsLoading(false)
        return
      }

      if (data) {
        toast.success("Account created successfully! Please sign in.")
        router.push("/sign-in")
      }
    } catch (error) {
      console.error("Sign up error:", error) // Debug
      toast.error("Unable to connect to authentication server. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <User className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="text"
                  placeholder="Full name"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <Mail className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="email"
                  placeholder="Email address"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.email && <FieldError>{form.formState.errors.email.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <ShieldUser className="h-4 w-4 text-purple-600" />
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <SelectTrigger className="w-full border-purple-600 focus:ring-purple-600 pl-10">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </FieldGroup>
        {form.formState.errors.role && <FieldError>{form.formState.errors.role.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <Lock className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.password && <FieldError>{form.formState.errors.password.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <LockKeyhole className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.confirmPassword && (
          <FieldError>{form.formState.errors.confirmPassword.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  )
}
