import { LoginForm } from "../components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">登录</h1>
        <LoginForm />
      </div>
    </div>
  )
}
