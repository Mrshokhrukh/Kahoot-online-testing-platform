import { useParams } from 'react-router-dom'
import AppErrorMessage from '../../../components/shared/AppErrorMessage'
import AppSpinner from '../../../components/shared/AppSpinner'
import AttendanceTable from '../../../components/results/AttendanceTable'
import ExportButton from '../../../components/results/ExportButton'
import QuestionAnalysisPanel from '../../../components/results/QuestionAnalysisPanel'
import ResultsSummaryBar from '../../../components/results/ResultsSummaryBar'
import ScoreTable from '../../../components/results/ScoreTable'
import useTestResults from '../../../hooks/results/useTestResults'

function TestResultsPage() {
  const { testId } = useParams()
  const { testResults, isLoading, loadError, sortField, sortDirection, setSortField, sortedScoreList } =
    useTestResults(testId)

  if (isLoading) return <AppSpinner />
  if (loadError) return <AppErrorMessage message={loadError} />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{testResults.testName}: natijalar</h1>
          <ExportButton scoreList={sortedScoreList} />
        </div>
        <ResultsSummaryBar summary={testResults.summary} totalStudents={testResults.totalStudents} />
        <AttendanceTable attendanceList={testResults.attendanceList} />
        <ScoreTable
          sortedScoreList={sortedScoreList}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={setSortField}
        />
        <QuestionAnalysisPanel questionAnalysis={testResults.questionAnalysis} />
      </div>
    </div>
  )
}

export default TestResultsPage
