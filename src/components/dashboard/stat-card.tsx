import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive?: boolean
  }
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="text-xs text-muted-foreground">
            {trend && (
              <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                {trend.value}
              </span>
            )}
            {description && <span className="ml-1">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
