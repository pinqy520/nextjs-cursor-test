import { UserNav } from "@/components/dashboard/user-nav"
import { DashboardNav } from "@/components/dashboard/nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* 顶部导航栏 */}
      <header className="border-b">
        <div className="flex h-16 items-center px-8">
          <h1 className="text-xl font-bold">仪表盘</h1>
          
          {/* 主导航 */}
          <DashboardNav />

          {/* 右侧用户导航 */}
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
