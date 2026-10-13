import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import AppButton from '../../components/shared/AppButton'
import AppCard from '../../components/shared/AppCard'
import AppLayout from '../../components/shared/AppLayout'
import JoinGroupForm from '../../components/student/JoinGroupForm'
import useJoinGroup from '../../hooks/student/useJoinGroup'

const GROUPS_PATH = '/student/groups'

function JoinSuccessMessage({ groupName, onGroupsView }) {
  return (
    <AppCard>
      <div
        className="flex flex-col items-center gap-4 text-center"
        role="status"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50">
          <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {groupName}ga qo'shildingiz!
        </h2>
        <p className="text-base text-gray-600">Guruhga o'ting →</p>
        <AppButton label="Guruhlarni ko'rish" onClick={onGroupsView} />
      </div>
    </AppCard>
  )
}

function StudentJoinPage() {
  const navigate = useNavigate()
  const { joinedGroupName, isJoining, joinError, handleGroupJoin } =
    useJoinGroup()

  function handleGroupsView() {
    navigate(GROUPS_PATH)
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Guruhga qo'shilish</h1>
          <p className="text-base text-gray-600">
            O'qituvchingiz bergan 6 belgili kodni kiriting
          </p>
        </header>
        {joinedGroupName ? (
          <JoinSuccessMessage
            groupName={joinedGroupName}
            onGroupsView={handleGroupsView}
          />
        ) : (
          <AppCard>
            <JoinGroupForm
              onGroupJoin={handleGroupJoin}
              isJoining={isJoining}
              errorMessage={joinError}
            />
          </AppCard>
        )}
      </div>
    </AppLayout>
  )
}

export default StudentJoinPage
