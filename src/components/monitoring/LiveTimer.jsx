function LiveTimer({ remainingSeconds = 0 }) {
  const safeSeconds = Number.isFinite(remainingSeconds)
    ? Math.max(0, Math.floor(remainingSeconds))
    : 0
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <time
      aria-label={`Qolgan vaqt: ${formattedTime}`}
      className="text-4xl font-black tabular-nums tracking-tight text-red-500 sm:text-5xl"
    >
      {formattedTime}
    </time>
  )
}

export default LiveTimer
