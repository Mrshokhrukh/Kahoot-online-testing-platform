import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Save, Trash2 } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppInput from '../../../components/shared/AppInput'
import AppModal from '../../../components/shared/AppModal'
import AppSpinner from '../../../components/shared/AppSpinner'
import AppTextarea from '../../../components/shared/AppTextarea'
import AppToast, { showToast } from '../../../components/shared/AppToast'
import InviteCodeDisplay from '../../../components/groups/InviteCodeDisplay'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import useGroupDetail from '../../../hooks/groups/useGroupDetail'
import { ROUTES } from '../../../constants/routes'

const MAX_GROUP_NAME_LENGTH = 50
const SAVE_SUCCESS_MESSAGE = "Guruh ma'lumotlari saqlandi"

function SettingsForm({ group, onSave }) {
  const [groupName, setGroupName] = useState(group.name)
  const [description, setDescription] = useState(group.description)
  const [nameError, setNameError] = useState(null)

  function handleFormSubmit(event) {
    event.preventDefault()
    if (!groupName.trim()) {
      setNameError('Guruh nomini kiriting')
      return
    }
    if (groupName.trim().length > MAX_GROUP_NAME_LENGTH) {
      setNameError(`Guruh nomi ${MAX_GROUP_NAME_LENGTH} belgidan oshmasligi kerak`)
      return
    }
    setNameError(null)
    onSave({ name: groupName.trim(), description: description.trim() })
  }

  return (
    <AppCard>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
        <AppInput
          label="Guruh nomi"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          errorMessage={nameError}
        />
        <AppTextarea
          label="Tavsif"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Guruh haqida qisqacha"
          rows={3}
        />
        <div className="flex justify-end">
          <AppButton
            type="submit"
            label={<><Save className="h-4 w-4" aria-hidden="true" />Saqlash</>}
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </AppCard>
  )
}

function DangerZone({ groupName, onDeleteClick }) {
  return (
    <AppCard className="border border-red-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Guruhni o'chirish</h2>
          <p className="mt-1 text-sm text-gray-600">
            Guruh, uning darslari va natijalari butunlay o'chiriladi.
          </p>
        </div>
        <AppButton
          label={<><Trash2 className="h-4 w-4" aria-hidden="true" />O'chirish</>}
          variant="danger"
          onClick={onDeleteClick}
          className="w-full shrink-0 sm:w-auto"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">O'chirilgan guruh: {groupName}</p>
    </AppCard>
  )
}

function GroupSettingsPage() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const { group, isLoading, loadError, updateGroup, deleteGroup, refreshInviteCode } =
    useGroupDetail(groupId)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const detailRoute = ROUTES.TEACHER_GROUP.replace(':groupId', groupId)

  function handleGroupSave(patchFields) {
    updateGroup(patchFields)
    showToast(SAVE_SUCCESS_MESSAGE, 'success')
    navigate(detailRoute)
  }

  function handleInviteCodeRefresh() {
    refreshInviteCode()
    showToast("Taklif kodi yangilandi", 'success')
  }

  function handleGroupDeleteConfirm() {
    deleteGroup()
    setIsDeleteModalOpen(false)
    navigate(ROUTES.TEACHER_GROUPS)
  }

  if (isLoading) {
    return (
      <GroupPageLayout>
        <div className="flex justify-center py-12">
          <AppSpinner size="lg" label="Sozlamalar yuklanmoqda" />
        </div>
      </GroupPageLayout>
    )
  }

  return (
    <GroupPageLayout>
      <header className="flex flex-col gap-2">
        <Link
          to={detailRoute}
          className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Guruh sahifasi
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Guruh sozlamalari</h1>
        <p className="text-base text-gray-600">{group?.name}</p>
      </header>

      {loadError && <AppErrorMessage message={loadError} />}

      {group && (
        <>
          <SettingsForm
            key={`${group.name}|${group.description}`}
            group={group}
            onSave={handleGroupSave}
          />

          <section className="flex flex-col gap-3">
            <InviteCodeDisplay inviteCode={group.inviteCode} />
            <AppButton
              label={<><RefreshCw className="h-4 w-4" aria-hidden="true" />Taklif kodini yangilash</>}
              variant="secondary"
              onClick={handleInviteCodeRefresh}
              className="w-full sm:w-fit"
            />
          </section>

          <DangerZone
            groupName={group.name}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
        </>
      )}

      <AppModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Guruhni o'chirish"
      >
        <p className="text-sm text-gray-600">
          {group?.name} guruhini o'chirmoqchimisiz? Bu amal qaytarib bo'lmaydi.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AppButton
            label="Bekor qilish"
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <AppButton
            label="Ha, o'chirish"
            variant="danger"
            onClick={handleGroupDeleteConfirm}
          />
        </div>
      </AppModal>

      <AppToast />
    </GroupPageLayout>
  )
}

export default GroupSettingsPage
