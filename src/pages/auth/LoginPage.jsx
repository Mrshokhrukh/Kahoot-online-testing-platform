import { Link, useLocation } from 'react-router-dom'
import AppCard from '../../components/shared/AppCard'
import LoginForm from '../../components/auth/LoginForm'

function LoginPage() {
  const location = useLocation()
  const justRegistered = location.state?.registered

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <Link to="/login" className="text-2xl font-bold tracking-tight text-blue-600">EduTest</Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Hisobingizga kiring</h1>
          <p className="mt-2 text-sm text-gray-600">Dars va testlaringiz sizni kutmoqda</p>
        </header>
        <AppCard>
          {justRegistered && <p role="status" className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">Hisob yaratildi. Endi tizimga kiring.</p>}
          <LoginForm />
        </AppCard>
        <p className="mt-4 text-center text-xs text-gray-500">O'qituvchi va o'quvchi uchun alohida sinov hisoblari mavjud.</p>
      </div>
    </main>
  )
}

export default LoginPage
