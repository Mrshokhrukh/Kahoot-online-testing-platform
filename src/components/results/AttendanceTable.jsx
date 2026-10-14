import { Check, X } from 'lucide-react'
import AppBadge from '../shared/AppBadge'
import AppCard from '../shared/AppCard'
import EmptyState from '../shared/EmptyState'

const EMPTY_TIME_TEXT = '—'

function AttendanceStatus({ hasAttended }) {
  if (hasAttended) {
    return (
      <AppBadge variant="success">
        <Check className="w-4 h-4 inline mr-1" />
        Qatnashdi
      </AppBadge>
    )
  }
  return (
    <AppBadge variant="danger">
      <X className="w-4 h-4 inline mr-1" />
      Qatnashmadi
    </AppBadge>
  )
}

function AttendanceRow({ student }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="px-3 py-3 text-gray-900">{student.name}</td>
      <td className="px-3 py-3"><AttendanceStatus hasAttended={student.attended} /></td>
      <td className="px-3 py-3 text-gray-600">{student.startTime || EMPTY_TIME_TEXT}</td>
      <td className="px-3 py-3 text-gray-600">{student.endTime || EMPTY_TIME_TEXT}</td>
    </tr>
  )
}

function AttendanceTable({ attendanceList }) {
  if (!attendanceList || attendanceList.length === 0) {
    return <EmptyState text="Qatnashish ma'lumoti hali yo'q." />
  }

  return (
    <AppCard>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Qatnashish</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-3 py-2 font-medium">Ism</th>
              <th className="px-3 py-2 font-medium">Holat</th>
              <th className="px-3 py-2 font-medium">Kirish vaqti</th>
              <th className="px-3 py-2 font-medium">Tugatish vaqti</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((student) => (
              <AttendanceRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </AppCard>
  )
}

export default AttendanceTable
