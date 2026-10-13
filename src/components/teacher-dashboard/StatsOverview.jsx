import { ClipboardCheck, GraduationCap, Percent, Users } from 'lucide-react'
import AppCard from '../shared/AppCard'

const TONE_CLASSES = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-500',
}

function buildStatItemList(dashboardStats) {
  return [
    {
      id: 'groupCount',
      label: 'Jami guruhlar',
      value: dashboardStats.groupCount,
      Icon: Users,
      tone: 'blue',
    },
    {
      id: 'studentCount',
      label: 'Jami o\'quvchilar',
      value: dashboardStats.studentCount,
      Icon: GraduationCap,
      tone: 'blue',
    },
    {
      id: 'testCount',
      label: 'O\'tkazilgan testlar',
      value: dashboardStats.testCount,
      Icon: ClipboardCheck,
      tone: 'green',
    },
    {
      id: 'avgComprehension',
      label: 'O\'rtacha o\'zlashtirish',
      value: `${dashboardStats.avgComprehension}%`,
      Icon: Percent,
      tone: 'yellow',
    },
  ]
}

function StatsOverview({ dashboardStats }) {
  if (!dashboardStats) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {buildStatItemList(dashboardStats).map((statItem) => {
        const StatIcon = statItem.Icon
        return (
          <AppCard key={statItem.id}>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-lg ${TONE_CLASSES[statItem.tone]}`}
              >
                <StatIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{statItem.label}</p>
                <p className="text-4xl font-bold text-gray-900">{statItem.value}</p>
              </div>
            </div>
          </AppCard>
        )
      })}
    </div>
  )
}

export default StatsOverview
