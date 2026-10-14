import AppCard from '../shared/AppCard'

function buildSummaryItems(summary, totalStudents) {
  return [
    { label: 'Ishtirokchilar', value: `${summary.attended}/${totalStudents}` },
    { label: "O'rtacha ball", value: `${summary.avgScore}/100` },
    { label: "O'rtacha o'zlashtirish", value: `${summary.avgPercentage}%` },
    { label: 'Eng yuqori ball', value: `${summary.maxScore}/100` },
    { label: 'Eng past ball', value: `${summary.minScore}/100` },
  ]
}

function ResultsSummaryBar({ summary, totalStudents }) {
  if (!summary) return null
  const summaryItemList = buildSummaryItems(summary, totalStudents)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {summaryItemList.map((summaryItem) => (
        <AppCard key={summaryItem.label}>
          <p className="text-xs text-gray-400">{summaryItem.label}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{summaryItem.value}</p>
        </AppCard>
      ))}
    </div>
  )
}

export default ResultsSummaryBar
