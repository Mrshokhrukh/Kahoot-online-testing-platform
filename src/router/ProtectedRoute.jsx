import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuthStore } from '../store/authStore'
import AppSpinner from '../components/shared/AppSpinner'

function ProtectedRoute({ allowedRole = null }) {
  const currentUser = useAuthStore((state) => state.currentUser)
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading)

  if (isAuthLoading) {
    return <div className="flex min-h-screen items-center justify-center"><AppSpinner size="lg" /></div>
  }
  if (!currentUser || (allowedRole && currentUser.role !== allowedRole)) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
