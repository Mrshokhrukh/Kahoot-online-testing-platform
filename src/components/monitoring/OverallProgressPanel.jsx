import AppCard from '../shared/AppCard'

function calculateProgress(studentStatusList = []) {
  const counts = studentStatusList.reduce(
    (summary, student) => {
      if (student?.status === 'completed') summary.completed += 1
      if (student?.status === 'in_progress') summary.inProgress += 1
      if (student?.status === 'disconnected') summary.disconnected += 1

      const total = Number.isFinite(student?.totalQuestions) ? student.totalQuestions : 0
      const current = Number.isFinite(student?.currentQuestion) ? student.currentQuestion : 0
      summary.progressTotal += total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0
      return summary
    },
    { completed: 0, inProgress: 0, disconnected: 0, progressTotal: 0 },
  )

  return {
    ...counts,
    connected: counts.completed + counts.inProgress,
    averageProgress: studentStatusList.length
      ? Math.round((counts.progressTotal / studentStatusList.length) * 100)
      : 0,
  }
}

function StatTile({ label, value, tone }) {
  const toneClasses = {
    blue: 'bg-blue-50 text-blue-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    green: 'bg-green-50 text-green-700',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-3 sm:p-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-xl font-bold ${toneClasses[tone]}`}>
        {value}
      </p>
    </div>
  )
}

function StatisticsGrid({ statistics }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatTile label="Ulangan" value={statistics.connected} tone="blue" />
      <StatTile label="Ishlayapti" value={statistics.inProgress} tone="yellow" />
      <StatTile label="Tugatgan" value={statistics.completed} tone="green" />
      <StatTile label="Ulanmagan" value={statistics.disconnected} tone="gray" />
    </div>
  )
}

function CompletionProgress({ completionRate }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">Testni tugatganlar</span>
        <span className="font-semibold text-gray-900">{completionRate}%</span>
      </div>
      <progress aria-label="Testni tugatgan o‘quvchilar foizi" className="h-2 w-full overflow-hidden rounded-full accent-green-500" max="100" value={completionRate} />
    </div>
  )
}

function OverallProgressPanel({ studentStatusList = [], totalStudents }) {
  const statistics = calculateProgress(studentStatusList)
  const studentTotal = Number.isFinite(totalStudents) ? totalStudents : studentStatusList.length
  const completionRate = studentTotal > 0 ? Math.round((statistics.completed / studentTotal) * 100) : 0

  return (
    <AppCard className="h-full">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="text-xl font-semibold text-gray-900">Umumiy ko‘rsatkichlar</h2><p className="mt-1 text-sm text-gray-500">Jami {studentTotal} nafar o‘quvchi</p></div>
        <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">O‘rtacha progress {statistics.averageProgress}%</span>
      </div>
      <StatisticsGrid statistics={statistics} />
      <CompletionProgress completionRate={completionRate} />
    </AppCard>
  )
}

export default OverallProgressPanel
