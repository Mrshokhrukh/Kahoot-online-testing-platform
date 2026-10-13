import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import AppCard from '../shared/AppCard'

const RESULT_DETAIL_PATH = '/student/results'

function formatResultDate(dateText) {
  return dateText.split('-').reverse().join('.')
}

function ResultScore({ result }) {
  if (!result.attended) {
    return (
      <p className="flex items-center gap-1 text-sm font-medium text-red-600">
        <X className="w-4 h-4" aria-hidden="true" />
        Qatnashmadingiz
      </p>
    )
  }

  return (
    <div className="text-right">
      <p className="text-4xl font-bold text-gray-900">{result.score}</p>
      <p className="text-sm text-gray-600">{result.percentage}%</p>
    </div>
  )
}

function MyResultCard({ result }) {
  if (!result) return null

  return (
    <Link
      to={`${RESULT_DETAIL_PATH}/${result.testId}`}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
    >
      <AppCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{result.testName}</h3>
            <p className="text-sm text-gray-600">{result.groupName}</p>
            <p className="text-xs text-gray-600">{formatResultDate(result.date)}</p>
          </div>
          <ResultScore result={result} />
        </div>
      </AppCard>
    </Link>
  )
}

export default MyResultCard
