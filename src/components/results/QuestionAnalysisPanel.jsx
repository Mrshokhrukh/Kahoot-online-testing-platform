import AppBadge from '../shared/AppBadge'
import AppCard from '../shared/AppCard'
import EmptyState from '../shared/EmptyState'

const PROGRESS_BASE_CLASS =
  'w-full h-2 appearance-none overflow-hidden rounded-full bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200'
const PROGRESS_NORMAL_CLASS = '[&::-webkit-progress-value]:bg-blue-600 [&::-moz-progress-bar]:bg-blue-600'
const PROGRESS_HARDEST_CLASS = '[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500'

function findHardestQuestionNumber(questionAnalysis) {
  const hardestQuestion = questionAnalysis.reduce((hardest, current) =>
    current.correctRate < hardest.correctRate ? current : hardest,
  )
  return hardestQuestion.questionNumber
}

function QuestionRow({ question, isHardest }) {
  const progressClass = `${PROGRESS_BASE_CLASS} ${isHardest ? PROGRESS_HARDEST_CLASS : PROGRESS_NORMAL_CLASS}`
  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-base text-gray-900">
          {question.questionNumber}. {question.questionText}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {isHardest && <AppBadge variant="danger">Eng qiyin savol</AppBadge>}
          <span className="text-sm font-semibold text-gray-600">{question.correctRate}%</span>
        </div>
      </div>
      <progress
        className={progressClass}
        value={question.correctRate}
        max={100}
        aria-label={`${question.questionNumber}-savol to'g'ri javob foizi`}
      />
    </li>
  )
}

function QuestionAnalysisPanel({ questionAnalysis }) {
  if (!questionAnalysis || questionAnalysis.length === 0) {
    return <EmptyState text="Savollar tahlili hali yo'q." />
  }
  const hardestQuestionNumber = findHardestQuestionNumber(questionAnalysis)

  return (
    <AppCard>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Savollar tahlili</h2>
      <ul className="flex flex-col gap-4">
        {questionAnalysis.map((question) => (
          <QuestionRow
            key={question.questionNumber}
            question={question}
            isHardest={question.questionNumber === hardestQuestionNumber}
          />
        ))}
      </ul>
    </AppCard>
  )
}

export default QuestionAnalysisPanel
