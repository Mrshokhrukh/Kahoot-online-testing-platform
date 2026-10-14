import { useEffect, useState } from 'react'
import { mockGroupResults } from '../../mocks/resultsMock'

const MOCK_LOAD_DELAY_MS = 600
const MISSING_GROUP_ID_MESSAGE = "Guruh aniqlanmadi. Guruhlar ro'yxatiga qaytib, qayta oching."

function useGroupResults(groupId) {
  const [groupResults, setGroupResults] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (!groupId) {
      setLoadError(MISSING_GROUP_ID_MESSAGE)
      setIsLoading(false)
      return undefined
    }
    setIsLoading(true)
    const timerId = setTimeout(() => {
      setGroupResults(mockGroupResults)
      setIsLoading(false)
    }, MOCK_LOAD_DELAY_MS)
    return () => clearTimeout(timerId)
  }, [groupId])

  return { groupResults, isLoading, loadError }
}

export default useGroupResults
