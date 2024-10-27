"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  total: number
  pageSize: number
  current: number
  onChange: (page: number, pageSize: number) => void
}

export function Pagination({
  total,
  pageSize,
  current,
  onChange
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6">
        <div className="text-sm text-muted-foreground">
          共 {total} 条记录
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">每页显示</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onChange(1, Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">条</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onChange(current - 1, pageSize)}
          disabled={current <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm">
          第 {current} 页，共 {totalPages} 页
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onChange(current + 1, pageSize)}
          disabled={current >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
