import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function DashboardRedirect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  if (session.user.role === "admin") {
    redirect("/admin")
  } else {
    redirect("/user")
  }
}
