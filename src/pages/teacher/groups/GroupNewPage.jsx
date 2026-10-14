import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import GroupForm from '../../../components/groups/GroupForm'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import useGroupCreate from '../../../hooks/groups/useGroupCreate'
import { ROUTES } from '../../../constants/routes'

function GroupNewPage() {
  const navigate = useNavigate()
  const { createGroup, isCreating, createError } = useGroupCreate()

  async function handleGroupCreate(groupInput) {
    const newGroup = await createGroup(groupInput)
    if (newGroup) {
      navigate(ROUTES.TEACHER_GROUP.replace(':groupId', newGroup.id), { replace: true })
    }
  }

  return (
    <GroupPageLayout>
      <header className="flex flex-col gap-2">
        <Link
          to={ROUTES.TEACHER_GROUPS}
          className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Guruhlar ro'yxati
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Yangi guruh</h1>
        <p className="text-base text-gray-600">
          Guruh yarating — taklif kodi avtomatik generatsiya qilinadi
        </p>
      </header>

      {createError && <AppErrorMessage message={createError} />}

      <GroupForm onSubmit={handleGroupCreate} isSubmitting={isCreating} />
    </GroupPageLayout>
  )
}

export default GroupNewPage
