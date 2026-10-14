import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Award, BookOpenCheck, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppSpinner from '../../../components/shared/AppSpinner'
import PageHeader from '../../../components/shared/PageHeader'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import useStudentProfile from '../../../hooks/members/useStudentProfile'
import { mockSubjectStrength } from '../../../mocks/analyticsMock'
import { mockStudentTestHistory } from '../../../mocks/membersMock'
import { ROUTES } from '../../../constants/routes'

const tooltipStyle = { contentStyle: { borderRadius: 14, borderColor: '#dcfce7' }, cursor: { fill: '#f0fdf4' } }

function StudentAnalyticsPage() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const { studentProfile, isLoading } = useStudentProfile(studentId)
  const chartData = useMemo(() => [...mockStudentTestHistory].slice(-10).map((test) => ({ testName: test.testName.replace(' testi', ''), score: test.percentage })), [])
  if (isLoading) return <GroupPageLayout><div className="flex justify-center py-12"><AppSpinner size="lg" label="O‘quvchi tahlili yuklanmoqda" /></div></GroupPageLayout>
  const name = studentProfile?.name || 'O‘quvchi'
  const score = studentProfile?.avgScore ?? 0
  return <GroupPageLayout>
    <PageHeader title="O‘quvchi tahlili" subtitle={`${name} · o‘zlashtirish dinamikasi`} action={<AppButton variant="secondary" size="sm" label={<><ArrowLeft className="h-4 w-4" />Profilga qaytish</>} onClick={() => navigate(-1)} />} />
    <div className="grid gap-4 sm:grid-cols-3"><AppCard className="border border-gray-100 p-5 shadow-sm"><p className="text-sm text-gray-500">O‘rtacha natija</p><div className="mt-2 flex items-end gap-2"><span className="text-3xl font-bold text-gray-900">{score}%</span><TrendingUp className="mb-1 h-5 w-5 text-green-600" /></div><p className="mt-2 text-xs text-green-700">Umumiy ko‘rsatkich</p></AppCard><AppCard className="border border-gray-100 p-5 shadow-sm"><p className="text-sm text-gray-500">Yechilgan testlar</p><div className="mt-2 flex items-end gap-2"><span className="text-3xl font-bold text-gray-900">{studentProfile?.testCount ?? 0}</span><BookOpenCheck className="mb-1 h-5 w-5 text-green-600" /></div><p className="mt-2 text-xs text-gray-500">Barcha topshirilgan testlar</p></AppCard><AppCard className="border border-gray-100 p-5 shadow-sm"><p className="text-sm text-gray-500">Qatnashuv</p><div className="mt-2 flex items-end gap-2"><span className="text-3xl font-bold text-gray-900">{studentProfile?.attendanceRate ?? 0}%</span><Award className="mb-1 h-5 w-5 text-green-600" /></div><p className="mt-2 text-xs text-gray-500">Dars va testlardagi faollik</p></AppCard></div>
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <AppCard className="border border-gray-100 shadow-sm"><div className="mb-5"><h2 className="font-semibold text-gray-900">O‘zlashtirish dinamikasi</h2><p className="mt-1 text-sm text-gray-500">Oxirgi test natijalari bo‘yicha</p></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="studentFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16a34a" stopOpacity={0.22} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid stroke="#eef2f0" vertical={false} /><XAxis dataKey="testName" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><Tooltip {...tooltipStyle} formatter={(value) => [`${value}%`, 'Natija']} /><Area type="monotone" dataKey="score" stroke="#15803d" strokeWidth={3} fill="url(#studentFill)" activeDot={{ r: 6, strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div></AppCard>
      <AppCard className="border border-gray-100 shadow-sm"><div className="mb-5"><h2 className="font-semibold text-gray-900">Kuchli va rivojlantiriladigan mavzular</h2><p className="mt-1 text-sm text-gray-500">Mavzular bo‘yicha o‘zlashtirish</p></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={mockSubjectStrength} layout="vertical" margin={{ top: 4, right: 20, left: 12, bottom: 4 }}><CartesianGrid stroke="#eef2f0" horizontal={false} /><XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis type="category" dataKey="subject" width={100} tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 12 }} /><Tooltip {...tooltipStyle} formatter={(value) => [`${value}%`, 'O‘zlashtirish']} /><Line type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={3} dot={{ r: 5, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div></AppCard>
    </div>
    <AppCard className="border border-gray-100 p-0 shadow-sm"><div className="border-b border-gray-100 px-5 py-4"><h2 className="font-semibold text-gray-900">So‘nggi testlar</h2><p className="mt-1 text-sm text-gray-500">Oxirgi 10 ta urinish</p></div><div className="divide-y divide-gray-100">{chartData.slice(-10).reverse().map((item) => <div key={item.testName} className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-green-50/60"><span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{item.testName}</span><div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100 sm:w-40"><div className="h-full rounded-full bg-green-600" style={{ width: `${item.score}%` }} /></div><span className="w-12 text-right text-sm font-bold text-gray-900">{item.score}%</span></div>)}</div></AppCard>
  </GroupPageLayout>
}

export default StudentAnalyticsPage
