import { useNavigate } from 'react-router-dom'
import { Plus, Users } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import PageHeader from '../../../components/shared/PageHeader'
import GroupCard from '../../../components/groups/GroupCard'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import useGroupList from '../../../hooks/groups/useGroupList'
import { ROUTES } from '../../../constants/routes'

function GroupGrid({ groupList, onView }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groupList.map((group) => (
        <GroupCard key={group.id} group={group} onView={onView} />
      ))}
    </div>
  )
}

function GroupsPage() {
  const navigate = useNavigate()
  const { groupList, isLoading, loadError } = useGroupList()
  const hasGroups = groupList.length > 0
  const isContentReady = !isLoading && !loadError

  function handleGroupOpen(groupId) {
    navigate(ROUTES.TEACHER_GROUP.replace(':groupId', groupId))
  }

  function handleGroupNewClick() {
    navigate(ROUTES.TEACHER_GROUP_NEW)
  }

  return (
    <GroupPageLayout>
      <PageHeader
        title="Guruhlar"
        subtitle="Barcha o'quvchi guruhlaringiz"
        action={
          <AppButton
            label={<><Plus className="h-4 w-4" aria-hidden="true" />Yangi guruh</>}
            onClick={handleGroupNewClick}
            className="w-full sm:w-auto"
          />
        }
      />

      {isLoading && (
        <div className="flex justify-center py-12">
          <AppSpinner size="lg" label="Guruhlar yuklanmoqda" />
        </div>
      )}

      {loadError && <AppErrorMessage message={loadError} />}

      {isContentReady && !hasGroups && (
        <EmptyState text="Hali guruh yaratilmagan" icon={Users} />
      )}

      {isContentReady && hasGroups && (
        <GroupGrid groupList={groupList} onView={handleGroupOpen} />
      )}
    </GroupPageLayout>
  )
}

export default GroupsPage
