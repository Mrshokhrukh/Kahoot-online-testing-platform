import { createElement, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, CircleCheck, Trophy, Users } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import PageHeader from '../../../components/shared/PageHeader'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import useGroupAnalytics, { FILTER_RANGE_ALL, FILTER_RANGE_LAST_7_DAYS, FILTER_RANGE_LAST_30_DAYS } from '../../../hooks/analytics/useGroupAnalytics'
import { mockAttendanceData, mockTopPerformers } from '../../../mocks/analyticsMock'
import { mockGroupNameById } from '../../../mocks/membersMock'
import { ROUTES } from '../../../constants/routes'

const PERIODS = [{ value: FILTER_RANGE_LAST_7_DAYS, label: '7 kun' }, { value: FILTER_RANGE_LAST_30_DAYS, label: '30 kun' }, { value: FILTER_RANGE_ALL, label: 'Barcha vaqt' }]
const PIE_COLORS = ['#16a34a', '#e2e8f0']
const chartTooltip = { contentStyle: { borderRadius: 14, borderColor: '#dcfce7' }, cursor: { fill: '#f0fdf4' } }

function Metric({ icon: Icon, label, value, note }) {
  return <AppCard className="border border-gray-100 p-5 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{value}</p><p className="mt-1 text-xs text-green-700">{note}</p></div><span className="grid h-10 w-10 place-items-center rounded-2xl bg-green-50 text-green-700">{createElement(Icon, { className: 'h-5 w-5' })}</span></div></AppCard>
}

function GroupAnalyticsPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { progressList, studentComparisonList, dateRange, handleDateRangeChange, isLoading, loadError } = useGroupAnalytics(groupId)
  const average = useMemo(() => studentComparisonList.length ? Math.round(studentComparisonList.reduce((sum, item) => sum + item.avgScore, 0) / studentComparisonList.length) : 0, [studentComparisonList])
  return <GroupPageLayout>
    <PageHeader title="Guruh tahlili" subtitle={`${mockGroupNameById[groupId] || 'O‘quv guruhi'} · natijalar va qatnashuv`} action={<AppButton variant="secondary" size="sm" label={<><ArrowLeft className="h-4 w-4" />Guruhga qaytish</>} onClick={() => navigate(ROUTES.TEACHER_GROUP.replace(':groupId', groupId))} />} />
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"><CalendarDays className="ml-1 h-4 w-4 text-green-700" />{PERIODS.map((period) => <button key={period.value} type="button" onClick={() => handleDateRangeChange(period.value)} className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${dateRange === period.value ? 'bg-green-700 text-white shadow-md shadow-green-900/15' : 'text-gray-600 hover:bg-green-50 hover:text-green-800'}`}>{period.label}</button>)}</div>
    {isLoading && <div className="flex justify-center py-10"><AppSpinner size="lg" label="Tahlil yuklanmoqda" /></div>}
    {loadError && <AppErrorMessage message={loadError} />}
    {!isLoading && !loadError && <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Users} label="O‘quvchilar" value="22" note="Guruhdagi jami a’zolar" /><Metric icon={CircleCheck} label="Qatnashuv" value="82%" note="Oxirgi testlar bo‘yicha" /><Metric icon={Trophy} label="O‘rtacha natija" value={`${average}%`} note="Guruhning umumiy ko‘rsatkichi" /><Metric icon={CalendarDays} label="Testlar" value={progressList.length || 4} note="Tanlangan davrda" /></div>
      <div className="grid gap-5 xl:grid-cols-2">
        <AppCard className="border border-gray-100 shadow-sm"><div className="mb-5"><h2 className="font-semibold text-gray-900">Guruh natijalarining o‘sishi</h2><p className="mt-1 text-sm text-gray-500">Testlar bo‘yicha o‘rtancha ball</p></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={progressList} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16a34a" stopOpacity={0.22} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid stroke="#eef2f0" vertical={false} /><XAxis dataKey="testName" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><Tooltip {...chartTooltip} formatter={(value) => [`${value}%`, 'O‘rtacha']} /><Area type="monotone" dataKey="avgScore" stroke="#15803d" strokeWidth={3} fill="url(#scoreFill)" activeDot={{ r: 6, strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div></AppCard>
        <AppCard className="border border-gray-100 shadow-sm"><div className="mb-5"><h2 className="font-semibold text-gray-900">O‘quvchilar taqqoslanishi</h2><p className="mt-1 text-sm text-gray-500">O‘rtacha natija, foizda</p></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={studentComparisonList} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}><CartesianGrid stroke="#eef2f0" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><Tooltip {...chartTooltip} formatter={(value) => [`${value}%`, 'O‘rtacha']} /><Bar dataKey="avgScore" name="Natija" fill="#16a34a" radius={[8, 8, 0, 0]} maxBarSize={48} /></BarChart></ResponsiveContainer></div></AppCard>
        <AppCard className="border border-gray-100 shadow-sm"><div className="mb-3"><h2 className="font-semibold text-gray-900">Qatnashuv darajasi</h2><p className="mt-1 text-sm text-gray-500">Oxirgi testdagi ishtirok</p></div><div className="flex flex-col items-center sm:flex-row"><div className="h-52 w-full sm:w-1/2"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={mockAttendanceData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={4} stroke="none">{mockAttendanceData.map((entry, index) => <Cell key={entry.name} fill={PIE_COLORS[index]} />)}</Pie><Tooltip {...chartTooltip} /></PieChart></ResponsiveContainer></div><div className="space-y-3 text-sm"><p className="font-semibold text-gray-900">82% <span className="font-normal text-gray-500">qatnashuv</span></p>{mockAttendanceData.map((entry, index) => <p key={entry.name} className="flex items-center gap-2 text-gray-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />{entry.name}<span className="ml-auto font-semibold text-gray-900">{entry.value}</span></p>)}</div></div></AppCard>
        <AppCard className="border border-gray-100 p-0 shadow-sm"><div className="border-b border-gray-100 px-5 py-4"><h2 className="font-semibold text-gray-900">Yuqori natija ko‘rsatganlar</h2><p className="mt-1 text-sm text-gray-500">Guruhdagi faol o‘quvchilar</p></div><div className="divide-y divide-gray-100">{mockTopPerformers.map((student, index) => <div key={student.name} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-green-50/60"><span className="grid h-8 w-8 place-items-center rounded-full bg-green-50 text-xs font-bold text-green-800">{index + 1}</span><span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{student.name}</span><span className="text-sm font-bold text-gray-900">{student.avgScore}%</span><span className="hidden rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 sm:block">{student.trend}</span></div>)}</div></AppCard>
      </div>
    </>}
  </GroupPageLayout>
}

export default GroupAnalyticsPage
