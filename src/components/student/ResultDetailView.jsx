import { Check, X } from 'lucide-react'
import AppCard from '../shared/AppCard'
import EmptyState from '../shared/EmptyState'

function formatResultDate(dateText) {
  return dateText.split('-').reverse().join('.')
}

function QuestionResultItem({ question, questionNumber }) {
  const { isCorrect } = question
  const StatusIcon = isCorrect ? Check : X
  const itemColorClass = isCorrect ? 'bg-green-50' : 'bg-red-50'
  const iconColorClass = isCorrect ? 'text-green-600' : 'text-red-600'

  return (
    <li className={`flex gap-3 rounded-lg p-4 ${itemColorClass}`}>
      <StatusIcon
        className={`w-5 h-5 shrink-0 ${iconColorClass}`}
        role="img"
        aria-label={isCorrect ? 'To\'g\'ri' : 'Noto\'g\'ri'}
      />
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-gray-900">
          {questionNumber}. {question.text}
        </p>
        <p className="text-sm text-gray-600">
          Mening javobim:{' '}
          <span className="font-medium text-gray-900">{question.myAnswer}</span>
        </p>
        <p className="text-sm text-gray-600">
          To'g'ri javob:{' '}
          <span className="font-medium text-gray-900">{question.correctAnswer}</span>
        </p>
      </div>
    </li>
  )
}

function ResultScoreBlock({ resultDetail }) {
  if (!resultDetail.attended) {
    return (
      <AppCard>
        <p className="text-center text-lg font-semibold text-red-600">
          Siz bu testda qatnashmadingiz
        </p>
      </AppCard>
    )
  }

  return (
    <AppCard>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-4xl font-bold text-gray-900">{resultDetail.score}</p>
        <p className="text-lg font-semibold text-blue-600">
          {resultDetail.percentage}%
        </p>
      </div>
    </AppCard>
  )
}

function QuestionResultSection({ resultDetail, questionList }) {
  if (!resultDetail.attended) return null
  if (questionList.length === 0) return <EmptyState text="Savollar topilmadi" />

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Savollar bo'yicha</h2>
      <ul className="flex flex-col gap-3">
        {questionList.map((question, questionIndex) => (
          <QuestionResultItem
            key={question.id}
            question={question}
            questionNumber={questionIndex + 1}
          />
        ))}
      </ul>
    </section>
  )
}

function ResultDetailView({ resultDetail, questionList }) {
  if (!resultDetail) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{resultDetail.testName}</h1>
        <p className="text-sm text-gray-600">
          {resultDetail.groupName} · {formatResultDate(resultDetail.date)}
        </p>
      </div>
      <ResultScoreBlock resultDetail={resultDetail} />
      <QuestionResultSection
        resultDetail={resultDetail}
        questionList={questionList}
      />
    </div>
  )
}

export default ResultDetailView
