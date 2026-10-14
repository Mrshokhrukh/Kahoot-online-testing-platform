import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { mockTestInfo } from '../../mocks/testSessionMock'
import useTestTimer from './useTestTimer'

function useTestWaiting() {
  const navigate = useNavigate()

  const { countdownSeconds, isTestStarted } = useTestTimer({
    scheduledAt: mockTestInfo.scheduledAt,
    durationMinutes: mockTestInfo.durationMinutes,
    onTestTimeExpired: () => {
      navigate(ROUTES.TEST_ACTIVE.replace(':testId', mockTestInfo.id), { replace: true })
    },
  })

  useEffect(() => {
    if (!isTestStarted) return

    navigate(ROUTES.TEST_ACTIVE.replace(':testId', mockTestInfo.id), { replace: true })
  }, [isTestStarted, navigate])

  return {
    testInfo: mockTestInfo,
    countdownSeconds,
    isTestStarted,
  }
}

export default useTestWaiting
