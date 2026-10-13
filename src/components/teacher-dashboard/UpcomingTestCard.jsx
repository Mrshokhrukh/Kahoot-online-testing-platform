import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, Clock } from 'lucide-react'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import { ROUTES } from '../../constants/routes'

const MS_PER_MINUTE = 60000
const MINUTES_PER_HOUR = 60
const COUNTDOWN_TICK_MS = 60000
const TEST_ID_PARAM = ':testId'

function padTwoDigits(value) {
  return String(value).padStart(2, '0')
}

function formatClock(date) {
  return `${padTwoDigits(date.getHours())}:${padTwoDigits(date.getMinutes())}`
}

function formatDate(date) {
  const day = padTwoDigits(date.getDate())
  const month = padTwoDigits(date.getMonth() + 1)
  return `${day}.${month}.${date.getFullYear()}`
}

function formatDuration(remainingMinutes) {
  const hourCount = Math.floor(remainingMinutes / MINUTES_PER_HOUR)
  const minuteCount = remainingMinutes % MINUTES_PER_HOUR
  if (hourCount === 0) return `${minuteCount} daqiqa qoldi`
  if (minuteCount === 0) return `${hourCount} soat qoldi`
  return `${hourCount} soat ${minuteCount} daqiqa qoldi`
}

function formatTimeLeft(scheduledDate, nowTimestamp) {
  const remainingMinutes = Math.max(
    0,
    Math.ceil((scheduledDate - nowTimestamp) / MS_PER_MINUTE),
  )
  if (scheduledDate - nowTimestamp <= 0) return 'Test boshlandi'
  return formatDuration(remainingMinutes)
}

function useNowTimestamp() {
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = setInterval(
      () => setNowTimestamp(Date.now()),
      COUNTDOWN_TICK_MS,
    )
    return () => clearInterval(intervalId)
  }, [])

  return nowTimestamp
}

function UpcomingTestCard({ test }) {
  const navigate = useNavigate()
  const nowTimestamp = useNowTimestamp()

  if (!test) return null

  const scheduledDate = new Date(test.scheduledAt)
  const isActive = test.status === 'active'

  function handleMonitorOpen() {
    navigate(ROUTES.TEACHER_MONITOR.replace(TEST_ID_PARAM, test.id))
  }

  return (
    <AppCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
          <p className="text-sm text-gray-600">{test.groupName}</p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarClock className="w-4 h-4" aria-hidden="true" />
            {formatDate(scheduledDate)} {formatClock(scheduledDate)}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {formatTimeLeft(scheduledDate, nowTimestamp)}
          </p>
        </div>
        {isActive && (
          <AppButton
            label="Monitoring"
            variant="secondary"
            size="sm"
            onClick={handleMonitorOpen}
          />
        )}
      </div>
    </AppCard>
  )
}

export default UpcomingTestCard
