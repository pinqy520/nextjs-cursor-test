import { LogoutButton } from "@/components/logout-button"
import { StatCard } from "@/components/dashboard/stat-card"
import { DollarSign, Users, CreditCard, Activity, LayoutDashboard, Users2, ShoppingCart, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "概览", href: "/dashboard", icon: LayoutDashboard },
  { name: "客户", href: "/dashboard/customers", icon: Users2 },
  { name: "产品", href: "/dashboard/products", icon: ShoppingCart },
  { name: "设置", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="总收入"
          value="$45,231.89"
          description="from last month"
          trend={{ value: "+20.1%", isPositive: true }}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="订阅数"
          value="2350"
          description="from last month"
          trend={{ value: "+180.1%", isPositive: true }}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="销售额"
          value="12,234"
          description="from last month"
          trend={{ value: "+19%", isPositive: true }}
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="活跃用户"
          value="573"
          description="since last hour"
          trend={{ value: "+201", isPositive: true }}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* 图表区域 */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <h2 className="text-lg font-semibold mb-4">收入概览</h2>
          <div className="rounded-xl border bg-card h-[350px] p-6">
            图表区域
          </div>
        </div>
        
        <div className="col-span-3">
          <h2 className="text-lg font-semibold mb-4">最近销售</h2>
          <div className="rounded-xl border bg-card">
            <div className="p-6">
              <div className="text-sm text-muted-foreground">
                本月完成 265 笔销售
              </div>
              <div className="mt-4 space-y-4">
                {[
                  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                  { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" }
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="text-sm font-medium text-green-500">{sale.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
