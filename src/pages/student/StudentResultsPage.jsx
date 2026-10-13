import AppErrorMessage from '../../components/shared/AppErrorMessage'
import AppLayout from '../../components/shared/AppLayout'
import AppSpinner from '../../components/shared/AppSpinner'
import EmptyState from '../../components/shared/EmptyState'
import MyResultCard from '../../components/student/MyResultCard'
import useStudentResults from '../../hooks/student/useStudentResults'

function ResultListBody({ resultList, isLoading, loadError }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <AppSpinner size="lg" />
      </div>
    )
  }
  if (loadError) return <AppErrorMessage message={loadError} />
  if (resultList.length === 0) return <EmptyState text="Hali natijalar yo'q" />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resultList.map((result) => (
        <MyResultCard key={result.id} result={result} />
      ))}
    </div>
  )
}

function StudentResultsPage() {
  const { resultList, isLoading, loadError } = useStudentResults()

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900">Mening natijalarim</h1>
        <ResultListBody
          resultList={resultList}
          isLoading={isLoading}
          loadError={loadError}
        />
      </div>
    </AppLayout>
  )
}

export default StudentResultsPage
