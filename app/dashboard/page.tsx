import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function DashboardRedirect() {
  const session = await auth.api.getSession()

  if (!session) {
    redirect("/sign-in")
  }

  if (session.user.role === "admin") {
    redirect("/admin")
  } else {
    redirect("/user")
  }
}
