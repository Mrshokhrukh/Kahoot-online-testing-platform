import { useEffect, useState } from 'react'
import {
  mockDashboardStats,
  mockGroupSummaryList,
  mockUpcomingTestList,
  mockRecentActivityList,
} from '../../mocks/dashboardMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const LOAD_ERROR_MESSAGE =
  'Ma\'lumotlarni yuklab bo\'lmadi. Sahifani yangilab, qayta urinib ko\'ring.'

function useTeacherDashboard() {
  const [dashboardContent, setDashboardContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setDashboardContent({
          dashboardStats: mockDashboardStats,
          groupSummaryList: mockGroupSummaryList,
          upcomingTestList: mockUpcomingTestList,
          recentActivityList: mockRecentActivityList,
        })
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_API_DELAY)

    return () => clearTimeout(timerId)
  }, [])

  return { ...dashboardContent, isLoading, loadError }
}

export default useTeacherDashboard
