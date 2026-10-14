import { useId } from 'react'
import AppCard from '../../shared/AppCard'
import AppInput from '../../shared/AppInput'

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
    <AppCard className="w-full space-y-5">
      <div className="space-y-2">
        <AppInput
          label="Savol matni"
          value={question.questionText ?? ''}
          placeholder="Savolni kiriting"
          className="text-base"
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
              <span className="shrink-0 text-sm font-semibold text-gray-600">
                {OPTION_LABELS[optionIndex]}.
              </span>
              <AppInput
                className="min-w-0 flex-1"
                value={answerOption}
                placeholder={`${OPTION_LABELS[optionIndex]} variantini kiriting`}
                aria-label={`${OPTION_LABELS[optionIndex]} javob varianti`}
                onChange={(event) => updateAnswerOption(question, onChange, optionIndex, event.target.value)}
              />
            </div>
          )
        })}
      </fieldset>
    </AppCard>
  )
}

export default QuizQuestionEditor
