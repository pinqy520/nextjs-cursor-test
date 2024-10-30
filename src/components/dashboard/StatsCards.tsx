export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Total Revenue</span>
          <span className="text-xl">$</span>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">$45,231.89</span>
          <p className="text-sm text-gray-500">+20.1% from last month</p>
        </div>
      </div>
      
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Subscriptions</span>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">+2350</span>
          <p className="text-sm text-gray-500">+180.1% from last month</p>
        </div>
      </div>
      
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Sales</span>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">+12,234</span>
          <p className="text-sm text-gray-500">+19% from last month</p>
        </div>
      </div>
      
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Active Now</span>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">+573</span>
          <p className="text-sm text-gray-500">+201 since last hour</p>
        </div>
      </div>
    </div>
  )
} 