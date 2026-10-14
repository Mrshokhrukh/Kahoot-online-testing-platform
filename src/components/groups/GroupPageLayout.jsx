import { useNavigate } from 'react-router-dom'
import AppLayout from '../shared/AppLayout'
import AppSidebar from '../shared/AppSidebar'
import { ROUTES } from '../../constants/routes'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function GroupPageLayout({ children, activeRoute = ROUTES.TEACHER_GROUPS }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar
        navItems={TEACHER_NAV_ITEMS}
        activeRoute={activeRoute}
        onNavigate={navigate}
      />
      <AppLayout>
        <div className="flex flex-col gap-6">{children}</div>
      </AppLayout>
    </div>
  )
}

export default GroupPageLayout
