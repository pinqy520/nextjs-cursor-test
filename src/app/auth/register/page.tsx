import { RegisterForm } from "../components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">注册</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
