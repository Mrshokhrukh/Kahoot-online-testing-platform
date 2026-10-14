import { BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react'
import AppCard from '../shared/AppCard'

const lessonTopics = [
  'useState bilan lokal state boshqarish',
  'useEffect dependency array tamoyili',
  'Lifecycle va side effects tushunchalari',
  'Dastur holatini to‘g‘ri yangilash',
]

function LessonContentPanel({ lessonId = 'l2' }) {
  return (
    <AppCard className="h-full border-blue-100 bg-blue-50/30 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Dars mazmuni</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">{lessonId}: useState va useEffect</h2>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <BrainCircuit className="h-4 w-4 text-blue-600" />
          O‘qituvchi izohi
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Ushbu darsda komponent ichidagi holatni boshqarish va tashqi ta‘sirlarni kuzatish
          tushunchalari o‘rganiladi. Testda state yangilanish, effekt ishlashi va lifecycle
          kadrlari ko‘rib chiqiladi.
        </p>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-gray-900">Asosiy mavzular</p>
        <ul className="mt-3 space-y-3">
          {lessonTopics.map((topic) => (
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
