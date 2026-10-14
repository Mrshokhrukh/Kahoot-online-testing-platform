const OPTION_LABELS = ['A', 'B', 'C', 'D']
const OPTION_COLORS = [
  'bg-red-500',
  'bg-blue-600',
  'bg-green-500',
  'bg-yellow-400 text-gray-900',
]

function QuizQuestionView({
  question,
  selectedOptionIndex = null,
  onSelectOption,
  isAnswerSubmitted = false,
  isAnswerRevealed = false,
  correctOptionIndex = null,
}) {
  if (!question) return null

  const answerOptions = Array.from(
    { length: 4 },
    (_, index) => question.answerOptions?.[index] ?? '',
  )

  function getOptionClassName(optionIndex) {
    const isCorrectAnswer = isAnswerRevealed && optionIndex === correctOptionIndex
    const isSelectedWrongAnswer =
      isAnswerRevealed &&
      optionIndex === selectedOptionIndex &&
      optionIndex !== correctOptionIndex

    if (isCorrectAnswer) {
      return 'border-green-500 bg-green-100 text-gray-900'
    }
    if (isSelectedWrongAnswer) {
      return 'border-red-500 bg-red-50 text-gray-900'
    }
    if (optionIndex === selectedOptionIndex) {
      return 'border-blue-600 bg-blue-50 text-gray-900'
    }
    return 'border-gray-200 bg-white text-gray-900 hover:border-blue-600'
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {question.questionText}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {answerOptions.map((answerOption, optionIndex) => (
          <button
            key={OPTION_LABELS[optionIndex]}
            type="button"
            aria-pressed={selectedOptionIndex === optionIndex}
            className={`flex min-h-20 items-center gap-4 rounded-lg border-2 p-4 text-left text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${getOptionClassName(optionIndex)}`}
            disabled={isAnswerSubmitted}
            onClick={() => onSelectOption?.(optionIndex)}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-lg font-bold text-white ${OPTION_COLORS[optionIndex]}`}
            >
              {OPTION_LABELS[optionIndex]}
            </span>
            <span>{answerOption}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuizQuestionView
