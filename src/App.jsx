import { useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, Clock3, Search, Users, ClipboardList, TrendingUp } from 'lucide-react'
import { AppAvatar, AppBadge, AppButton, AppCard, AppInput, AppLayout, AppSidebar, AppSpinner, AppToast, EmptyState, PageHeader, showToast } from './components/shared'

const NAV_ITEMS = [
  { label: 'Bosh sahifa', route: 'dashboard', icon: 'dashboard' },
  { label: 'Guruhlar', route: 'groups', icon: 'groups' },
  { label: 'Testlar', route: 'tests', icon: 'tests' },
  { label: 'Natijalar', route: 'results', icon: 'results' },
  { label: "O‘quvchilar", route: 'students', icon: 'students' },
  { label: 'Sozlamalar', route: 'settings', icon: 'settings' },
]

const STATS = [
  { label: "Jami o‘quvchilar", value: '1,284', change: '+12%', icon: Users, tone: 'blue', bars: [25, 35, 28, 52, 43, 60, 55, 76] },
  { label: 'O‘tkazilgan testlar', value: '186', change: '+26%', icon: ClipboardList, tone: 'green', bars: [20, 28, 35, 31, 52, 45, 66, 82] },
  { label: 'O‘rtacha natija', value: '78%', change: '+8%', icon: Check, tone: 'purple', bars: [28, 35, 30, 48, 43, 58, 66, 74] },
  { label: 'Kutilayotgan testlar', value: '12', change: '−2%', icon: Clock3, tone: 'orange', bars: [52, 38, 45, 30, 42, 35, 28, 20] },
]

const TESTS = [
  { name: 'JavaScript asoslari', group: 'Frontend A guruhi', students: '24 nafar', score: '82%', time: 'Bugun, 10:30', tone: 'blue' },
  { name: 'React komponentlari', group: 'React guruhi', students: '18 nafar', score: '76%', time: 'Bugun, 09:15', tone: 'purple' },
  { name: 'HTML va CSS amaliyoti', group: 'Web asoslari guruhi', students: '22 nafar', score: '69%', time: 'Kecha, 14:20', tone: 'orange' },
  { name: 'Git va GitHub', group: 'Junior dasturchilar guruhi', students: '20 nafar', score: '85%', time: 'Kecha, 11:05', tone: 'green' },
]

const ACTIVITY = [
  { name: 'Azizbek Karimov', group: 'Frontend A guruhi', status: 'Testni yakunladi', time: '10:45', state: 'success', initials: 'AK' },
  { name: 'Malika Boboyeva', group: 'React guruhi', status: 'Boshladi', time: '10:31', state: 'info', initials: 'MB' },
  { name: 'Sardor Hamidov', group: 'Frontend A guruhi', status: 'Testni yakunladi', time: '09:56', state: 'success', initials: 'SH' },
  { name: "Dilshod To‘liyev", group: 'Web asoslari guruhi', status: 'Kutilmoqda', time: '09:40', state: 'warning', initials: 'DT' },
]

const TONE_CLASSES = {
  blue: 'border-blue-100 bg-blue-50 text-blue-600', green: 'border-green-100 bg-green-50 text-green-600',
  purple: 'border-blue-100 bg-blue-50 text-blue-600', orange: 'border-yellow-100 bg-yellow-50 text-yellow-600',
}
const BAR_HEIGHTS = ['h-2', 'h-3', 'h-2.5', 'h-4', 'h-3.5', 'h-5', 'h-4.5', 'h-6']

function StatCard({ stat }) {
  const Icon = stat.icon
  const isDown = stat.change.startsWith('−')
  return <AppCard className="relative min-w-0 overflow-hidden border p-4 sm:p-5">
    <div className="flex items-start justify-between"><span className={`grid h-9 w-9 place-items-center rounded-xl ${TONE_CLASSES[stat.tone]}`}><Icon className="h-4 w-4" /></span><span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isDown ? 'text-red-500' : 'text-green-600'}`}>{isDown ? <ArrowDownRight className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}{stat.change}</span></div>
    <p className="mt-4 text-xs font-medium text-gray-500">{stat.label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{stat.value}</p><p className="mt-1 text-[10px] text-gray-400">O‘tgan oyga nisbatan</p>
    <div aria-hidden="true" className="absolute bottom-0 right-3 flex h-8 items-end gap-0.5 opacity-40">{stat.bars.map((bar, index) => <span key={index} className={`w-3 rounded-t-sm ${BAR_HEIGHTS[Math.min(7, Math.floor(bar / 13))]} ${TONE_CLASSES[stat.tone].split(' ')[1]}`} />)}</div>
  </AppCard>
}

function RecentTests({ tests, onNavigate }) {
  return <AppCard className="overflow-hidden p-0">
    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4"><div><h2 className="text-sm font-bold text-gray-900">So‘nggi frontend testlari</h2><p className="mt-1 text-[11px] text-gray-500">Dasturchilar guruhlari bo‘yicha natijalar</p></div><button type="button" onClick={() => onNavigate('tests')} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">Barchasi <ArrowRight className="h-3.5 w-3.5" /></button></div>
    {tests.length ? <div className="space-y-2 p-3 sm:p-4">{tests.map((test) => <article key={test.name} className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-colors hover:border-blue-100 hover:bg-blue-50/30 sm:grid-cols-[minmax(0,1.5fr)_minmax(150px,1fr)_auto_auto] sm:items-center"><div className="flex min-w-0 items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${TONE_CLASSES[test.tone]}`}><BookOpen className="h-4 w-4" /></span><div className="min-w-0"><h3 className="truncate text-sm font-semibold text-gray-800">{test.name}</h3><p className="mt-1 text-[11px] text-gray-400">{test.time}</p></div></div><AppBadge label={test.group} variant="neutral" className="w-fit" /><span className="text-xs text-gray-500">{test.students} qatnashdi</span><div className="flex items-center gap-2"><AppBadge label={test.score} variant={test.tone === 'orange' ? 'warning' : test.tone === 'green' ? 'success' : 'info'} /><span className="text-[10px] text-gray-400">o‘rtacha</span></div></article>)}</div> : <div className="p-4"><EmptyState text="Qidiruv bo‘yicha frontend testi topilmadi." icon={BookOpen} /></div>}
    <button type="button" onClick={() => onNavigate('tests')} className="flex w-full items-center justify-center gap-1 border-t border-gray-100 px-4 py-3 text-xs font-semibold text-blue-600 hover:bg-gray-50">Barcha frontend testlarini ko‘rish <ArrowRight className="h-3.5 w-3.5" /></button>
  </AppCard>
}

function ActivityFeed({ people }) {
  return <AppCard className="p-0">
    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4"><div><h2 className="text-sm font-bold text-gray-900">O‘quvchilar faolligi</h2><p className="mt-1 text-[11px] text-gray-500">O‘quvchilar holati va natijalari</p></div><a href="#students" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">Barchasi <ArrowRight className="h-3.5 w-3.5" /></a></div>
    {people.length ? <div className="divide-y divide-gray-100">{people.map((person) => <div key={person.name} className="flex items-center gap-3 px-5 py-3"><AppAvatar name={person.initials} size="sm" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-gray-800">{person.name}</p><p className="mt-0.5 text-[10px] text-gray-400">{person.group}</p></div><div className="flex shrink-0 items-center gap-2"><AppBadge label={person.status} variant={person.state} className="px-2 py-1 text-[9px]" /><span className="text-[10px] text-gray-400">{person.time}</span></div></div>)}</div> : <div className="p-4"><EmptyState text="Qidiruv bo‘yicha o‘quvchi topilmadi." icon={Users} /></div>}
    <div className="flex items-center gap-2 border-t border-gray-100 px-5 py-3 text-[10px] text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Jonli yangilanmoqda <span className="ml-auto">Oxirgi yangilanish: hozir</span></div>
  </AppCard>
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8V33A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z"/></svg>
}

function todayAsInputValue() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function Dashboard() {
  const [search, setSearch] = useState('')
  const [activeRoute, setActiveRoute] = useState('dashboard')
  const [isNavigating, setIsNavigating] = useState(false)
  const [selectedDate, setSelectedDate] = useState(todayAsInputValue)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const normalizedSearch = search.trim().toLocaleLowerCase('uz-UZ')
  const filteredTests = TESTS.filter((test) => `${test.name} ${test.group} ${test.students}`.toLocaleLowerCase('uz-UZ').includes(normalizedSearch))
  const filteredPeople = ACTIVITY.filter((person) => `${person.name} ${person.group} ${person.status}`.toLocaleLowerCase('uz-UZ').includes(normalizedSearch))
  const pageTitle = NAV_ITEMS.find((item) => item.route === activeRoute)?.label || 'Bosh sahifa'

  function handleNavigate(route) {
    setActiveRoute(route)
    window.location.hash = route
    setIsNavigating(true)
    window.setTimeout(() => setIsNavigating(false), 900)
  }

  function handleGoogleLogin() {
    setIsGoogleLoading(true)
    window.setTimeout(() => {
      setIsGoogleLoading(false)
      showToast('Google orqali kirish hozircha ulanmagan.', 'info')
    }, 700)
  }

  return <div className="min-h-screen bg-gray-50 lg:pl-60">
    <AppSidebar navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={handleNavigate} onLogout={() => showToast('Tizimdan chiqdingiz', 'success')} />
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 flex min-h-[68px] items-center justify-between gap-3 border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-8">
        <div className="relative w-full max-w-sm"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><AppInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Test yoki o‘quvchini qidiring" aria-label="Test va o‘quvchilarni qidirish" className="h-10 border-gray-200 bg-white pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></div>
        <div className="ml-2 flex shrink-0 items-center gap-2 sm:gap-4"><button type="button" aria-label="Bildirishnomalar" className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" /></button><span className="hidden h-8 w-px bg-gray-200 sm:block" /><button className="flex items-center gap-2 text-left" type="button"><AppAvatar name="Shaxruz Ahmedov" size="sm" /><span className="hidden text-xs font-semibold text-gray-700 sm:block">Shaxruz Ahmedov</span><ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 sm:block" /></button></div>
      </header>
      <AppLayout className="bg-transparent"><div className="space-y-6">
        <PageHeader title={<span className="inline-flex items-center gap-3">{pageTitle}{isNavigating && <AppSpinner size="sm" />}</span>} subtitle={activeRoute === 'dashboard' ? 'Bugungi faoliyatingiz va umumiy statistika' : `${pageTitle} bo‘limi`} action={<div className="flex flex-wrap items-center gap-2"><label className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100"><CalendarDays className="h-4 w-4 shrink-0 text-blue-600" /><input aria-label="Sanani tanlang" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value || todayAsInputValue())} className="h-full min-w-0 cursor-pointer bg-transparent text-xs text-gray-700 outline-none" /></label><AppButton label={<><GoogleMark /><span>Sign in Google</span></>} variant="secondary" size="sm" onClick={handleGoogleLogin} isLoading={isGoogleLoading} /></div>} />
        <section aria-label="Asosiy statistika" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{STATS.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
        <section className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-[1.35fr_1fr]"><RecentTests tests={filteredTests} onNavigate={handleNavigate} /><ActivityFeed people={filteredPeople} /></section>
        <AppCard className="flex flex-col items-start justify-between gap-4 border-blue-100 bg-blue-50/70 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm"><TrendingUp className="h-5 w-5" /></span><div><h2 className="text-sm font-bold text-gray-900">Bugungi natijalarni ko‘rib chiqing</h2><p className="mt-1 text-xs text-gray-500">O‘quvchilaringiz rivojlanishini kuzatib boring.</p></div></div><AppButton label="Hisobotlarni ochish" variant="primary" size="sm" onClick={() => handleNavigate('results')} isLoading={isNavigating && activeRoute === 'results'} /></AppCard>
      </div></AppLayout>
    </div><AppToast />
  </div>
}

export default Dashboard
