import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    redirect("/sign-in")
  }

  return (
    <section className="p-12 text-center">
      <h1 className="text-4xl font-bold">User Page</h1>
      <p className="text-lg">Welcome, {session.user.name}</p>
    </section>
  )
}
