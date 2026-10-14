import { createElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, CircleCheck, ClipboardList, PlayCircle } from 'lucide-react'
import { AppCard, AppErrorMessage, AppSpinner, EmptyState, PageHeader } from '../../../components/shared'
import AppToast from '../../../components/shared/AppToast'
import GroupPageLayout from '../../../components/groups/GroupPageLayout'
import TestListCard from '../../../components/test-management/TestListCard'
import useTestList from '../../../hooks/test-management/useTestList'
import ROUTES from '../../../constants/routes'

const TABS = [
  { key: 'all', label: 'Barchasi' },
  { key: 'scheduled', label: 'Rejalashtirilgan' },
  { key: 'active', label: 'Faol' },
  { key: 'completed', label: 'Yakunlangan' },
]

const SUMMARY_ITEMS = [
  { key: 'all', label: 'Jami testlar', icon: ClipboardList, tint: 'bg-green-50 text-green-700' },
  { key: 'scheduled', label: 'Rejalashtirilgan', icon: CalendarClock, tint: 'bg-emerald-50 text-emerald-700' },
  { key: 'active', label: 'Faol', icon: PlayCircle, tint: 'bg-lime-50 text-lime-700' },
  { key: 'completed', label: 'Yakunlangan', icon: CircleCheck, tint: 'bg-gray-100 text-gray-600' },
]

export default function TestsPage() {
  const navigate = useNavigate()
  const { testList, filteredList, activeTab, setActiveTab, isLoading, loadError } = useTestList()
  const counts = {
    all: testList.length,
    scheduled: testList.filter((test) => test.status === 'scheduled').length,
    active: testList.filter((test) => test.status === 'active').length,
    completed: testList.filter((test) => test.status === 'completed').length,
  }
  const goTo = (route, id) => navigate(route.replace(':testId', id))

  return (
    <GroupPageLayout activeRoute={ROUTES.TEACHER_TESTS}>
      <PageHeader title="Testlar" subtitle="Testlaringiz jadvali, holati va natijalari" />

      <section aria-label="Testlar statistikasi" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_ITEMS.map(({ key, label, icon, tint }) => (
          <AppCard key={key} className="flex items-center gap-4 border border-gray-100 p-4 shadow-sm sm:p-5">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tint}`}>{createElement(icon, { className: 'h-5 w-5' })}</span>
            <span><span className="block text-2xl font-bold leading-none text-gray-900">{counts[key]}</span><span className="mt-1.5 block text-xs font-medium text-gray-500">{label}</span></span>
          </AppCard>
        ))}
      </section>

      <nav aria-label="Test holatlari" className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${activeTab === tab.key
                ? 'bg-green-700 text-white shadow-sm shadow-green-900/15'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === tab.key ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-500'}`}>{counts[tab.key]}</span>
            </button>
          ))}
        </div>
      </nav>

      {isLoading && <div className="flex justify-center py-12"><AppSpinner size="lg" label="Testlar yuklanmoqda" /></div>}
      {loadError && <AppErrorMessage message={loadError} />}
      {!isLoading && !loadError && filteredList.length === 0 && <EmptyState title="Testlar topilmadi" />}

      {!isLoading && !loadError && filteredList.length > 0 && (
        <section aria-label="Testlar ro‘yxati" className="flex flex-col gap-4">
          {filteredList.map((test) => (
            <TestListCard
              key={test.id}
              test={test}
              onConfigure={(id) => goTo(ROUTES.TEACHER_TEST_CONFIG, id)}
              onMonitor={(id) => goTo(ROUTES.TEACHER_MONITOR, id)}
              onResults={(id) => goTo(ROUTES.TEACHER_RESULTS, id)}
            />
          ))}
        </section>
      )}
      <AppToast />
    </GroupPageLayout>
  )
}
