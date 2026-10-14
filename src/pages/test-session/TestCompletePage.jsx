import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import TestCompleteScreen from '../../components/test-session/TestCompleteScreen'
import AppLayout from '../../components/shared/AppLayout'
import { mockQuestionList, mockTestInfo } from '../../mocks/testSessionMock'
import { useTestStore } from '../../store/testStore'

function TestCompletePage() {
  const navigate = useNavigate()
  const currentAnswers = useTestStore((state) => state.currentAnswers)

  const answeredCount = mockQuestionList.filter((question) => {
    const answer = currentAnswers?.[question.id]

    if (answer === undefined || answer === null || answer === '') return false
    if (Array.isArray(answer)) return answer.length > 0
    return true
  }).length

  return (
    <AppLayout>
      <TestCompleteScreen
        answeredCount={answeredCount}
        totalQuestionCount={mockQuestionList.length}
        onBackToDashboard={() => navigate(ROUTES.STUDENT_DASHBOARD, { replace: true })}
        testName={mockTestInfo.name}
      />
    </AppLayout>
  )
}

export default TestCompletePage
