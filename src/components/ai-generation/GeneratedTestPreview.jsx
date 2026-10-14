import { CheckCircle2, Code2, FileText, PencilLine, Sparkles } from 'lucide-react'
import AppCard from '../shared/AppCard'
import EmptyState from '../shared/EmptyState'

const DIFFICULTY_LABELS = {
  easy: 'Oson',
  medium: 'O‘rta',
  hard: 'Qiyin',
}

const TYPE_LABELS = {
  quiz: { label: 'Quiz', icon: Sparkles },
  true_false: { label: 'T/F', icon: CheckCircle2 },
  code: { label: 'Kod', icon: Code2 },
  open: { label: 'Ochiq', icon: FileText },
}

function TypeBadge({ type }) {
  const config = TYPE_LABELS[type] || TYPE_LABELS.quiz
  const Icon = config.icon

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

function GeneratedTestPreview({
  lessonId = 'l2',
  questionList = [],
  difficulty,
  requestedQuestionCount,
  generationMode,
  onEdit,
  onContinue,
}) {
  if (!questionList.length) {
    return <EmptyState text="Savollar yaratilmagan. AI generatsiyasi tugagandan keyin ko‘rish mumkin." />
  }

  return (
    <AppCard className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Test preview</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">Yaratilgan test</h2>
        </div>
        <div className="text-sm text-gray-500">
          <p>Lesson: {lessonId}</p>
          <p>{questionList.length} ta savol / {requestedQuestionCount ?? questionList.length} ta so‘ralgan</p>
          {difficulty && <p>Tanlangan qiyinlik: {DIFFICULTY_LABELS[difficulty] || difficulty}</p>}
          {generationMode === 'mock' && <p className="font-medium text-amber-700">Statik demo namunasi — AI emas</p>}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {questionList.map((question, index) => (
          <div key={question.id || `${question.type}-${index}`} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-500">Savol {index + 1}</span>
              <TypeBadge type={question.type} />
            </div>
            <p className="mt-3 text-base font-medium text-gray-900">{question.questionText}</p>

            {question.type === 'quiz' && question.answerOptions && (
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {question.answerOptions.map((option, optionIndex) => (
                  <li
                    key={`${question.id}-option-${optionIndex}`}
                    className={`rounded-lg border px-3 py-2 ${
                      optionIndex === question.correctOptionIndex
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}

            {question.type === 'true_false' && (
              <div className="mt-3 flex gap-3 text-sm text-gray-600">
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                  {question.correctAnswer ? 'True' : 'False'}
                </span>
              </div>
            )}

            {question.type === 'code' && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                {question.starterCode || 'function Example() {\n  return null\n}'}
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <PencilLine className="h-4 w-4" />
          Tahrirlash
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Qabul qilish va davom etish
        </button>
      </div>
    </AppCard>
  )
}

export default GeneratedTestPreview
