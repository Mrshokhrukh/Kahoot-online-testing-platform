import { useEffect, useMemo, useState } from 'react'
import { MOCK_API_DELAY } from '../../constants/appConstants'
import {
  mockGroupProgressData,
  mockStudentComparisonData,
} from '../../mocks/analyticsMock'

const LOAD_ERROR_MESSAGE =
  "Analitikani yuklab bo'lmadi. Sahifani yangilab, qayta urinib ko'ring."

const FILTER_RANGE_LAST_7_DAYS = '7'
const FILTER_RANGE_LAST_30_DAYS = '30'
const FILTER_RANGE_ALL = 'all'

const FILTER_RANGE_DAY_COUNT = {
  [FILTER_RANGE_LAST_7_DAYS]: 7,
  [FILTER_RANGE_LAST_30_DAYS]: 30,
}

function getStartDate(dateRange) {
  if (dateRange === FILTER_RANGE_ALL) return null
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - FILTER_RANGE_DAY_COUNT[dateRange])
  return startDate
}

function filterProgressByDate(progressList, dateRange) {
  const startDate = getStartDate(dateRange)
  if (!startDate) return progressList
  return progressList.filter((item) => new Date(item.date) >= startDate)
}

function useGroupAnalytics(groupId) {
  const [progressList, setProgressList] = useState([])
  const [studentComparisonList, setStudentComparisonList] = useState([])
  const [dateRange, setDateRange] = useState(FILTER_RANGE_ALL)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setLoadError(null)

    const timerId = setTimeout(() => {
      try {
        setProgressList(mockGroupProgressData)
        setStudentComparisonList(mockStudentComparisonData)
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_API_DELAY)

    return () => clearTimeout(timerId)
  }, [groupId])

  const filteredProgressList = useMemo(
    () => filterProgressByDate(progressList, dateRange),
    [progressList, dateRange],
  )

  function handleDateRangeChange(nextDateRange) {
    setDateRange(nextDateRange)
  }

  return {
    progressList: filteredProgressList,
    studentComparisonList,
    dateRange,
    handleDateRangeChange,
    isLoading,
    loadError,
  }
}

export {
  FILTER_RANGE_ALL,
  FILTER_RANGE_LAST_7_DAYS,
  FILTER_RANGE_LAST_30_DAYS,
}

export default useGroupAnalytics
