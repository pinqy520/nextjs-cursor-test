import { prisma } from '../prisma'
import { LoginInput, RegisterInput } from '../validations/auth'
import bcrypt from 'bcryptjs'

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('该邮箱已被注册')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    })

    return { id: user.id, email: user.email, name: user.name }
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('邮箱或密码错误')
    }

    const isValid = await bcrypt.compare(data.password, user.password)

    if (!isValid) {
      throw new Error('邮箱或密码错误')
    }

    return { id: user.id, email: user.email, name: user.name }
  }
}
