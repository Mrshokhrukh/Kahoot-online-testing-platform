import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, Plus } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppLayout from '../../../components/shared/AppLayout'
import AppSidebar from '../../../components/shared/AppSidebar'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import LessonCard from '../../../components/lessons/LessonCard'
import useLessonList from '../../../hooks/lessons/useLessonList'
import { ROUTES } from '../../../constants/routes'

const GROUP_ID_PARAM = ':groupId'

const TEACHER_NAV_ITEMS = [
  { label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD, icon: 'dashboard' },
  { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS, icon: 'groups' },
  { label: 'Testlar', route: ROUTES.TEACHER_TESTS, icon: 'tests' },
]

function LessonListContent({ lessonList, isLoading, loadError }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <AppSpinner size="lg" label="Darslar yuklanmoqda" />
      </div>
    )
  }
  if (loadError) return <AppErrorMessage message={loadError} />
  if (lessonList.length === 0) {
    return <EmptyState text="Hali dars kiritilmagan" icon={BookOpen} />
  }

  return (
    <ol className="flex flex-col gap-4">
      {lessonList.map((lesson) => (
        <li key={lesson.id}>
          <LessonCard lesson={lesson} />
        </li>
      ))}
    </ol>
  )
}

function LessonsPage() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const { lessonList, groupName, isLoading, loadError } = useLessonList(groupId)
  const pageTitle = groupName ? `Darslar — ${groupName}` : 'Darslar'

  function handleSidebarNavigate(route) {
    navigate(route)
  }

  function handleNewLessonClick() {
    navigate(ROUTES.TEACHER_LESSON_NEW.replace(GROUP_ID_PARAM, groupId))
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-60">
      <AppSidebar
        navItems={TEACHER_NAV_ITEMS}
        activeRoute={ROUTES.TEACHER_GROUPS}
        onNavigate={handleSidebarNavigate}
      />
      <AppLayout>
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-base text-gray-600">
                O'tilgan darslar xronologik tartibda
              </p>
            </div>
            <AppButton
              label={<><Plus className="h-4 w-4" aria-hidden="true" />Yangi dars</>}
              onClick={handleNewLessonClick}
              className="w-full sm:w-auto"
            />
          </header>
          <LessonListContent
            lessonList={lessonList}
            isLoading={isLoading}
            loadError={loadError}
          />
        </div>
      </AppLayout>
    </div>
  )
}

export default LessonsPage
