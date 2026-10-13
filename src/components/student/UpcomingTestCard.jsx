import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, Clock } from 'lucide-react'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import { ROUTES } from '../../constants/routeConstants'

const ACTIVE_WINDOW_MINUTES = 15
const MS_PER_MINUTE = 60000
const MS_PER_SECOND = 1000
const MINUTES_PER_HOUR = 60
const MINUTES_PER_DAY = 1440
const COUNTDOWN_TICK_MS = 1000
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

function isTomorrow(targetDate, nowTimestamp) {
  const tomorrowDate = new Date(nowTimestamp)
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  return targetDate.toDateString() === tomorrowDate.toDateString()
}

function isTestEntryActive(scheduledDate, nowTimestamp) {
  const minutesLeft = (scheduledDate - nowTimestamp) / MS_PER_MINUTE
  return minutesLeft <= ACTIVE_WINDOW_MINUTES && minutesLeft > 0
}

function formatCountdown(remainingMs) {
  const totalSeconds = Math.floor(remainingMs / MS_PER_SECOND)
  const minuteCount = Math.floor(totalSeconds / MINUTES_PER_HOUR)
  const secondCount = totalSeconds % MINUTES_PER_HOUR
  return `${padTwoDigits(minuteCount)}:${padTwoDigits(secondCount)} qoldi`
}

function formatDuration(remainingMinutes) {
  const hourCount = Math.floor(remainingMinutes / MINUTES_PER_HOUR)
  const minuteCount = remainingMinutes % MINUTES_PER_HOUR
  if (hourCount === 0) return `${minuteCount} daqiqa qoldi`
  if (minuteCount === 0) return `${hourCount} soat qoldi`
  return `${hourCount} soat ${minuteCount} daqiqa qoldi`
}

function formatTimeLeft(scheduledDate, nowTimestamp) {
  const remainingMs = scheduledDate - nowTimestamp
  if (remainingMs <= 0) return 'Test boshlandi'
  if (remainingMs < ACTIVE_WINDOW_MINUTES * MS_PER_MINUTE) {
    return formatCountdown(remainingMs)
  }
  if (isTomorrow(scheduledDate, nowTimestamp)) {
    return `Ertaga ${formatClock(scheduledDate)} da`
  }
  const remainingMinutes = Math.ceil(remainingMs / MS_PER_MINUTE)
  if (remainingMinutes >= MINUTES_PER_DAY) {
    return `${formatDate(scheduledDate)} ${formatClock(scheduledDate)} da`
  }
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
  const isActive = isTestEntryActive(scheduledDate, nowTimestamp)

  function handleTestEnter() {
    navigate(ROUTES.TEST_WAITING.replace(TEST_ID_PARAM, test.id))
  }

  return (
    <AppCard>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-900">{test.testName}</h3>
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
        <AppButton
          label="Testga kirish"
          isDisabled={!isActive}
          onClick={handleTestEnter}
        />
      </div>
    </AppCard>
  )
}

export default UpcomingTestCard
