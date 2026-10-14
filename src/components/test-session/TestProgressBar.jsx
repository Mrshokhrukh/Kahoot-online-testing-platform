function getProgressWidthClass(progressPercent) {
  if (progressPercent <= 0) return 'w-0'
  if (progressPercent <= 20) return 'w-1/5'
  if (progressPercent <= 25) return 'w-1/4'
  if (progressPercent <= 33) return 'w-1/3'
  if (progressPercent <= 50) return 'w-1/2'
  if (progressPercent <= 66) return 'w-2/3'
  if (progressPercent <= 75) return 'w-3/4'
  if (progressPercent <= 100) return 'w-full'
  return 'w-full'
}

function TestProgressBar({ currentQuestion = 1, questionCount = 0 }) {
  const safeQuestionCount = Math.max(0, Number(questionCount) || 0)
  const safeCurrentQuestion = Math.max(0, Number(currentQuestion) || 0)
  const progressPercent = safeQuestionCount === 0 ? 0 : Math.min((safeCurrentQuestion / safeQuestionCount) * 100, 100)
  const progressLabel = safeQuestionCount === 0 ? 'Savollar yo\'q' : `${Math.min(safeCurrentQuestion, safeQuestionCount)} / ${safeQuestionCount}`

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span className="font-semibold text-gray-900">{progressLabel}</span>
      </div>
      <div
        className="h-3 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPercent)}
        aria-label="Savollar progressi"
      >
        <div className={`h-full rounded-full bg-blue-600 transition-all duration-200 ${getProgressWidthClass(progressPercent)}`} />
      </div>
    </div>
  )
}

export default TestProgressBar
