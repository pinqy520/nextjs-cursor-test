"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users2, ShoppingCart, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "概览", href: "/dashboard", icon: LayoutDashboard },
  { name: "客户", href: "/dashboard/customers", icon: Users2 },
  { name: "产品", href: "/dashboard/products", icon: ShoppingCart },
  { name: "设置", href: "/dashboard/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 ml-8">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Button variant="ghost" className="w-full justify-start">
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
