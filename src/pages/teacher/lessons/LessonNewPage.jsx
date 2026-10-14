import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LessonForm from '../../../components/lessons/LessonForm'
import LessonPageLayout from '../../../components/lessons/LessonPageLayout'
import useLessonForm from '../../../hooks/lessons/useLessonForm'
import { ROUTES } from '../../../constants/routes'

const GROUP_ID_PARAM = ':groupId'

function LessonNewPage() {
  const { groupId } = useParams()
  const lessonForm = useLessonForm(groupId)
  const lessonsRoute = ROUTES.TEACHER_LESSONS.replace(GROUP_ID_PARAM, groupId)

  return (
    <LessonPageLayout>
      <header className="flex flex-col gap-2">
        <Link
          to={lessonsRoute}
          className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Darslar ro'yxati
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Yangi dars</h1>
        <p className="text-base text-gray-600">
          Darsda o'tilganlarni yozing — AI shu mazmundan test tayyorlaydi
        </p>
      </header>
      <LessonForm lessonForm={lessonForm} />
    </LessonPageLayout>
  )
}

export default LessonNewPage
