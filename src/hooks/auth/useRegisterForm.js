import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmailTaken, saveRegisteredUser } from '../../mocks/authMock'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useRegisterForm() {
  const navigate = useNavigate()

  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [roleValue, setRoleValue] = useState('') // 'teacher' | 'student'
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateRegisterForm = () => {
    if (nameValue.trim().length < 2) {
      return 'Ism kamida 2 belgi bo\'lishi kerak'
    }
    if (!EMAIL_REGEX.test(emailValue.trim())) {
      return "Email manzil noto'g'ri formatda"
    }
    if (passwordValue.length < 8) {
      return 'Parol kamida 8 belgi'
    }
    if (passwordValue !== confirmPasswordValue) {
      return 'Parollar mos kelmadi'
    }
    if (roleValue !== 'teacher' && roleValue !== 'student') {
      return "Rolni tanlang: O'qituvchi yoki O'quvchi"
    }
    return ''
  }

  const handleRegisterSubmit = (event) => {
    event?.preventDefault()
    setFormError('')

    const validationError = validateRegisterForm()
    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSubmitting(true)

    // Mock ro'yxatdan o'tish (backend ulanguncha)
    setTimeout(() => {
      if (isEmailTaken(emailValue)) {
        setFormError("Bu email allaqachon ro'yxatdan o'tgan")
        setIsSubmitting(false)
        return
      }

      saveRegisteredUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        role: roleValue, // faqat 'teacher' yoki 'student'
      })

      setIsSubmitting(false)
      navigate('/login')
    }, 800)
  }

  return {
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
    validateRegisterForm,
    handleRegisterSubmit,
  }
}