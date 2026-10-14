import { useState } from 'react'
import { Link } from 'react-router-dom'

// TODO: Azizbek komponentlari (AppInput, AppButton, AppErrorMessage) tayyor bo'lgach almashtiriladi

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordForm() {
  const [emailValue, setEmailValue] = useState('')
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (!EMAIL_REGEX.test(emailValue.trim())) {
      setFormError("Email manzil noto'g'ri formatda")
      return
    }

    setIsSubmitting(true)

    // Mock yuborish (backend ulanguncha)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
    }, 800)
  }

  if (isSent) {
    return (
      <div className="space-y-4 text-center">
        <p role="status" className="rounded-lg bg-green-50 px-3 py-3 text-sm font-medium text-green-700">
          Email yuborildi
        </p>
        <p className="text-sm text-gray-600">
          Parolni tiklash uchun <span className="font-medium">{emailValue.trim()}</span> manzilini tekshiring.
        </p>
        <Link to="/login" className="inline-block text-sm text-indigo-600 hover:underline">
          Kirish sahifasiga qaytish
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="forgot-email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          placeholder="email@example.com"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
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
        {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>

      <p className="text-center text-sm">
        <Link to="/login" className="text-indigo-600 hover:underline">
          Kirish sahifasiga qaytish
        </Link>
      </p>
    </form>
  )
}