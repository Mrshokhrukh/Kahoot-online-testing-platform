import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Users } from 'lucide-react'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppLayout from '../../../components/shared/AppLayout'
import AppSidebar from '../../../components/shared/AppSidebar'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import PageHeader from '../../../components/shared/PageHeader'
import MembersFilterBar from '../../../components/members/MembersFilterBar'
import RemoveStudentModal from '../../../components/members/RemoveStudentModal'
import StudentCard from '../../../components/members/StudentCard'
import useMemberList from '../../../hooks/members/useMemberList'
import { ROUTES } from '../../../constants/routes'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function MemberGrid({ filteredList, hasMembers, onView, onRemove }) {
  if (!hasMembers) return <EmptyState text="Guruhda hali o'quvchi yo'q" icon={Users} />
  if (filteredList.length === 0) return <EmptyState text="Qidiruv bo'yicha o'quvchi topilmadi" icon={Users} />
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredList.map((student) => (
        <StudentCard key={student.id} student={student} onView={onView} onRemove={onRemove} />
      ))}
    </div>
  )
}

function MembersPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [studentToRemove, setStudentToRemove] = useState(null)
  const members = useMemberList(groupId)
  const isContentReady = !members.isLoading && !members.loadError

  function handleStudentView(studentId) {
    navigate(`${ROUTES.TEACHER_MEMBERS.replace(':groupId', groupId)}/${studentId}`)
  }

  function handleStudentRemoveConfirm(studentId) {
    members.removeMember(studentId)
    setStudentToRemove(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar navItems={TEACHER_NAV_ITEMS} activeRoute={ROUTES.TEACHER_GROUPS} onNavigate={navigate} />
      <AppLayout>
        <div className="flex flex-col gap-6">
          <PageHeader title={`O'quvchilar — ${members.groupName}`} subtitle={`Jami: ${members.memberList.length} ta o'quvchi`} />
          {members.isLoading && <div className="flex justify-center py-12"><AppSpinner size="lg" /></div>}
          {members.loadError && <AppErrorMessage message={members.loadError} />}
          {isContentReady && (
            <>
              <MembersFilterBar searchQuery={members.searchQuery} onSearchChange={members.setSearchQuery} sortField={members.sortField} onSortChange={members.sortBy} />
              <MemberGrid filteredList={members.filteredList} hasMembers={members.memberList.length > 0} onView={handleStudentView} onRemove={setStudentToRemove} />
            </>
          )}
        </div>
      </AppLayout>
      <RemoveStudentModal student={studentToRemove} onClose={() => setStudentToRemove(null)} onConfirm={handleStudentRemoveConfirm} />
    </div>
  )
}

export default MembersPage
