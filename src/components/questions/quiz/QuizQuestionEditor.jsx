import { useId } from 'react'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function updateQuestion(question, onChange, updates) {
  if (!onChange) return
  onChange({ ...question, ...updates })
}

function updateAnswerOption(question, onChange, optionIndex, answerOption) {
  const answerOptions = Array.from(
    { length: 4 },
    (_, index) => question?.answerOptions?.[index] ?? '',
  )
  answerOptions[optionIndex] = answerOption
  updateQuestion(question, onChange, { answerOptions })
}

function QuizQuestionEditor({ question = {}, onChange }) {
  const editorId = useId()
  const answerOptions = Array.from(
    { length: 4 },
    (_, index) => question.answerOptions?.[index] ?? '',
  )
  const correctOptionIndex = question.correctOptionIndex ?? 0

  return (
    <section className="w-full space-y-5 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900" htmlFor={`${editorId}-question`}>
          Savol matni
        </label>
        <input
          id={`${editorId}-question`}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-600"
          type="text"
          value={question.questionText ?? ''}
          placeholder="Savolni kiriting"
          onChange={(event) => updateQuestion(question, onChange, { questionText: event.target.value })}
        />
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-900">Javob variantlari</legend>
        {answerOptions.map((answerOption, optionIndex) => {
          const optionId = `${editorId}-option-${optionIndex}`
          return (
            <div key={OPTION_LABELS[optionIndex]} className="flex items-center gap-3">
              <input
                id={`${optionId}-correct`}
                className="h-4 w-4 accent-blue-600"
                type="radio"
                name={`${editorId}-correct-answer`}
                value={optionIndex}
                checked={correctOptionIndex === optionIndex}
                aria-label={`${OPTION_LABELS[optionIndex]} to'g'ri javob`}
                onChange={() => updateQuestion(question, onChange, { correctOptionIndex: optionIndex })}
              />
              <label className="shrink-0 text-sm font-semibold text-gray-600" htmlFor={optionId}>
                {OPTION_LABELS[optionIndex]}.
              </label>
              <input
                id={optionId}
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-600"
                type="text"
                value={answerOption}
                placeholder={`${OPTION_LABELS[optionIndex]} variantini kiriting`}
                onChange={(event) => updateAnswerOption(question, onChange, optionIndex, event.target.value)}
              />
            </div>
          )
        })}
      </fieldset>
    </section>
  )
}

export default QuizQuestionEditor
