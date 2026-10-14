import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarClock, Check, Clock3, FileQuestion, LockKeyhole } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppInput from '../../../components/shared/AppInput'
import AppToast, { showToast } from '../../../components/shared/AppToast'
import PageHeader from '../../../components/shared/PageHeader'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import ScheduleTimePicker from '../../../components/test-management/ScheduleTimePicker'
import TestTypeSelector from '../../../components/test-management/TestTypeSelector'
import { mockTestList } from '../../../mocks/testsMock'
import { useTestStore } from '../../../store/testStore'
import { ROUTES } from '../../../constants/routes'

const DEFAULT_TYPES = { quiz: 60, trueFalse: 20, code: 20 }
const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function TestConfigForm({ testId }) {
  const navigate = useNavigate()
  const testList = useTestStore((state) => state.testList)
  const setTestList = useTestStore((state) => state.setTestList)
  const updateTest = useTestStore((state) => state.updateTest)
  const test = testList.find((item) => item.id === testId) || mockTestList.find((item) => item.id === testId)
  const [questionCount, setQuestionCount] = useState(test?.questionCount || 20)
  const [duration, setDuration] = useState(test?.durationMinutes || 30)
  const initialDate = test?.scheduledAt?.slice(0, 10) || today()
  const [date, setDate] = useState(initialDate < today() ? today() : initialDate)
  const [time, setTime] = useState(test?.scheduledAt?.slice(11, 16) || '18:00')
  const [types, setTypes] = useState(test?.typeRatios || DEFAULT_TYPES)
  const [error, setError] = useState('')
  const isReadOnly = ['active', 'completed'].includes(test?.status)
  const typeTotal = useMemo(() => Object.values(types).reduce((sum, value) => sum + (Number(value) || 0), 0), [types])

  useEffect(() => {
    if (testList.length === 0) setTestList(mockTestList)
  }, [setTestList, testList.length])

  if (!test) return <GroupPageLayout activeRoute={ROUTES.TEACHER_TESTS}><AppErrorMessage message="Test topilmadi. Testlar ro'yxatiga qayting." /></GroupPageLayout>

  function handleSave(event) {
    event.preventDefault()
    if (Number(questionCount) < 1 || Number(questionCount) > 100) return setError('Savollar soni 1 dan 100 gacha bo‘lishi kerak.')
    if (Number(duration) < 1 || Number(duration) > 300) return setError('Davomiylik 1 dan 300 daqiqagacha bo‘lishi kerak.')
    if (typeTotal !== 100) return setError('Savol turlari ulushi jami 100% bo‘lishi kerak.')
    if (!date || !time) return setError('Test sanasi va boshlanish vaqtini belgilang.')
    const scheduledAt = `${date}T${time}:00`
    if (new Date(scheduledAt) <= new Date()) return setError('Kelajakdagi sana va vaqtni tanlang.')
    updateTest(testId, { questionCount: Number(questionCount), durationMinutes: Number(duration), scheduledAt, typeRatios: types, status: 'scheduled' })
    setError('')
    showToast('Test sozlamalari saqlandi.', 'success')
    navigate(ROUTES.TEACHER_TESTS)
  }

  return <GroupPageLayout activeRoute={ROUTES.TEACHER_TESTS}>
    <PageHeader title="Test sozlamalari" subtitle={`${test.name} · ${test.groupName}`} action={<AppButton variant="ghost" size="sm" label={<><ArrowLeft className="h-4 w-4" />Testlarga qaytish</>} onClick={() => navigate(ROUTES.TEACHER_TESTS)} />} />
    {isReadOnly && <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" /><p>Test {test.status === 'active' ? 'boshlangan' : 'yakunlangan'}; sozlamalar faqat ko‘rish uchun ochiq.</p></div>}
    <form onSubmit={handleSave} className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
      <AppCard className="space-y-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-50 text-green-700"><FileQuestion className="h-5 w-5" /></span><div><h2 className="font-semibold text-gray-900">Test tarkibi</h2><p className="text-sm text-gray-500">Savollar soni va test davomiyligi</p></div></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AppInput label="Savollar soni" type="number" min="1" max="100" value={questionCount} onChange={(event) => setQuestionCount(event.target.value)} disabled={isReadOnly} />
          <AppInput label="Davomiyligi (daqiqa)" type="number" min="1" max="300" value={duration} onChange={(event) => setDuration(event.target.value)} disabled={isReadOnly} />
        </div>
        <div className="border-t border-gray-100 pt-5"><TestTypeSelector value={types} onChange={setTypes} disabled={isReadOnly} /></div>
      </AppCard>
      <div className="space-y-5">
        <AppCard className="space-y-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-50 text-green-700"><CalendarClock className="h-5 w-5" /></span><div><h2 className="font-semibold text-gray-900">Jadval</h2><p className="text-sm text-gray-500">Boshlanish vaqti va sanasi</p></div></div>
          <ScheduleTimePicker date={date} time={time} onDateChange={setDate} onTimeChange={setTime} disabled={isReadOnly} />
          <p className="flex items-center gap-2 text-xs text-gray-500"><Clock3 className="h-4 w-4" />Barcha vaqtlar Toshkent vaqti bilan ko‘rsatiladi.</p>
        </AppCard>
        {error && <AppErrorMessage message={error} />}
        {!isReadOnly && <AppButton type="submit" className="w-full" label={<><Check className="h-4 w-4" />Saqlash va rejalashtirish</>} />}
      </div>
    </form>
    <AppToast />
  </GroupPageLayout>
}

function TestConfigPage() {
  const { testId } = useParams()
  return <TestConfigForm key={testId} testId={testId} />
}

export default TestConfigPage
