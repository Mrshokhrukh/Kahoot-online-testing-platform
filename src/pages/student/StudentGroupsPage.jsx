import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import AppButton from '../../components/shared/AppButton'
import AppErrorMessage from '../../components/shared/AppErrorMessage'
import AppLayout from '../../components/shared/AppLayout'
import AppSpinner from '../../components/shared/AppSpinner'
import EmptyState from '../../components/shared/EmptyState'
import StudentGroupCard from '../../components/student/StudentGroupCard'
import useStudentDashboard from '../../hooks/student/useStudentDashboard'

const JOIN_PATH = '/student/join'

function GroupListBody({ groupList, isLoading, loadError }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <AppSpinner size="lg" />
      </div>
    )
  }
  if (loadError) return <AppErrorMessage message={loadError} />
  if (groupList.length === 0) {
    return <EmptyState text="Siz hali hech qaysi guruhga qo'shilmagansiz" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groupList.map((group) => (
        <StudentGroupCard key={group.id} group={group} />
      ))}
    </div>
  )
}

function StudentGroupsPage() {
  const navigate = useNavigate()
  const { groupList, isLoading, loadError } = useStudentDashboard()

  function handleJoinNavigate() {
    navigate(JOIN_PATH)
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Mening guruhlarim</h1>
          <AppButton
            label={
              <>
                <Plus className="w-5 h-5" aria-hidden="true" />
                Guruhga qo'shilish
              </>
            }
            onClick={handleJoinNavigate}
          />
        </header>
        <GroupListBody
          groupList={groupList}
          isLoading={isLoading}
          loadError={loadError}
        />
      </div>
    </AppLayout>
  )
}

export default StudentGroupsPage
