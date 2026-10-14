import { useNavigate, useParams } from 'react-router-dom'
import AppCard from '../../../components/shared/AppCard'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import EmptyState from '../../../components/shared/EmptyState'
import useGroupResults from '../../../hooks/results/useGroupResults'
import { ROUTES } from '../../../constants/routes'

function GroupTestItem({ test, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(test.id)}
        className="w-full text-left transition-shadow duration-150 hover:shadow-lg rounded-xl"
      >
        <AppCard>
          <h2 className="text-lg font-semibold text-gray-900">{test.name}</h2>
          <p className="text-sm text-gray-400 mt-1">{test.date}</p>
          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span>O'rtacha ball: <b className="text-gray-900">{test.avgScore}</b></span>
            <span>Ishtirok: <b className="text-gray-900">{test.participationRate}%</b></span>
          </div>
        </AppCard>
      </button>
    </li>
  )
}

function GroupResultsPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { groupResults, isLoading, loadError } = useGroupResults(groupId)

  if (isLoading) return <AppSpinner />
  if (loadError) return <AppErrorMessage message={loadError} />
  if (groupResults.testList.length === 0) {
    return <EmptyState text="Bu guruhda hali test o'tkazilmagan." />
  }

  const handleTestSelect = (testId) => {
    navigate(ROUTES.TEST_RESULTS.replace(':testId', testId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900">{groupResults.groupName}: natijalar</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupResults.testList.map((test) => (
            <GroupTestItem key={test.id} test={test} onSelect={handleTestSelect} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GroupResultsPage
