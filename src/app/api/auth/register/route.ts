import { NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/auth'
import { registerSchema } from '@/lib/validations/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = registerSchema.parse(body)
    
    const user = await AuthService.register(validatedData)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '注册失败' },
      { status: 400 }
    )
  }
}
