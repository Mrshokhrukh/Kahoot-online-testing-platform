import { ClipboardCheck, Trophy, Users } from 'lucide-react'
import AppCard from '../shared/AppCard'

function buildStatItemList(studentStats) {
  return [
    {
      id: 'groupCount',
      label: 'Guruhlar',
      value: studentStats.groupCount,
      Icon: Users,
    },
    {
      id: 'completedTestCount',
      label: 'O\'tkazilgan testlar',
      value: studentStats.completedTestCount,
      Icon: ClipboardCheck,
    },
    {
      id: 'avgScore',
      label: 'O\'rtacha ball',
      value: studentStats.avgScore,
      Icon: Trophy,
    },
  ]
}

function StudentStatsBar({ studentStats }) {
  if (!studentStats) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {buildStatItemList(studentStats).map((item) => {
        const Icon = item.Icon

        return (
          <AppCard key={item.id}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50">
                <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-4xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </AppCard>
        )
      })}
    </div>
  )
}

export default StudentStatsBar
