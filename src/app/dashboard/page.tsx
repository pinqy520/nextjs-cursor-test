import { LogoutButton } from "@/components/logout-button"
import { UserInfo } from "@/components/user-info"

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">仪表盘</h1>
          <LogoutButton />
        </div>
        <div className="grid gap-6">
          <UserInfo />
          <div className="bg-white rounded-lg shadow p-6">
            <p>欢迎来到仪表盘！</p>
          </div>
        </div>
      </div>
    </div>
  )
}
