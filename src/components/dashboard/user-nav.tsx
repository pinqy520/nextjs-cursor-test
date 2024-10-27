"use client"

import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  name: string | null
}

export function UserNav() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("/api/auth/me")
        if (!response.ok) throw new Error("Failed to fetch user")
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUserInfo()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("登出失败")
      }

      router.push("/auth/login")
    } catch (error) {
      console.error("登出错误:", error)
    }
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || "未设置姓名"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
