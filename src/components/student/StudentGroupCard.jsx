import { ClipboardList, Trophy, UserRound, Users } from 'lucide-react'
import AppCard from '../shared/AppCard'

function StudentGroupCard({ group }) {
  if (!group) return null

  return (
    <AppCard>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
            <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <UserRound className="w-4 h-4" aria-hidden="true" />
              {group.teacherName}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center gap-1 text-xs text-gray-600">
              <ClipboardList className="w-4 h-4" aria-hidden="true" />
              Testlar soni
            </p>
            <p className="text-xl font-semibold text-gray-900">{group.testCount}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xs text-gray-600">
              <Trophy className="w-4 h-4" aria-hidden="true" />
              O'rtacha ball
            </p>
            <p className="text-xl font-semibold text-gray-900">{group.avgScore}</p>
          </div>
        </div>
      </div>
    </AppCard>
  )
}

export default StudentGroupCard
