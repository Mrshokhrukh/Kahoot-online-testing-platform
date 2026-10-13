import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppButton from '../../components/shared/AppButton'
import AppErrorMessage from '../../components/shared/AppErrorMessage'
import AppLayout from '../../components/shared/AppLayout'
import AppSpinner from '../../components/shared/AppSpinner'
import EmptyState from '../../components/shared/EmptyState'
import ResultDetailView from '../../components/student/ResultDetailView'
import useStudentResults from '../../hooks/student/useStudentResults'

const RESULTS_PATH = '/student/results'

function ResultDetailBody({ resultDetail, questionList, isLoading, loadError }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <AppSpinner size="lg" />
      </div>
    )
  }
  if (loadError) return <AppErrorMessage message={loadError} />
  if (!resultDetail) return <EmptyState text="Natija topilmadi" />

  return (
    <ResultDetailView resultDetail={resultDetail} questionList={questionList} />
  )
}

function StudentResultDetailPage() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const { resultDetail, questionList, isLoading, loadError } =
    useStudentResults(testId)

  function handleResultsBack() {
    navigate(RESULTS_PATH)
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <AppButton
            label={
              <>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Natijalarga qaytish
              </>
            }
            variant="ghost"
            size="sm"
            onClick={handleResultsBack}
          />
        </div>
        <ResultDetailBody
          resultDetail={resultDetail}
          questionList={questionList}
          isLoading={isLoading}
          loadError={loadError}
        />
      </div>
    </AppLayout>
  )
}

export default StudentResultDetailPage
