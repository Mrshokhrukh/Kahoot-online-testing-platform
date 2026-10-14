import CountdownTimer from './CountdownTimer'

function TestHeader({
  testName = 'Test',
  currentQuestionNumber = 1,
  questionCount = 0,
  remainingSeconds = 0,
}) {
  const safeQuestionCount = Math.max(0, Number(questionCount) || 0)
  const safeCurrentQuestion = Math.max(1, Number(currentQuestionNumber) || 1)
  const questionLabel = safeQuestionCount === 0 ? '0 / 0' : `${Math.min(safeCurrentQuestion, safeQuestionCount)} / ${safeQuestionCount}`

  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Test</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{testName}</h1>
        </div>
        <div className="w-full max-w-md md:w-auto">
          <CountdownTimer seconds={remainingSeconds} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
        <span className="font-semibold text-gray-900">Savollar: {questionLabel}</span>
        <span className="font-medium text-gray-700">Qolgan vaqt</span>
      </div>
    </header>
  )
}

export default TestHeader
