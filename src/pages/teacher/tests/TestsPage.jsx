import { useNavigate } from 'react-router-dom'
import { PageHeader, AppSpinner, EmptyState } from '../../../components/shared'
import TestListCard from '../../../components/test-management/TestListCard'
import useTestList from '../../../hooks/test-management/useTestList'
import ROUTES from '../../../constants/routes'

const TABS = [
    { key: 'all', label: 'Barchasi' },
    { key: 'scheduled', label: 'Rejalashtirilgan' },
    { key: 'active', label: 'Aktiv' },
    { key: 'completed', label: 'Tugagan' },
]

export default function TestsPage() {
    const navigate = useNavigate()
    const { filteredList, activeTab, setActiveTab, isLoading, loadError } = useTestList()

    const goTo = (route, id) => navigate(route.replace(':testId', id))

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="Testlar" subtitle="Barcha testlar va ularning jadvali" />

            <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === tab.key
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {isLoading && <AppSpinner />}
            {loadError && <p className="text-sm text-red-600">{loadError}</p>}

            {!isLoading && !loadError && filteredList.length === 0 && (
                <EmptyState title="Testlar topilmadi" />
            )}

            <div className="flex flex-col gap-4">
                {filteredList.map((test) => (
                    <TestListCard
                        key={test.id}
                        test={test}
                        onConfigure={(id) => goTo(ROUTES.TEACHER_TEST_CONFIG, id)}
                        onMonitor={(id) => goTo(ROUTES.TEACHER_MONITOR, id)}
                        onResults={(id) => goTo(ROUTES.TEACHER_RESULTS, id)}
                    />
                ))}
            </div>
        </div>
    )
}