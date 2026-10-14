import AppCard from '../shared/AppCard'

function StudentStatsRow({ testCount, avgScore, attendanceRate }) {
  const statList = [
    { label: 'Jami testlar', value: testCount },
    { label: "O'rtacha ball", value: `${avgScore}/100` },
    { label: 'Ishtirok foizi', value: `${attendanceRate}%` },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statList.map((stat) => (
        <AppCard key={stat.label}>
          <p className="text-sm text-gray-600">{stat.label}</p>
          <p className="mt-1 text-4xl font-bold text-gray-900">{stat.value}</p>
        </AppCard>
      ))}
    </div>
  )
}

export default StudentStatsRow
