import { useNavigate } from 'react-router-dom'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppLayout from '../../../components/shared/AppLayout'
import AppSidebar from '../../../components/shared/AppSidebar'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import GroupSummaryCard from '../../../components/teacher-dashboard/GroupSummaryCard'
import QuickActions from '../../../components/teacher-dashboard/QuickActions'
import RecentActivityItem from '../../../components/teacher-dashboard/RecentActivityItem'
import StatsOverview from '../../../components/teacher-dashboard/StatsOverview'
import UpcomingTestCard from '../../../components/teacher-dashboard/UpcomingTestCard'
import useTeacherDashboard from '../../../hooks/teacher-dashboard/useTeacherDashboard'
import { useAuthStore } from '../../../store/authStore'
import { ROUTES } from '../../../constants/routes'

const FALLBACK_USER_NAME = 'Sardor Usmonov'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function GroupSection({ groupSummaryList }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Guruhlarim</h2>
      {groupSummaryList.length === 0 ? (
        <EmptyState text="Hali guruh yaratilmagan" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groupSummaryList.map((group) => (
            <GroupSummaryCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </section>
  )
}

function UpcomingTestSection({ upcomingTestList }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Yaqin testlar</h2>
      {upcomingTestList.length === 0 ? (
        <EmptyState text="Belgilangan test yo'q" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingTestList.map((test) => (
            <UpcomingTestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </section>
  )
}

function ActivitySection({ recentActivityList }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">O'quvchilar faoliyati</h2>
      <AppCard>
        {recentActivityList.length === 0 ? (
          <EmptyState text="Faoliyat yozuvlari yo'q" />
        ) : (
          <div className="divide-y divide-gray-100">
            {recentActivityList.map((activity) => (
              <RecentActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </AppCard>
    </section>
  )
}

function DashboardBody({
  dashboardStats,
  groupSummaryList,
  upcomingTestList,
  recentActivityList,
}) {
  return (
    <div className="flex flex-col gap-8">
      <StatsOverview dashboardStats={dashboardStats} />
      <GroupSection groupSummaryList={groupSummaryList} />
      <UpcomingTestSection upcomingTestList={upcomingTestList} />
      <ActivitySection recentActivityList={recentActivityList} />
      <QuickActions />
    </div>
  )
}

function TeacherDashboardPage() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.currentUser)
  const {
    dashboardStats,
    groupSummaryList,
    upcomingTestList,
    recentActivityList,
    isLoading,
    loadError,
  } = useTeacherDashboard()
  const userName = currentUser?.name ?? FALLBACK_USER_NAME
  const isContentReady = !isLoading && !loadError

  function handleSidebarNavigate(route) {
    navigate(route)
  }

  function handleProfileOpen() {
    navigate(ROUTES.TEACHER_PROFILE)
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar
        navItems={TEACHER_NAV_ITEMS}
        activeRoute={ROUTES.TEACHER_DASHBOARD}
        onNavigate={handleSidebarNavigate}
      />
      <AppLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <header>
            <h1 className="text-3xl font-bold text-gray-900">
              Salom, {userName}!
            </h1>
            <p className="text-base text-gray-600">
              Guruhlar, testlar va o'quvchilar holati bir joyda
            </p>
          </header>
          <AppButton
            label="Profilim"
            variant="secondary"
            size="sm"
            onClick={handleProfileOpen}
          />
        </div>
          {isLoading && (
            <div className="flex justify-center py-12">
              <AppSpinner size="lg" />
            </div>
          )}
          {loadError && <AppErrorMessage message={loadError} />}
          {isContentReady && (
            <DashboardBody
              dashboardStats={dashboardStats}
              groupSummaryList={groupSummaryList}
              upcomingTestList={upcomingTestList}
              recentActivityList={recentActivityList}
            />
          )}
        </div>
      </AppLayout>
    </div>
  )
}

export default TeacherDashboardPage
