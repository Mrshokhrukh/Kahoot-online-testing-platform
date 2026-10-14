import { useState } from 'react'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppInput from '../../../components/shared/AppInput'
import AppLayout from '../../../components/shared/AppLayout'
import AppSidebar from '../../../components/shared/AppSidebar'
import { showToast } from '../../../components/shared/AppToast'
import { useAuthStore } from '../../../store/authStore'
import { ROUTES } from '../../../constants/routes'

const MOCK_SAVE_DELAY_MS = 700
const FALLBACK_USER = { name: 'Sardor Usmonov', email: 'sardor@edutest.uz' }
const MIN_PASSWORD_LENGTH = 6

function validatePasswordForm(currentPassword, newPassword) {
  const errorMap = {
    currentPassword: '',
    newPassword: '',
  }
  if (!currentPassword) {
    errorMap.currentPassword = 'Hozirgi parolni kiriting'
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    errorMap.newPassword = `Parol kamida ${MIN_PASSWORD_LENGTH} belgidan iborat bo'lishi kerak`
  }
  return errorMap
}

function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [formError, setFormError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function isFormInvalid() {
    return Boolean(
      validatePasswordForm(currentPassword, newPassword).currentPassword ||
        validatePasswordForm(currentPassword, newPassword).newPassword,
    )
  }

  function handlePasswordSave() {
    const errorMap = validatePasswordForm(currentPassword, newPassword)
    if (errorMap.currentPassword || errorMap.newPassword) {
      setFormError(errorMap)
      return
    }
    setFormError(null)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentPassword('')
      setNewPassword('')
      showToast('Parol muvaffaqiyatli o\'zgartirildi', 'success')
    }, MOCK_SAVE_DELAY_MS)
  }

  return (
    <AppCard>
      <h2 className="text-xl font-semibold text-gray-900">
        Parolni o'zgartirish
      </h2>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={(event) => {
          event.preventDefault()
          handlePasswordSave()
        }}
      >
        <AppInput
          label="Hozirgi parol"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          errorMessage={formError?.currentPassword}
        />
        <AppInput
          label="Yangi parol"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          errorMessage={formError?.newPassword}
        />
        <AppButton
          label="Parolni saqlash"
          type="submit"
          isLoading={isLoading}
          isDisabled={isFormInvalid()}
        />
      </form>
    </AppCard>
  )
}

function TeacherProfileContent() {
  const currentUser = useAuthStore((state) => state.currentUser)
  const profileUser = currentUser ?? FALLBACK_USER

  return (
    <div className="flex flex-col gap-8">
      <AppCard>
        <h2 className="text-xl font-semibold text-gray-900">Profil ma'lumoti</h2>
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-sm text-gray-600">
            Ism: <span className="font-medium text-gray-900">{profileUser.name}</span>
          </p>
          <p className="text-sm text-gray-600">
            Email: <span className="font-medium text-gray-900">{profileUser.email}</span>
          </p>
        </div>
      </AppCard>
      <PasswordChangeForm />
    </div>
  )
}

function TeacherProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar
        navItems={[
          { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
          { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
          { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
        ]}
        activeRoute={ROUTES.TEACHER_PROFILE}
      />
      <AppLayout>
        <div className="flex flex-col gap-6">
          <header>
            <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
            <p className="text-base text-gray-600">
              Shaxsiy ma'lumotlaringiz va parolni boshqarish
            </p>
          </header>
          <TeacherProfileContent />
        </div>
      </AppLayout>
    </div>
  )
}

export default TeacherProfilePage
