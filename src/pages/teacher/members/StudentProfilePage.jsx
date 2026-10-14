import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3 } from 'lucide-react'
import AppAvatar from '../../../components/shared/AppAvatar'
import AppButton from '../../../components/shared/AppButton'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppLayout from '../../../components/shared/AppLayout'
import AppSidebar from '../../../components/shared/AppSidebar'
import AppSpinner from '../../../components/shared/AppSpinner'
import StudentStatsRow from '../../../components/members/StudentStatsRow'
import StudentTestHistoryTable from '../../../components/members/StudentTestHistoryTable'
import useStudentProfile from '../../../hooks/members/useStudentProfile'
import { ROUTES } from '../../../constants/routes'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function ProfileBody({ studentProfile, recentTestList, onAnalyticsOpen }) {
  const joinedDateLabel = new Date(studentProfile.joinedAt).toLocaleDateString('uz-UZ')
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <AppAvatar name={studentProfile.name} size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{studentProfile.name}</h1>
            <p className="text-sm text-gray-600">{studentProfile.email} · Qo'shilgan: {joinedDateLabel}</p>
          </div>
        </div>
        <AppButton label={<><BarChart3 className="h-4 w-4" />Batafsil analitika</>} onClick={onAnalyticsOpen} />
      </div>
      <StudentStatsRow testCount={studentProfile.testCount} avgScore={studentProfile.avgScore} attendanceRate={studentProfile.attendanceRate} />
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-900">So'nggi 5 ta test natijasi</h2>
        <StudentTestHistoryTable testList={recentTestList} />
      </section>
    </div>
  )
}

function StudentProfilePage() {
  const { groupId, studentId } = useParams()
  const navigate = useNavigate()
  const { studentProfile, recentTestList, isLoading, loadError } = useStudentProfile(studentId)

  function handleBackClick() {
    navigate(ROUTES.TEACHER_MEMBERS.replace(':groupId', groupId))
  }

  function handleAnalyticsOpen() {
    navigate(ROUTES.STUDENT_ANALYTICS.replace(':studentId', studentId))
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar navItems={TEACHER_NAV_ITEMS} activeRoute={ROUTES.TEACHER_GROUPS} onNavigate={navigate} />
      <AppLayout>
        <div className="flex flex-col gap-6">
          <div>
            <AppButton label={<><ArrowLeft className="h-4 w-4" />O'quvchilar</>} variant="ghost" size="sm" onClick={handleBackClick} />
          </div>
          {isLoading && <div className="flex justify-center py-12"><AppSpinner size="lg" /></div>}
          {loadError && <AppErrorMessage message={loadError} />}
          {studentProfile && <ProfileBody studentProfile={studentProfile} recentTestList={recentTestList} onAnalyticsOpen={handleAnalyticsOpen} />}
        </div>
      </AppLayout>
    </div>
  )
}

export default StudentProfilePage
