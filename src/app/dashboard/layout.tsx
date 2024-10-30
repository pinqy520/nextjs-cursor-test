import { NavBar } from "@/components/navigation/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
} 