import AppBadge from '../shared/AppBadge'
import AppCard from '../shared/AppCard'

const DEMO_ANSWER_STATS = {
  answered: 15,
  unanswered: 7,
  options: [
    { label: 'A', percentage: 20, tone: 'accent-red-500' },
    { label: 'B', percentage: 40, tone: 'accent-blue-600' },
    { label: 'C', percentage: 27, tone: 'accent-green-500' },
    { label: 'D', percentage: 13, tone: 'accent-yellow-500' },
  ],
}

function AnswerOption({ option }) {
  return (
    <div className="rounded-lg border border-gray-100 p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-gray-100 text-sm font-bold text-gray-700">{option.label}</span>
        <span className="text-sm font-semibold text-gray-800">{option.percentage}%</span>
      </div>
      <progress aria-label={`Demo ${option.label} varianti: ${option.percentage}%`} className={`h-2 w-full overflow-hidden rounded-full ${option.tone}`} max="100" value={option.percentage} />
    </div>
  )
}

function AnswerCounts() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 pt-4 text-sm">
      <p className="text-gray-600">Javob berdi: <strong className="text-gray-900">{DEMO_ANSWER_STATS.answered}</strong></p>
      <p className="text-gray-600">Javob kutilmoqda: <strong className="text-gray-900">{DEMO_ANSWER_STATS.unanswered}</strong></p>
    </div>
  )
}

function QuestionStatsPanel() {
  return (
    <AppCard>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="text-xl font-semibold text-gray-900">Joriy savol javoblari</h2><p className="mt-1 text-sm text-gray-500">Variantlar bo‘yicha taqsimot</p></div>
        <AppBadge label="DEMO · namunaviy ma’lumot" variant="warning" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">{DEMO_ANSWER_STATS.options.map((option) => <AnswerOption key={option.label} option={option} />)}</div>
      <AnswerCounts />
      <p className="mt-2 text-xs text-gray-400">Bu ko‘rsatkichlar faqat namuna, haqiqiy javoblar statistikasi emas.</p>
    </AppCard>
  )
}

export default QuestionStatsPanel
