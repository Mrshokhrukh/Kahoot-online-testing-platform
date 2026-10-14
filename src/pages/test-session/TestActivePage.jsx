import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionDisplay from '../../components/questions/QuestionDisplay'
import AppErrorMessage from '../../components/shared/AppErrorMessage'
import AppLayout from '../../components/shared/AppLayout'
import AnswerSubmitButton from '../../components/test-session/AnswerSubmitButton'
import TestHeader from '../../components/test-session/TestHeader'
import TestProgressBar from '../../components/test-session/TestProgressBar'
import { ROUTES } from '../../constants/routes'
import { mockQuestionList, mockTestInfo } from '../../mocks/testSessionMock'
import useTestSession from '../../hooks/test-session/useTestSession'
import useTestTimer from '../../hooks/test-session/useTestTimer'

function TestActivePage() {
  const navigate = useNavigate()
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    answeredQuestionCount,
    isSubmitted,
    questionCount,
    handleAnswerChange,
    handleNextQuestion,
    submitAnswers,
  } = useTestSession({
    questionList: mockQuestionList,
    onSubmit: () => {
      navigate(ROUTES.TEST_COMPLETE.replace(':testId', mockTestInfo.id), { replace: true })
    },
  })

  const { remainingTestSeconds, isTestStarted } = useTestTimer({
    scheduledAt: mockTestInfo.scheduledAt,
    durationMinutes: mockTestInfo.durationMinutes,
    onTestTimeExpired: () => {
      submitAnswers()
    },
  })

  useEffect(() => {
    if (!isTestStarted) {
      navigate(ROUTES.TEST_WAITING.replace(':testId', mockTestInfo.id), { replace: true })
      return
    }

    if (isSubmitted) {
      navigate(ROUTES.TEST_COMPLETE.replace(':testId', mockTestInfo.id), { replace: true })
    }
  }, [isSubmitted, isTestStarted, navigate])

  useEffect(() => {
    if (!isTestStarted || isSubmitted) return

    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isTestStarted, isSubmitted])

  if (!currentQuestion) {
    return (
      <AppLayout>
        <AppErrorMessage message="Bu testga oid savollar mavjud emas." />
      </AppLayout>
    )
  }

  const answerForQuestion = currentAnswers?.[currentQuestion.id]

  const renderQuestionInput = () => {
    if (currentQuestion.type === 'quiz') {
      return (
        <QuestionDisplay
          question={currentQuestion}
          mode="view"
          selectedOptionIndex={typeof answerForQuestion === 'number' ? answerForQuestion : null}
          onSelectOption={(optionIndex) => handleAnswerChange(optionIndex)}
          isAnswerSubmitted={false}
        />
      )
    }

    if (currentQuestion.type === 'true_false') {
      return (
        <QuestionDisplay
          question={currentQuestion}
          mode="view"
          selectedAnswer={answerForQuestion}
          onSelectAnswer={(answerValue) => handleAnswerChange(answerValue)}
          isAnswerSubmitted={false}
        />
      )
    }

    if (currentQuestion.type === 'open') {
      return (
        <QuestionDisplay
          question={currentQuestion}
          mode="view"
          studentAnswer={typeof answerForQuestion === 'string' ? answerForQuestion : ''}
          onAnswerChange={(value) => handleAnswerChange(value)}
          isSubmitted={false}
        />
      )
    }

    if (currentQuestion.type === 'code') {
      return (
        <QuestionDisplay
          question={currentQuestion}
          mode="view"
          studentCode={typeof answerForQuestion === 'string' ? answerForQuestion : ''}
          onCodeChange={(value) => handleAnswerChange(value)}
          isSubmitted={false}
          onSubmit={handleNextQuestion}
        />
      )
    }

    return <AppErrorMessage message="Bu savol turi qo'llab-quvvatlanmaydi." />
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <TestHeader
          testName={mockTestInfo.name}
          currentQuestionNumber={currentQuestionIndex + 1}
          questionCount={questionCount}
          remainingSeconds={remainingTestSeconds}
        />

        <TestProgressBar
          currentQuestion={currentQuestionIndex + 1}
          questionCount={questionCount}
        />

        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          {renderQuestionInput()}
        </section>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">Javob berilgan savollar: {answeredQuestionCount}</p>
          <AnswerSubmitButton
            isLastQuestion={currentQuestionIndex === questionCount - 1}
            onClick={handleNextQuestion}
            isDisabled={false}
            isSubmitting={false}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default TestActivePage
