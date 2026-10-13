import { useNavigate } from 'react-router-dom'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import { ROUTES } from '../../constants/routes'

function QuickActions() {
  const navigate = useNavigate()

  function handleNewGroup() {
    navigate(ROUTES.TEACHER_GROUP_NEW)
  }

  function handleGroupsOpen() {
    navigate(ROUTES.TEACHER_GROUPS)
  }

  return (
    <AppCard>
      <h2 className="text-xl font-semibold text-gray-900">Tez harakatlar</h2>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <AppButton label="Yangi guruh" onClick={handleNewGroup} />
        <AppButton label="Guruhlar" variant="secondary" onClick={handleGroupsOpen} />
      </div>
    </AppCard>
  )
}

export default QuickActions
