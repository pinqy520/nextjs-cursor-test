import { NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/auth'
import { loginSchema } from '@/lib/validations/auth'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = loginSchema.parse(body)
    
    const user = await AuthService.login(validatedData)
    
    // 设置认证 cookie
    const cookieStore = cookies()
    cookieStore.set('auth-token', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '登录失败' },
      { status: 400 }
    )
  }
}
