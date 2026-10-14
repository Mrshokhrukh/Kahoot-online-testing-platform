import AppBadge from '../shared/AppBadge'

const LESSON_TEST_STATUS_CONFIG = {
  none: { label: 'Test yaratilmagan', variant: 'warning' },
  scheduled: { label: 'Test rejalashtirilgan', variant: 'info' },
  completed: { label: 'Test o\'tdi', variant: 'success' },
}

function LessonStatusBadge({ testStatus, className = '' }) {
  const statusConfig = LESSON_TEST_STATUS_CONFIG[testStatus]
  if (!statusConfig) return null

  return (
    <AppBadge
      label={statusConfig.label}
      variant={statusConfig.variant}
      className={className}
    />
  )
}

export default LessonStatusBadge
