"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

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

  return (
    <Button variant="outline" onClick={handleLogout}>
      登出
    </Button>
  )
}
