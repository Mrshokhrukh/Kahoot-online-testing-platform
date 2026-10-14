import { useEffect, useMemo, useRef, useState } from 'react'

function useTestTimer({
  scheduledAt,
  durationMinutes = 0,
  onTestTimeExpired,
}) {
  const [currentTime, setCurrentTime] = useState(() => Date.now())
  const expirationHandledRef = useRef(false)

  useEffect(() => {
    expirationHandledRef.current = false
  }, [scheduledAt, durationMinutes])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [scheduledAt])

  const parsedScheduledAt = useMemo(() => {
    if (Number.isFinite(Date.parse(scheduledAt))) {
      return new Date(scheduledAt).getTime()
    }

    return currentTime
  }, [currentTime, scheduledAt])

  const countdownSeconds = Math.max(0, Math.ceil((parsedScheduledAt - currentTime) / 1000))
  const isTestStarted = countdownSeconds <= 0
  const totalDurationSeconds = Math.max(0, Number(durationMinutes) * 60)
  const testEndTimestamp = parsedScheduledAt + totalDurationSeconds * 1000
  const remainingTestSeconds = isTestStarted
    ? Math.max(0, Math.ceil((testEndTimestamp - currentTime) / 1000))
    : totalDurationSeconds

  useEffect(() => {
    if (!isTestStarted || remainingTestSeconds > 0 || expirationHandledRef.current) {
      return
    }

    expirationHandledRef.current = true
    onTestTimeExpired?.()
  }, [isTestStarted, remainingTestSeconds, onTestTimeExpired])

  return {
    countdownSeconds,
    remainingTestSeconds,
    isTestStarted,
  }
}

export default useTestTimer
