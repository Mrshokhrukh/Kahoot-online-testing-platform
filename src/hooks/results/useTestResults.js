import { useEffect, useMemo, useState } from 'react'
import { mockTestResults } from '../../mocks/resultsMock'

const MOCK_LOAD_DELAY_MS = 600
const DEFAULT_SORT_FIELD = 'score'
const DEFAULT_SORT_DIRECTION = 'desc'
const MISSING_TEST_ID_MESSAGE = "Test aniqlanmadi. Test ro'yxatiga qaytib, natijalarni qayta oching."

function compareScoreItems(firstItem, secondItem, sortField) {
  if (sortField === 'name') return firstItem.name.localeCompare(secondItem.name)
  return firstItem[sortField] - secondItem[sortField]
}

function useResultsLoader(testId) {
  const [testResults, setTestResults] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (!testId) {
      setLoadError(MISSING_TEST_ID_MESSAGE)
      setIsLoading(false)
      return undefined
    }
    setIsLoading(true)
    const timerId = setTimeout(() => {
      setTestResults(mockTestResults)
      setIsLoading(false)
    }, MOCK_LOAD_DELAY_MS)
    return () => clearTimeout(timerId)
  }, [testId])

  return { testResults, isLoading, loadError }
}

function useScoreSort(scoreList) {
  const [sortField, setSortFieldState] = useState(DEFAULT_SORT_FIELD)
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION)

  const setSortField = (field) => {
    if (field === sortField) {
      setSortDirection((previous) => (previous === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortFieldState(field)
    setSortDirection(field === 'name' ? 'asc' : 'desc')
  }

  const sortedScoreList = useMemo(() => {
    const directionFactor = sortDirection === 'asc' ? 1 : -1
    return [...(scoreList || [])].sort(
      (firstItem, secondItem) => directionFactor * compareScoreItems(firstItem, secondItem, sortField),
    )
  }, [scoreList, sortField, sortDirection])

  return { sortField, sortDirection, setSortField, sortedScoreList }
}

function useTestResults(testId) {
  const { testResults, isLoading, loadError } = useResultsLoader(testId)
  const { sortField, sortDirection, setSortField, sortedScoreList } = useScoreSort(testResults?.scoreList)

  return { testResults, isLoading, loadError, sortField, sortDirection, setSortField, sortedScoreList }
}

export default useTestResults
