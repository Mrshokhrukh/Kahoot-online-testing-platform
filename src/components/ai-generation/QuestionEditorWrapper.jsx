import AppCard from '../shared/AppCard'

function QuestionEditorWrapper({ question, index = 0, onChange }) {
  const updateQuestion = (changes) => {
    onChange?.({ ...question, ...changes })
  }

  if (!question) {
    return null
  }

  if (question.type === 'quiz') {
    return (
      <AppCard className="border border-gray-200 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">Savol {index + 1}</h3>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
            Quiz
          </span>
        </div>

        <textarea
          value={question.questionText || ''}
          onChange={(event) => updateQuestion({ questionText: event.target.value })}
          rows={3}
          placeholder="Savol matnini yozing"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <div className="mt-4 space-y-2">
          {(question.answerOptions || []).map((option, optionIndex) => (
            <div key={`${question.id || index}-option-${optionIndex}`} className="flex items-center gap-2">
              <input
                type="radio"
                checked={question.correctOptionIndex === optionIndex}
                onChange={() => updateQuestion({ correctOptionIndex: optionIndex })}
                className="h-4 w-4 accent-blue-600"
              />
              <input
                type="text"
                value={option}
                onChange={(event) => {
                  const nextOptions = [...(question.answerOptions || [])]
                  nextOptions[optionIndex] = event.target.value
                  updateQuestion({ answerOptions: nextOptions })
                }}
                className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </AppCard>
    )
  }

  if (question.type === 'true_false') {
    return (
      <AppCard className="border border-gray-200 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">Savol {index + 1}</h3>
          <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
            True/False
          </span>
        </div>

        <textarea
          value={question.questionText || ''}
          onChange={(event) => updateQuestion({ questionText: event.target.value })}
          rows={3}
          placeholder="True/False savolini yozing"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => updateQuestion({ correctAnswer: true })}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              question.correctAnswer ? 'bg-green-500 text-white' : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            True
          </button>
          <button
            type="button"
            onClick={() => updateQuestion({ correctAnswer: false })}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              !question.correctAnswer ? 'bg-red-500 text-white' : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            False
          </button>
        </div>
      </AppCard>
    )
  }

  if (question.type === 'code') {
    return (
      <AppCard className="border border-gray-200 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">Savol {index + 1}</h3>
          <span className="rounded-full bg-yellow-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-yellow-700">
            Kod
          </span>
        </div>

        <textarea
          value={question.questionText || ''}
          onChange={(event) => updateQuestion({ questionText: event.target.value })}
          rows={2}
          placeholder="Kod savoli matnini yozing"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <textarea
          value={question.starterCode || ''}
          onChange={(event) => updateQuestion({ starterCode: event.target.value })}
          rows={8}
          placeholder="Starter code"
          className="mt-4 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </AppCard>
    )
  }

  return (
    <AppCard className="border border-gray-200 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900">Savol {index + 1}</h3>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-700">
          Ochiq
        </span>
      </div>

      <textarea
        value={question.questionText || ''}
        onChange={(event) => updateQuestion({ questionText: event.target.value })}
        rows={5}
        placeholder="Ochiq savolni yozing"
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </AppCard>
  )
}

export default QuestionEditorWrapper
