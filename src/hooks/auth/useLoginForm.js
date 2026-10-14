import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findMockUser } from '../../mocks/authMock'
import { useAuthStore } from '../../store/authStore'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLoginForm() {
  const navigate = useNavigate()
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const setAuthToken = useAuthStore((state) => state.setAuthToken)

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [roleValue, setRoleValue] = useState('')
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateLoginForm = () => {
    if (roleValue !== 'teacher' && roleValue !== 'student') {
      return "O'qituvchi yoki o'quvchi sifatida kirishni tanlang"
    }
    if (!EMAIL_REGEX.test(emailValue.trim())) {
      return "Email manzil noto'g'ri formatda"
    }
    if (passwordValue.length < 8) {
      return 'Parol kamida 8 belgi'
    }
    return ''
  }

  const handleLoginSubmit = (event) => {
    event?.preventDefault()
    setFormError('')

    const validationError = validateLoginForm()
    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSubmitting(true)

    // Mock login (backend ulanguncha)
    setTimeout(() => {
      const user = findMockUser(emailValue, passwordValue)

      if (!user) {
        setFormError("Email yoki parol noto'g'ri")
        setIsSubmitting(false)
        return
      }
      if (user.role !== roleValue) {
        setFormError("Tanlangan rol email manziliga mos kelmaydi")
        setIsSubmitting(false)
        return
      }

      const token = 'mock-token'
      setAuthToken(token)
      setCurrentUser(user)

      setIsSubmitting(false)
      navigate(roleValue === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
    }, 800)
  }

  return {
    emailValue,
    setEmailValue,
    passwordValue,
    setPasswordValue,
    roleValue,
    setRoleValue,
    formError,
    isSubmitting,
    validateLoginForm,
    handleLoginSubmit,
  }
}
