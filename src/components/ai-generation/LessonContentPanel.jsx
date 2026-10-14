import { BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react'
import AppCard from '../shared/AppCard'
import { useLessonStore } from '../../store/lessonStore'

const lessonTopics = [
  'useState bilan lokal state boshqarish',
  'useEffect dependency array tamoyili',
  'Lifecycle va side effects tushunchalari',
  'Dastur holatini to‘g‘ri yangilash',
]

function LessonContentPanel({ lessonId = 'l2' }) {
  const activeLesson = useLessonStore((state) =>
    state.activeLesson?.id === lessonId ? state.activeLesson : null,
  )
  const title = activeLesson?.title || `${lessonId}: useState va useEffect`
  const content = activeLesson?.content
    || 'Dars mazmuni sessiyada topilmadi. Ko‘rsatilgan matn demo namunasidir.'
  const topics = activeLesson?.topics || lessonTopics

  return (
    <AppCard className="h-full border-blue-100 bg-blue-50/30 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Dars mazmuni</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">{title}</h2>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <BrainCircuit className="h-4 w-4 text-blue-600" />
          O‘qituvchi izohi
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">{content}</p>
        {!activeLesson && <p className="mt-3 text-xs font-medium text-amber-700">Demo mazmuni</p>}
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-gray-900">Asosiy mavzular</p>
        <ul className="mt-3 space-y-3">
          {topics.map((topic) => (
            <li key={topic} className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppCard>
  )
}

export default LessonContentPanel
