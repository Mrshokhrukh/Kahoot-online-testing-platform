import { useEffect, useState } from 'react'
import { mockMemberList, mockStudentTestHistory } from '../../mocks/membersMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const RECENT_TEST_LIMIT = 5
const NOT_FOUND_MESSAGE = "O'quvchi topilmadi."

function useStudentProfile(studentId) {
  const [studentProfile, setStudentProfile] = useState(null)
  const [recentTestList, setRecentTestList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      const foundStudent = mockMemberList.find((member) => member.id === studentId)
      if (foundStudent) {
        const sortedHistory = [...mockStudentTestHistory].sort((first, second) =>
          second.date.localeCompare(first.date),
        )
        setStudentProfile(foundStudent)
        setRecentTestList(sortedHistory.slice(0, RECENT_TEST_LIMIT))
      } else {
        setLoadError(NOT_FOUND_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_API_DELAY)
    return () => clearTimeout(timerId)
  }, [studentId])

  return { studentProfile, recentTestList, isLoading, loadError }
}

export default useStudentProfile
