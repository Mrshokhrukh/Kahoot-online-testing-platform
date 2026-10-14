import { useCallback, useMemo, useState } from 'react'
import { useTestStore } from '../../store/testStore'

function useTestSession({ questionList = [], onSubmit }) {
  const currentAnswers = useTestStore((state) => state.currentAnswers)
  const setCurrentAnswer = useTestStore((state) => state.setCurrentAnswer)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const safeQuestionList = useMemo(
    () => (Array.isArray(questionList) ? questionList : []),
    [questionList],
  )

  const normalizedQuestionIndex = Math.min(
    Math.max(currentQuestionIndex, 0),
    Math.max(safeQuestionList.length - 1, 0),
  )

  const currentQuestion = safeQuestionList[normalizedQuestionIndex] ?? null

  const answeredQuestionCount = useMemo(() => {
    return safeQuestionList.filter((question) => {
      const answer = currentAnswers?.[question.id]

      if (answer === undefined || answer === null || answer === '') return false
      if (Array.isArray(answer)) return answer.length > 0
      return true
    }).length
  }, [safeQuestionList, currentAnswers])

  const submitAnswers = useCallback(() => {
    if (isSubmitted) return

    setIsSubmitted(true)
    onSubmit?.(currentAnswers)
  }, [currentAnswers, isSubmitted, onSubmit])

  const handleAnswerChange = useCallback(
    (answer) => {
      if (isSubmitted || !currentQuestion) return
      setCurrentAnswer(currentQuestion.id, answer)
    },
    [currentQuestion, isSubmitted, setCurrentAnswer],
  )

  const handleNextQuestion = useCallback(() => {
    if (isSubmitted) return

    if (currentQuestionIndex >= safeQuestionList.length - 1) {
      submitAnswers()
      return
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1)
  }, [currentQuestionIndex, isSubmitted, safeQuestionList.length, submitAnswers])

  const goToPreviousQuestion = useCallback(() => {
    if (isSubmitted) return
    setCurrentQuestionIndex((previousIndex) => Math.max(previousIndex - 1, 0))
  }, [isSubmitted])

  return {
    currentQuestion,
    currentQuestionIndex: normalizedQuestionIndex,
    currentAnswers,
    answeredQuestionCount,
    isSubmitted,
    questionCount: safeQuestionList.length,
    handleAnswerChange,
    handleNextQuestion,
    goToPreviousQuestion,
    submitAnswers,
    setCurrentQuestionIndex,
  }
}

export default useTestSession
