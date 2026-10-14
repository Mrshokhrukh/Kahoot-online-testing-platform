import { CalendarDays, Users } from 'lucide-react'
import AppBadge from '../shared/AppBadge'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'

function formatGroupDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

function GroupCard({ group, onView }) {
  if (!group) return null

  return (
    <AppCard className="hover:border-blue-200">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
          <AppBadge label={group.subject} variant="info" className="shrink-0" />
        </div>

        {group.description && (
          <p className="line-clamp-2 text-sm text-gray-600">{group.description}</p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-400" aria-hidden="true" />
            {group.studentCount} o'quvchi
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden="true" />
            {formatGroupDate(group.lastActivityAt)}
          </span>
        </div>

        <AppButton
          label="Ko'rish"
          variant="secondary"
          size="sm"
          className="mt-auto w-full"
          onClick={() => onView(group.id)}
        />
      </div>
    </AppCard>
  )
}

export default GroupCard
