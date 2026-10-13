import { useEffect, useState } from 'react'
import { mockMyResultList, mockResultQuestionMap } from '../../mocks/studentMock'

const MOCK_LOAD_DELAY_MS = 600
const LOAD_ERROR_MESSAGE =
  'Natijalarni yuklab bo\'lmadi. Sahifani yangilab, qayta urinib ko\'ring.'

function useStudentResults(testId) {
  const [resultList, setResultList] = useState([])
  const [questionList, setQuestionList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setResultList(mockMyResultList)
        setQuestionList(testId ? (mockResultQuestionMap[testId] ?? []) : [])
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_LOAD_DELAY_MS)
    return () => clearTimeout(timerId)
  }, [testId])

  const resultDetail =
    resultList.find((result) => result.testId === testId) ?? null

  return { resultList, resultDetail, questionList, isLoading, loadError }
}

export default useStudentResults
