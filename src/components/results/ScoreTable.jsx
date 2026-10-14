import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AppCard from '../shared/AppCard'
import EmptyState from '../shared/EmptyState'
import { ROUTES } from '../../constants/routes'

const HIGH_SCORE_THRESHOLD = 90
const LOW_SCORE_THRESHOLD = 60

function getScoreColorClass(score) {
  if (score >= HIGH_SCORE_THRESHOLD) return 'text-green-600'
  if (score < LOW_SCORE_THRESHOLD) return 'text-red-600'
  return 'text-gray-900'
}

function SortIcon({ isActive, sortDirection }) {
  if (!isActive) return <ArrowUpDown className="w-4 h-4" />
  return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
}

function SortHeaderCell({ label, field, sortField, sortDirection, onSort }) {
  const isActive = sortField === field
  return (
    <th className="px-3 py-2 font-medium">
      <button
        type="button"
        onClick={() => onSort(field)}
        aria-label={`${label} bo'yicha saralash`}
        className="flex items-center gap-1 transition-colors duration-150 hover:text-gray-900"
      >
        {label}
        <SortIcon isActive={isActive} sortDirection={sortDirection} />
      </button>
    </th>
  )
}

function ScoreRow({ scoreItem, onStudentSelect }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="px-3 py-3 text-gray-600">{scoreItem.rank}</td>
      <td className="px-3 py-3">
        <button
          type="button"
          onClick={() => onStudentSelect(scoreItem.id)}
          className="text-blue-600 transition-colors duration-150 hover:text-blue-700"
        >
          {scoreItem.name}
        </button>
      </td>
      <td className={`px-3 py-3 font-semibold ${getScoreColorClass(scoreItem.score)}`}>{scoreItem.score}</td>
      <td className="px-3 py-3 text-gray-600">{scoreItem.percentage}%</td>
      <td className="px-3 py-3 text-gray-600">{scoreItem.correct}/{scoreItem.total}</td>
      <td className="px-3 py-3 text-gray-600">{scoreItem.durationMinutes} daqiqa</td>
    </tr>
  )
}

function ScoreTable({ sortedScoreList, sortField, sortDirection, onSort }) {
  const navigate = useNavigate()

  if (!sortedScoreList || sortedScoreList.length === 0) {
    return <EmptyState text="Ball natijalari hali yo'q." />
  }

  const handleStudentSelect = (studentId) => {
    navigate(ROUTES.STUDENT_ANALYTICS.replace(':studentId', studentId))
  }
  const sortProps = { sortField, sortDirection, onSort }

  return (
    <AppCard>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Ballar</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-3 py-2 font-medium">#</th>
              <SortHeaderCell label="Ism" field="name" {...sortProps} />
              <SortHeaderCell label="Ball" field="score" {...sortProps} />
              <SortHeaderCell label="%" field="percentage" {...sortProps} />
              <th className="px-3 py-2 font-medium">To'g'ri/Jami</th>
              <th className="px-3 py-2 font-medium">Davomiyligi</th>
            </tr>
          </thead>
          <tbody>
            {sortedScoreList.map((scoreItem) => (
              <ScoreRow key={scoreItem.id} scoreItem={scoreItem} onStudentSelect={handleStudentSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </AppCard>
  )
}

export default ScoreTable
