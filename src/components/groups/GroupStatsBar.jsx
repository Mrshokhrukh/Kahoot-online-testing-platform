import { FileText, TrendingUp, Users } from 'lucide-react'
import AppCard from '../shared/AppCard'

function buildStatList(group) {
  return [
    { key: 'students', label: "O'quvchilar", value: group.studentCount, icon: Users, tileClass: 'bg-blue-50 text-blue-600' },
    { key: 'tests', label: 'Testlar', value: group.testCount, icon: FileText, tileClass: 'bg-yellow-50 text-yellow-500' },
    { key: 'avgScore', label: "O'rtacha ball", value: group.avgScore, icon: TrendingUp, tileClass: 'bg-green-50 text-green-600' },
  ]
}

function StatTile({ label, value, icon, tileClass }) {
  const TileIcon = icon
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${tileClass}`}>
        <TileIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function GroupStatsBar({ group }) {
  if (!group) return null

  return (
    <AppCard>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {buildStatList(group).map((stat) => (
          <StatTile key={stat.key} {...stat} />
        ))}
      </div>
    </AppCard>
  )
}

export default GroupStatsBar
