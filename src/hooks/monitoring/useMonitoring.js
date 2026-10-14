import { useEffect, useState } from 'react'
import { mockMonitoringData, mockStudentStatusList } from '../../mocks/monitoringMock'

const LOAD_DELAY_MS = 600
const TIMER_INTERVAL_MS = 1000
const SIMULATION_INTERVAL_MS = 2000

function getStatistics(studentStatusList) {
  const statusCounts = studentStatusList.reduce(
    (statistics, student) => {
      statistics[student.status] += 1
      return statistics
    },
    { completed: 0, in_progress: 0, disconnected: 0 },
  )

  return {
    ...statusCounts,
    connected: statusCounts.completed + statusCounts.in_progress,
  }
}

function useMonitoring() {
  const [isLoading, setIsLoading] = useState(true)
  const [monitoringData, setMonitoringData] = useState(null)
  const [studentStatusList, setStudentStatusList] = useState([])
  const [remainingSeconds, setRemainingSeconds] = useState(
    mockMonitoringData.remainingSeconds,
  )
  const [isActive, setIsActive] = useState(true)
  const isTimeOver = remainingSeconds <= 0
  const isMonitoringActive = isActive && !isTimeOver

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setMonitoringData({ ...mockMonitoringData })
      setStudentStatusList(mockStudentStatusList.map((student) => ({ ...student })))
      setIsLoading(false)
    }, LOAD_DELAY_MS)

    return () => clearTimeout(loadTimeout)
  }, [])

  useEffect(() => {
    if (isLoading || !isMonitoringActive) return undefined

    const timerInterval = setInterval(() => {
      setRemainingSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0))
    }, TIMER_INTERVAL_MS)

    const simulationInterval = setInterval(() => {
      setStudentStatusList((currentStudents) => {
        const inProgressIndex = currentStudents.findIndex(
          (student) => student.status === 'in_progress',
        )

        if (inProgressIndex === -1) return currentStudents

        return currentStudents.map((student, index) =>
          index === inProgressIndex
            ? {
                ...student,
                status: 'completed',
                currentQuestion: student.totalQuestions,
              }
            : student,
        )
      })
    }, SIMULATION_INTERVAL_MS)

    return () => {
      clearInterval(timerInterval)
      clearInterval(simulationInterval)
    }
  }, [isLoading, isMonitoringActive])

  function stopMonitoring() {
    setIsActive(false)
  }

  const statistics = getStatistics(studentStatusList)

  return {
    isLoading,
    monitoringData,
    studentStatusList,
    remainingSeconds,
    isActive: isMonitoringActive,
    stopMonitoring,
    statistics,
  }
}

export default useMonitoring
