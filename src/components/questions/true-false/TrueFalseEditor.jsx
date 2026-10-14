import AppCard from '../../shared/AppCard'
import AppInput from '../../shared/AppInput'

function updateQuestion(question, onChange, updates) {
  onChange?.({ ...question, ...updates })
}

function TrueFalseEditor({ question = {}, onChange }) {
  const correctAnswer = question.correctAnswer ?? true

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
        <legend className="text-sm font-semibold text-gray-900">To‘g‘ri javob</legend>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={correctAnswer === true}
            className={`min-h-11 rounded-md border px-4 py-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${correctAnswer === true ? 'border-green-500 bg-green-50 text-gray-900' : 'border-gray-200 bg-white text-gray-600 hover:border-green-500'}`}
            onClick={() => updateQuestion(question, onChange, { correctAnswer: true })}
          >
            Ha ✓
          </button>
          <button
            type="button"
            aria-pressed={correctAnswer === false}
            className={`min-h-11 rounded-md border px-4 py-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${correctAnswer === false ? 'border-red-500 bg-red-50 text-gray-900' : 'border-gray-200 bg-white text-gray-600 hover:border-red-500'}`}
            onClick={() => updateQuestion(question, onChange, { correctAnswer: false })}
          >
            Yo‘q ✗
          </button>
        </div>
      </fieldset>
    </AppCard>
  )
}

export default TrueFalseEditor
