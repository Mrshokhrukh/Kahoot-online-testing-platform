import { Link } from 'react-router-dom'
import AppCard from '../../components/shared/AppCard'
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'

function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <Link to="/login" className="text-2xl font-bold tracking-tight text-blue-600">EduTest</Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Parolni tiklash</h1>
          <p className="mt-2 text-sm text-gray-600">Email manzilingizni kiriting, tiklash xabarini yuboramiz</p>
        </header>
        <AppCard><ForgotPasswordForm /></AppCard>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
