"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: number
  email: string
  name: string | null
}

export function UserInfo() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("/api/auth/me")
        if (!response.ok) {
          throw new Error("获取用户信息失败")
        }
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误")
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>加载中...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">错误</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">ID：</span>
            {user?.id}
          </p>
          <p>
            <span className="font-medium">邮箱：</span>
            {user?.email}
          </p>
          <p>
            <span className="font-medium">姓名：</span>
            {user?.name || "未设置"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
