import { CheckCircle2, XCircle } from 'lucide-react'
import EmptyState from '../shared/EmptyState'

const HIGH_SCORE_THRESHOLD = 90
const LOW_SCORE_THRESHOLD = 60

function getScoreColorClass(score) {
  if (score >= HIGH_SCORE_THRESHOLD) return 'text-green-600'
  if (score < LOW_SCORE_THRESHOLD) return 'text-red-600'
  return 'text-gray-900'
}

function TestHistoryRow({ test }) {
  const scoreColorClass = test.attended ? getScoreColorClass(test.score) : 'text-gray-400'
  return (
    <tr className="border-t border-gray-100">
      <td className="px-4 py-3 font-medium text-gray-900">{test.testName}</td>
      <td className="px-4 py-3 text-gray-600">{new Date(test.date).toLocaleDateString('uz-UZ')}</td>
      <td className={`px-4 py-3 font-semibold ${scoreColorClass}`}>{test.attended ? `${test.score}/100` : '—'}</td>
      <td className={`px-4 py-3 font-semibold ${scoreColorClass}`}>{test.attended ? `${test.percentage}%` : '—'}</td>
      <td className="px-4 py-3">
        {test.attended ? (
          <span className="inline-flex items-center gap-1 text-green-600"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />Qatnashdi</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-red-600"><XCircle className="h-4 w-4" aria-hidden="true" />Qatnashmadi</span>
        )}
      </td>
    </tr>
  )
}

function StudentTestHistoryTable({ testList }) {
  if (testList.length === 0) return <EmptyState text="Hali test natijalari yo'q" />
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Test nomi</th>
            <th className="px-4 py-3">Sana</th>
            <th className="px-4 py-3">Ball</th>
            <th className="px-4 py-3">Foiz</th>
            <th className="px-4 py-3">Holat</th>
          </tr>
        </thead>
        <tbody>
          {testList.map((test) => <TestHistoryRow key={test.id} test={test} />)}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTestHistoryTable
