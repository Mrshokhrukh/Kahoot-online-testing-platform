import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppBadge from '../../../components/shared/AppBadge'
import AppButton from '../../../components/shared/AppButton'
import AppLayout from '../../../components/shared/AppLayout'
import AppModal from '../../../components/shared/AppModal'
import AppSidebar from '../../../components/shared/AppSidebar'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import MonitoringHeader from '../../../components/monitoring/MonitoringHeader'
import OverallProgressPanel from '../../../components/monitoring/OverallProgressPanel'
import QuestionStatsPanel from '../../../components/monitoring/QuestionStatsPanel'
import StudentStatusGrid from '../../../components/monitoring/StudentStatusGrid'
import useMonitoring from '../../../hooks/monitoring/useMonitoring'
import { ROUTES } from '../../../constants/routes'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function StudentSection({ studentStatusList }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-2xl font-bold text-gray-900">O‘quvchilar</h2><p className="mt-1 text-sm text-gray-500">Har bir ishtirokchining testdagi holati</p></div>
        <AppBadge label={`${studentStatusList.length} nafar`} variant="info" />
      </div>
      <StudentStatusGrid studentStatusList={studentStatusList} />
    </section>
  )
}

function MonitoringDashboard({ monitoring, onStopClick }) {
  const { monitoringData, remainingSeconds, isActive, studentStatusList } = monitoring

  return (
    <div className="flex flex-col gap-6">
      <MonitoringHeader testName={monitoringData.testName} groupName={monitoringData.groupName} remainingSeconds={remainingSeconds} isActive={isActive} onStopClick={onStopClick} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <OverallProgressPanel studentStatusList={studentStatusList} totalStudents={monitoringData.totalStudents} />
        <QuestionStatsPanel />
      </div>
      <StudentSection studentStatusList={studentStatusList} />
    </div>
  )
}

function MonitoringContent({ monitoring, onStopClick }) {
  if (monitoring.isLoading) return <div className="flex justify-center py-16"><AppSpinner size="lg" /></div>
  if (!monitoring.monitoringData) return <EmptyState text="Monitoring ma’lumotlari topilmadi" />
  return <MonitoringDashboard monitoring={monitoring} onStopClick={onStopClick} />
}

function StopMonitoringModal({ isOpen, onClose, onConfirm }) {
  return (
    <AppModal isOpen={isOpen} onClose={onClose} title="Testni to‘xtatasizmi?">
      <p className="text-sm text-gray-600">Monitoring to‘xtaydi va siz test natijalari sahifasiga o‘tasiz.</p>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <AppButton label="Davom etish" variant="secondary" onClick={onClose} />
        <AppButton label="To‘xtatish" variant="danger" onClick={onConfirm} />
      </div>
    </AppModal>
  )
}

function ResultsButton({ testId, onNavigate }) {
  const resultsRoute = testId
    ? ROUTES.TEACHER_RESULTS.replace(':testId', encodeURIComponent(testId))
    : ROUTES.TEACHER_TESTS

  return <AppButton label="Natijalarga o‘tish" onClick={() => onNavigate(resultsRoute)} />
}

function MonitoringPage() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const monitoring = useMonitoring()
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)

  function handleStopConfirm() {
    monitoring.stopMonitoring()
    const resultsRoute = testId
      ? ROUTES.TEACHER_RESULTS.replace(':testId', encodeURIComponent(testId))
      : ROUTES.TEACHER_TESTS
    navigate(resultsRoute)
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar navItems={TEACHER_NAV_ITEMS} activeRoute={ROUTES.TEACHER_MONITOR} onNavigate={navigate} />
      <AppLayout>
        <MonitoringContent monitoring={monitoring} onStopClick={() => setIsStopModalOpen(true)} />
        {!monitoring.isActive && !monitoring.isLoading && <div className="mt-6 flex justify-end"><ResultsButton testId={testId} onNavigate={navigate} /></div>}
      </AppLayout>
      <StopMonitoringModal isOpen={isStopModalOpen} onClose={() => setIsStopModalOpen(false)} onConfirm={handleStopConfirm} />
    </div>
  )
}

export default MonitoringPage
