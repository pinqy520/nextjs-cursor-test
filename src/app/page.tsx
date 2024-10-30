import { StatsCards } from "@/components/dashboard/StatsCards"
import { NavBar } from "@/components/navigation/NavBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button className="ml-auto rounded-md bg-black px-4 py-2 text-sm font-medium text-white">
                Download
              </button>
            </div>
            
            <div className="flex gap-4">
              <button className="rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm">
                Overview
              </button>
              <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-500">
                Analytics
              </button>
              <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-500">
                Reports
              </button>
              <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-500">
                Notifications
              </button>
            </div>
          </div>
        </div>
        
        <StatsCards />
      </main>
    </div>
  )
}
