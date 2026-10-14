const ANSWER_OPTIONS = [
  { value: true, label: 'Ha ✓', colorClassName: 'bg-green-500' },
  { value: false, label: "Yo‘q ✗", colorClassName: 'bg-red-500' },
]

function normalizeAnswer(answer) {
  if (answer === true || answer === 'true' || answer === 'Ha') return true
  if (answer === false || answer === 'false' || answer === 'Yo‘q' || answer === "Yo'q") {
    return false
  }
  return null
}

function getAnswerClassName(answer, selectedAnswer, correctAnswer, isAnswerRevealed) {
  if (isAnswerRevealed && answer === correctAnswer) {
    return 'border-green-500 bg-green-50'
  }
  if (isAnswerRevealed && answer === selectedAnswer) {
    return 'border-red-500 bg-red-50'
  }
  if (answer === selectedAnswer) return 'border-blue-600 bg-blue-50'
  return 'border-gray-200 bg-white hover:border-blue-600'
}

function TrueFalseView({
  question,
  selectedAnswer = null,
  onSelectAnswer,
  isAnswerSubmitted = false,
  isAnswerRevealed = false,
  correctAnswer = null,
}) {
  if (!question) return null

  const normalizedSelectedAnswer = normalizeAnswer(selectedAnswer)
  const normalizedCorrectAnswer = normalizeAnswer(correctAnswer)

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {question.questionText}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ANSWER_OPTIONS.map(({ value, label, colorClassName }) => (
          <button
            key={String(value)}
            type="button"
            aria-pressed={normalizedSelectedAnswer === value}
            className={`flex min-h-24 items-center justify-center gap-3 rounded-lg border-2 p-5 text-lg font-semibold text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${getAnswerClassName(value, normalizedSelectedAnswer, normalizedCorrectAnswer, isAnswerRevealed)}`}
            disabled={isAnswerSubmitted}
            onClick={() => onSelectAnswer?.(value)}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-md text-white ${colorClassName}`}>
              {value ? '✓' : '✗'}
            </span>
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TrueFalseView
