import {
  BarChart3,
  Calculator,
  CreditCard,
  FileText,
  Package,
  Plane,
  Settings,
  Ship,
  Users,
  type LucideIcon,
} from "lucide-react"

export interface MenuProp {
  icon: LucideIcon
  label: string
  href: string
}

export interface MenuProps {
  [role: string]: MenuProp[]
}

export const menuItems: MenuProps = {
  admin: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Plane, label: "Air shipment", href: "/air-shipment" },
    { icon: Ship, label: "Sea shipment", href: "/sea-shipment" },
    { icon: Package, label: "Batches", href: "/batch" },
    { icon: CreditCard, label: "Payments", href: "/payment" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Calculator, label: "Calculator", href: "/calculator" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  user: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Plane, label: "Air shipment", href: "/air-shipment" },
    { icon: Ship, label: "Sea shipment", href: "/sea-shipment" },
    { icon: Package, label: "Batches", href: "/batch" },
    { icon: CreditCard, label: "Payments", href: "/payment" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Calculator, label: "Calculator", href: "/calculator" },
  ],
}

export type UserRole = keyof typeof menuItems
