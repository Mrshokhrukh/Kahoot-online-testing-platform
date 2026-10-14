const TIME_FORMAT = {
  pad: (value) => String(Math.max(0, value)).padStart(2, '0'),
}

function formatCountdown(seconds = 0) {
  const totalSeconds = Math.max(0, Number(seconds) || 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60

  return `${TIME_FORMAT.pad(hours)}:${TIME_FORMAT.pad(minutes)}:${TIME_FORMAT.pad(remainingSeconds)}`
}

function CountdownTimer({ seconds = 0 }) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center shadow-sm sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Qolgan vaqt</p>
      <p className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">{formatCountdown(seconds)}</p>
    </div>
  )
}

export default CountdownTimer
