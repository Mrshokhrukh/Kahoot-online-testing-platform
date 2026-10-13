import AppAvatar from '../shared/AppAvatar'
import AppBadge from '../shared/AppBadge'

const BADGE_VARIANTS = {
  success: 'success',
  info: 'info',
  warning: 'warning',
}

function RecentActivityItem({ activity }) {
  if (!activity) return null

  return (
    <div className="flex items-center gap-3 py-3">
      <AppAvatar name={activity.studentName} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-800">
          {activity.studentName}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">{activity.groupName}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <AppBadge
          label={activity.action}
          variant={BADGE_VARIANTS[activity.state]}
          className="px-2 py-1 text-[10px]"
        />
        <span className="text-xs text-gray-400">{activity.time}</span>
      </div>
    </div>
  )
}

export default RecentActivityItem
