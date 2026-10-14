import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/auth/useLoginForm'

// TODO: Azizbek komponentlari (AppInput, AppButton, AppErrorMessage) tayyor bo'lgach almashtiriladi

export default function LoginForm() {
  const {
    emailValue,
    setEmailValue,
    passwordValue,
    setPasswordValue,
    formError,
    isSubmitting,
    handleLoginSubmit,
  } = useLoginForm()

  return (
    <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="teacher@test.com"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-gray-700">
          Parol
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Kamida 8 belgi"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100"
        />
      </div>

      {formError && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {isSubmitting ? 'Kirilmoqda...' : 'Kirish'}
      </button>

      <div className="flex items-center justify-between text-sm">
        <Link to="/register" className="text-indigo-600 hover:underline">
          Ro'yxatdan o'tish
        </Link>
        <Link to="/forgot-password" className="text-indigo-600 hover:underline">
          Parolni unutdim
        </Link>
      </div>
    </form>
  )
}