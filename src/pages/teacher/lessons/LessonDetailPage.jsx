import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, CalendarDays, Eye, Sparkles } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import LessonPageLayout from '../../../components/lessons/LessonPageLayout'
import LessonStatusBadge from '../../../components/lessons/LessonStatusBadge'
import TopicTagList from '../../../components/lessons/TopicTagList'
import useLessonDetail from '../../../hooks/lessons/useLessonDetail'
import { ROUTES } from '../../../constants/routes'

const GROUP_ID_PARAM = ':groupId'
const LESSON_ID_PARAM = ':lessonId'
const TEST_ID_PARAM = ':testId'

const TEST_ACTION_CONFIG = {
  none: { label: 'Test yaratish', icon: Sparkles, variant: 'primary' },
  scheduled: { label: 'Test ko\'rish', icon: Eye, variant: 'secondary' },
  completed: { label: 'Natijalar', icon: BarChart3, variant: 'secondary' },
}

function formatLessonDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

function getTestActionRoute(lesson) {
  if (lesson.testStatus === 'none') {
    return ROUTES.TEACHER_AI_GENERATE.replace(LESSON_ID_PARAM, lesson.id)
  }
  if (!lesson.testId) return null
  const testRoute = lesson.testStatus === 'completed' ? ROUTES.TEACHER_RESULTS : ROUTES.TEACHER_TEST_CONFIG
  return testRoute.replace(TEST_ID_PARAM, lesson.testId)
}

function LessonTestAction({ lesson }) {
  const navigate = useNavigate()
  const actionConfig = TEST_ACTION_CONFIG[lesson.testStatus]
  const actionRoute = getTestActionRoute(lesson)
  if (!actionConfig || !actionRoute) return null
  const ActionIcon = actionConfig.icon

  return (
    <AppButton
      label={<><ActionIcon className="h-4 w-4" aria-hidden="true" />{actionConfig.label}</>}
      variant={actionConfig.variant}
      onClick={() => navigate(actionRoute)}
      className="w-full sm:w-auto"
    />
  )
}

function LessonDetailContent({ lesson }) {
  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-sm font-semibold text-blue-600">{lesson.lessonNumber}-dars</p>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatLessonDate(lesson.date)}
            </span>
            <LessonStatusBadge testStatus={lesson.testStatus} />
          </div>
        </div>
        <LessonTestAction lesson={lesson} />
      </header>
      <AppCard className="flex flex-col gap-4 hover:shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Darsda o'tilgan narsalar</h2>
        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">{lesson.content}</p>
        {lesson.topics.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-600">Mavzular</h3>
            <TopicTagList topicList={lesson.topics} />
          </div>
        )}
      </AppCard>
    </>
  )
}

function LessonDetailPage() {
  const { groupId, lessonId } = useParams()
  const { lesson, isLoading, loadError } = useLessonDetail(groupId, lessonId)
  const lessonsRoute = ROUTES.TEACHER_LESSONS.replace(GROUP_ID_PARAM, groupId)

  return (
    <LessonPageLayout>
      <Link
        to={lessonsRoute}
        className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Darslar ro'yxati
      </Link>
      {isLoading && (
        <div className="flex justify-center py-12">
          <AppSpinner size="lg" label="Dars yuklanmoqda" />
        </div>
      )}
      {loadError && <AppErrorMessage message={loadError} />}
      {lesson && <LessonDetailContent lesson={lesson} />}
    </LessonPageLayout>
  )
}

export default LessonDetailPage
