import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuthStore } from '../../store/authStore'

function ProtectedRoute({ role }) {
  const authToken = useAuthStore((state) => state.authToken)
  const currentUser = useAuthStore((state) => state.currentUser)
  if (!authToken || !currentUser) return <Navigate to={ROUTES.LOGIN} replace />
  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'teacher' ? ROUTES.TEACHER_DASHBOARD : ROUTES.STUDENT_DASHBOARD} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
