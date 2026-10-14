import AppBadge from '../shared/AppBadge'
import AppButton from '../shared/AppButton'
import LiveTimer from './LiveTimer'

function MonitoringTitle({ testName, groupName, isActive }) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <AppBadge label={isActive ? 'Jonli monitoring' : 'Test yakunlandi'} variant={isActive ? 'success' : 'neutral'} />
        <span className="text-xs font-medium text-gray-400">{groupName || 'Guruh ko‘rsatilmagan'}</span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{testName || 'Test monitoringi'}</h1>
      <p className="mt-1 text-sm text-gray-500">O‘quvchilar holati real vaqt rejimida yangilanadi</p>
    </div>
  )
}

function MonitoringControls({ remainingSeconds, isActive, onStopClick }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Qolgan vaqt</span>
        <LiveTimer remainingSeconds={remainingSeconds} />
      </div>
      {isActive && <AppButton label="Testni to‘xtatish" variant="danger" onClick={onStopClick} className="w-full sm:w-auto" />}
    </div>
  )
}

function MonitoringHeader({ testName, groupName, remainingSeconds, isActive, onStopClick }) {
  return (
    <header className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <MonitoringTitle testName={testName} groupName={groupName} isActive={isActive} />
      <MonitoringControls remainingSeconds={remainingSeconds} isActive={isActive} onStopClick={onStopClick} />
    </header>
  )
}

export default MonitoringHeader
