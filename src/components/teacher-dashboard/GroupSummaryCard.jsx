import { useNavigate } from 'react-router-dom'
import { CalendarDays, Users } from 'lucide-react'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import { ROUTES } from '../../constants/routes'

const GROUP_ID_PARAM = ':groupId'

function formatGroupRoute(groupId) {
  return ROUTES.TEACHER_GROUP.replace(GROUP_ID_PARAM, groupId)
}

function GroupSummaryCard({ group }) {
  const navigate = useNavigate()

  if (!group) return null

  function handleGroupOpen() {
    navigate(formatGroupRoute(group.id))
  }

  return (
    <AppCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" aria-hidden="true" />
            {group.studentCount} o'quvchi
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            So'nggi test: {group.lastTestDate}
          </p>
        </div>
        <AppButton
          label="Guruhga o'tish"
          onClick={handleGroupOpen}
        />
      </div>
    </AppCard>
  )
}

export default GroupSummaryCard
