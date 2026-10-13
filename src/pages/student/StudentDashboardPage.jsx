import { useNavigate } from 'react-router-dom'
import AppButton from '../../components/shared/AppButton'
import AppErrorMessage from '../../components/shared/AppErrorMessage'
import AppLayout from '../../components/shared/AppLayout'
import AppSpinner from '../../components/shared/AppSpinner'
import EmptyState from '../../components/shared/EmptyState'
import MyResultCard from '../../components/student/MyResultCard'
import StudentStatsBar from '../../components/student/StudentStatsBar'
import UpcomingTestCard from '../../components/student/UpcomingTestCard'
import useStudentDashboard from '../../hooks/student/useStudentDashboard'
import { useAuthStore } from '../../store/authStore'

const RESULTS_PATH = '/student/results'
const FALLBACK_USER_NAME = 'o\'quvchi'

function UpcomingTestSection({ upcomingTestList }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Yaqin testlar</h2>
      {upcomingTestList.length === 0 ? (
        <EmptyState text="Yaqin testlar yo'q" />
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

function RecentResultSection({ recentResultList }) {
  const navigate = useNavigate()

  function handleResultsNavigate() {
    navigate(RESULTS_PATH)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">So'nggi natijalar</h2>
        <AppButton
          label="Barchasi"
          variant="ghost"
          size="sm"
          onClick={handleResultsNavigate}
        />
      </div>
      {recentResultList.length === 0 ? (
        <EmptyState text="Hali natijalar yo'q" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentResultList.map((result) => (
            <MyResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </section>
  )
}

function DashboardBody({ upcomingTestList, recentResultList, studentStats }) {
  return (
    <div className="flex flex-col gap-8">
      <StudentStatsBar studentStats={studentStats} />
      <UpcomingTestSection upcomingTestList={upcomingTestList} />
      <RecentResultSection recentResultList={recentResultList} />
    </div>
  )
}

function StudentDashboardPage() {
  const currentUser = useAuthStore((state) => state.currentUser)
  const { upcomingTestList, recentResultList, studentStats, isLoading, loadError } =
    useStudentDashboard()
  const userName = currentUser?.name ?? FALLBACK_USER_NAME
  const isContentReady = !isLoading && !loadError

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Salom, {userName}!</h1>
          {isContentReady && (
            <p className="text-base text-gray-600">
              {studentStats.groupCount} ta guruhingiz bor
            </p>
          )}
        </header>
        {isLoading && (
          <div className="flex justify-center py-12">
            <AppSpinner size="lg" />
          </div>
        )}
        {loadError && <AppErrorMessage message={loadError} />}
        {isContentReady && (
          <DashboardBody
            upcomingTestList={upcomingTestList}
            recentResultList={recentResultList}
            studentStats={studentStats}
          />
        )}
      </div>
    </AppLayout>
  )
}

export default StudentDashboardPage
