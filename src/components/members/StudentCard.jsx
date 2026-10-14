import { Eye, Trash2 } from 'lucide-react'
import AppAvatar from '../shared/AppAvatar'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'

function StudentCard({ student, onView, onRemove }) {
  if (!student) return null
  const joinedDateLabel = new Date(student.joinedAt).toLocaleDateString('uz-UZ')

  return (
    <AppCard className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <AppAvatar name={student.name} size="lg" />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">{student.name}</h3>
          <p className="text-xs text-gray-600">Qo'shilgan: {joinedDateLabel}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-gray-600">Ishtirok</dt>
          <dd className="text-lg font-semibold text-gray-900">{student.attendanceRate}%</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-600">O'rtacha ball</dt>
          <dd className="text-lg font-semibold text-gray-900">{student.avgScore}/100</dd>
        </div>
      </dl>
      <div className="flex gap-2">
        <AppButton label={<><Eye className="h-4 w-4" />Ko'rish</>} size="sm" onClick={() => onView(student.id)} className="flex-1" />
        <AppButton label={<><Trash2 className="h-4 w-4" />O'chirish</>} variant="secondary" size="sm" onClick={() => onRemove(student)} className="flex-1" />
      </div>
    </AppCard>
  )
}

export default StudentCard
