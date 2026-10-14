import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, FileText, Settings, Users } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import AppToast from '../../../components/shared/AppToast'
import PageHeader from '../../../components/shared/PageHeader'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import GroupStatsBar from '../../../components/groups/GroupStatsBar'
import InviteCodeDisplay from '../../../components/groups/InviteCodeDisplay'
import useGroupDetail from '../../../hooks/groups/useGroupDetail'
import { ROUTES } from '../../../constants/routes'

const TAB_LIST = [
  { key: 'members', label: "O'quvchilar", icon: Users, routeKey: 'TEACHER_MEMBERS' },
  { key: 'lessons', label: 'Darslar', icon: BookOpen, routeKey: 'TEACHER_LESSONS' },
  { key: 'tests', label: 'Testlar', icon: FileText, routeKey: 'TEACHER_TESTS' },
]

function GroupTabs({ groupId, onTabOpen }) {
  return (
    <nav aria-label="Guruh bo'limlari" className="flex flex-wrap gap-2">
      {TAB_LIST.map(({ key, label, icon, routeKey }) => {
        const TabIcon = icon
        return (
          <button
            key={key}
            type="button"
            onClick={() => onTabOpen(routeKey)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <TabIcon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        )
      })}
      <span className="sr-only">{groupId}</span>
    </nav>
  )
}

function GroupDetailPage() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const { group, isLoading, loadError } = useGroupDetail(groupId)

  function handleTabOpen(routeKey) {
    navigate(ROUTES[routeKey].replace(':groupId', groupId))
  }

  function handleSettingsOpen() {
    navigate(`${ROUTES.TEACHER_GROUP.replace(':groupId', groupId)}/settings`)
  }

  if (isLoading) {
    return (
      <GroupPageLayout>
        <div className="flex justify-center py-12">
          <AppSpinner size="lg" label="Guruh yuklanmoqda" />
        </div>
      </GroupPageLayout>
    )
  }

  return (
    <GroupPageLayout>
      <PageHeader
        title={group ? group.name : 'Guruh'}
        subtitle={group ? `${group.subject} · yaratilgan ${group.createdAt}` : undefined}
        action={group && (
          <AppButton
            label={<><Settings className="h-4 w-4" aria-hidden="true" />Sozlamalar</>}
            variant="secondary"
            onClick={handleSettingsOpen}
            className="w-full sm:w-auto"
          />
        )}
      />

      {loadError && <AppErrorMessage message={loadError} />}

      {group && (
        <>
          <InviteCodeDisplay inviteCode={group.inviteCode} />
          <GroupStatsBar group={group} />
          <GroupTabs groupId={groupId} onTabOpen={handleTabOpen} />
        </>
      )}

      <AppToast />
    </GroupPageLayout>
  )
}

export default GroupDetailPage
