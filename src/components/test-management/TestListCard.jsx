import { CalendarDays, ClipboardCheck, Users } from 'lucide-react'
import { AppCard, AppButton } from '../shared'
import TestStatusBadge from './TestStatusBadge'

const MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentyabr', 'oktabr', 'noyabr', 'dekabr',
]

function formatDateTime(value) {
  if (!value) return 'Vaqt belgilanmagan'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Vaqt belgilanmagan'
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${date.getDate()}-${MONTHS[date.getMonth()]}, ${hour}:${minute}`
}

export default function TestListCard({ test, onConfigure, onMonitor, onResults }) {
  return (
    <AppCard className="group flex flex-col gap-5 border border-gray-100 p-5 shadow-sm transition-all duration-200 hover:border-green-100 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 text-green-700 transition-transform duration-200 group-hover:scale-105">
          <ClipboardCheck className="h-5 w-5" />
        </span>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">{test.name}</h2>
            <TestStatusBadge status={test.status} />
          </div>
          <p className="text-sm font-medium text-gray-600">{test.groupName}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-green-700" />{formatDateTime(test.scheduledAt)}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-green-700" />{test.studentCount ?? 0} ta o‘quvchi</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
        <AppButton label="Sozlamalar" variant="secondary" size="sm" onClick={() => onConfigure(test.id)} />
        {test.status === 'active' && <AppButton label="Monitoring" size="sm" onClick={() => onMonitor(test.id)} />}
        {test.status === 'completed' && <AppButton label="Natijalar" size="sm" onClick={() => onResults(test.id)} />}
      </div>
    </AppCard>
  )
}
