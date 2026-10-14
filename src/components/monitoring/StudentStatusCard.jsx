import AppAvatar from '../shared/AppAvatar'
import AppBadge from '../shared/AppBadge'
import AppCard from '../shared/AppCard'

const STATUS_PRESENTATION = {
  connected: { label: 'Ulangan', variant: 'info', progressColor: 'accent-blue-600' },
  in_progress: { label: 'Ishlayapti', variant: 'warning', progressColor: 'accent-yellow-500' },
  completed: { label: 'Tugatdi', variant: 'success', progressColor: 'accent-green-500' },
  disconnected: { label: 'Ulanmagan', variant: 'neutral', progressColor: 'accent-gray-400' },
}

function StudentIdentity({ name, status }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <AppAvatar name={name} size="md" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-900">{name}</h3>
        <p className="mt-0.5 text-xs text-gray-400">O‘quvchi</p>
      </div>
      <AppBadge label={status.label} variant={status.variant} className="shrink-0 px-2" />
    </div>
  )
}

function StudentQuestionProgress({ name, currentQuestion, totalQuestions, progress, progressColor }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-gray-500">Savollar</span>
        <span className="font-semibold text-gray-800">{currentQuestion} / {totalQuestions}</span>
      </div>
      <progress aria-label={`${name}: ${progress}% bajarildi`} className={`mt-2 h-2 w-full overflow-hidden rounded-full ${progressColor}`} max="100" value={progress} />
    </div>
  )
}

function StudentStatusCard({ student }) {
  if (!student) return null
  const name = typeof student.name === 'string' ? student.name : 'Noma’lum o‘quvchi'
  const status = STATUS_PRESENTATION[student.status] || STATUS_PRESENTATION.disconnected
  const totalQuestions = Number.isFinite(student.totalQuestions) ? Math.max(0, student.totalQuestions) : 0
  const currentQuestion = Number.isFinite(student.currentQuestion) ? Math.min(Math.max(0, student.currentQuestion), totalQuestions) : 0
  const progress = totalQuestions ? Math.round((currentQuestion / totalQuestions) * 100) : 0

  return (
    <AppCard className="min-w-0 p-4 sm:p-5">
      <StudentIdentity name={name} status={status} />
      <StudentQuestionProgress name={name} currentQuestion={currentQuestion} totalQuestions={totalQuestions} progress={progress} progressColor={status.progressColor} />
      {Number.isFinite(student.correctRate) && <p className="mt-3 text-xs text-gray-500">To‘g‘ri javoblar: <span className="font-semibold text-gray-800">{student.correctRate}%</span></p>}
    </AppCard>
  )
}

export default StudentStatusCard
