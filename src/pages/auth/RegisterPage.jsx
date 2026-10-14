import RegisterForm from '../../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">EduTest</h1>
        <p className="mt-1 text-sm text-gray-500">Ro'yxatdan o'tish</p>
      </div>

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md">
        <RegisterForm />
      </div>
    </div>
  )
}