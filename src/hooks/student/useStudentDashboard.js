import { useEffect, useState } from 'react'
import {
  mockUpcomingTestList,
  mockMyGroupList,
  mockMyResultList,
} from '../../mocks/studentMock'

const MOCK_LOAD_DELAY_MS = 600
const RECENT_RESULT_LIMIT = 3
const LOAD_ERROR_MESSAGE =
  'Ma\'lumotlarni yuklab bo\'lmadi. Sahifani yangilab, qayta urinib ko\'ring.'

const EMPTY_DASHBOARD_CONTENT = {
  upcomingTestList: [],
  groupList: [],
  recentResultList: [],
  studentStats: { groupCount: 0, completedTestCount: 0, avgScore: 0 },
}

function calculateAvgScore(resultList) {
  const attendedResultList = resultList.filter((result) => result.attended)
  if (attendedResultList.length === 0) return 0
  const totalPercentage = attendedResultList.reduce(
    (sum, result) => sum + result.percentage,
    0,
  )
  return Math.round(totalPercentage / attendedResultList.length)
}

function loadDashboardMock() {
  const upcomingTestList = [...mockUpcomingTestList].sort(
    (firstTest, secondTest) =>
      new Date(firstTest.scheduledAt) - new Date(secondTest.scheduledAt),
  )
  const recentResultList = [...mockMyResultList]
    .sort((firstResult, secondResult) =>
      secondResult.date.localeCompare(firstResult.date),
    )
    .slice(0, RECENT_RESULT_LIMIT)

  return {
    upcomingTestList,
    groupList: mockMyGroupList,
    recentResultList,
    studentStats: {
      groupCount: mockMyGroupList.length,
      completedTestCount: mockMyResultList.length,
      avgScore: calculateAvgScore(mockMyResultList),
    },
  }
}

function useStudentDashboard() {
  const [dashboardContent, setDashboardContent] = useState(
    EMPTY_DASHBOARD_CONTENT,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setDashboardContent(loadDashboardMock())
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_LOAD_DELAY_MS)
    return () => clearTimeout(timerId)
  }, [])

  return { ...dashboardContent, isLoading, loadError }
}

export default useStudentDashboard
