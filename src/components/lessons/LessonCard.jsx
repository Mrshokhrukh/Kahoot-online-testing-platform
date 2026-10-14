import { Link } from 'react-router-dom'
import { CalendarDays, ChevronRight } from 'lucide-react'
import AppCard from '../shared/AppCard'
import LessonStatusBadge from './LessonStatusBadge'
import TopicTagList from './TopicTagList'
import { ROUTES } from '../../constants/routes'

const GROUP_ID_PARAM = ':groupId'
const LESSON_ID_PARAM = ':lessonId'

function formatLessonDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

function LessonCard({ lesson }) {
  if (!lesson) return null

  const lessonRoute = ROUTES.TEACHER_LESSON
    .replace(GROUP_ID_PARAM, lesson.groupId)
    .replace(LESSON_ID_PARAM, lesson.id)

  return (
    <Link
      to={lessonRoute}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
    >
      <AppCard className="hover:border-blue-200">
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
            {lesson.lessonNumber}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                {lesson.title}
              </h3>
              <LessonStatusBadge testStatus={lesson.testStatus} className="w-fit" />
            </div>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatLessonDate(lesson.date)}
            </p>
            <TopicTagList topicList={lesson.topics} />
          </div>
          <ChevronRight className="mt-2 hidden h-5 w-5 shrink-0 text-gray-400 sm:block" aria-hidden="true" />
        </div>
      </AppCard>
    </Link>
  )
}

export default LessonCard
