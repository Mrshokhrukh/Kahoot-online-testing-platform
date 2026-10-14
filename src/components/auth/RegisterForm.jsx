import { Link } from 'react-router-dom'
import { useRegisterForm } from '../../hooks/auth/useRegisterForm'
import RoleSelector from './RoleSelector'

// TODO: Azizbek komponentlari (AppInput, AppButton, AppErrorMessage) tayyor bo'lgach almashtiriladi

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100'

export default function RegisterForm() {
  const {
    nameValue,
    setNameValue,
    emailValue,
    setEmailValue,
    passwordValue,
    setPasswordValue,
    confirmPasswordValue,
    setConfirmPasswordValue,
    roleValue,
    setRoleValue,
    formError,
    isSubmitting,
    handleRegisterSubmit,
  } = useRegisterForm()

  return (
    <form onSubmit={handleRegisterSubmit} noValidate className="space-y-4">
      <RoleSelector value={roleValue} onChange={setRoleValue} disabled={isSubmitting} />

      <div>
        <label htmlFor="register-name" className="mb-1 block text-sm font-medium text-gray-700">
          Ism
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Ismingiz"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="email@example.com"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-gray-700">
          Parol
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="Kamida 8 belgi"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="register-confirm" className="mb-1 block text-sm font-medium text-gray-700">
          Parolni tasdiqlang
        </label>
        <input
          id="register-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Parolni qayta kiriting"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
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
        {isSubmitting ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Akkauntingiz bormi?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Kirish
        </Link>
      </p>
    </form>
  )
}