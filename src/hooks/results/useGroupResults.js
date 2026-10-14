import { useEffect, useState } from 'react'
import { mockGroupResults } from '../../mocks/resultsMock'

const MOCK_LOAD_DELAY_MS = 600
const MISSING_GROUP_ID_MESSAGE = "Guruh aniqlanmadi. Guruhlar ro'yxatiga qaytib, qayta oching."

function useGroupResults(groupId) {
  const [groupResults, setGroupResults] = useState(null)
  const [loadedGroupId, setLoadedGroupId] = useState(null)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (!groupId) return undefined
    const timerId = setTimeout(() => {
      setGroupResults(mockGroupResults)
      setLoadError(null)
      setLoadedGroupId(groupId)
    }, MOCK_LOAD_DELAY_MS)
    return () => clearTimeout(timerId)
  }, [groupId])

  return {
    groupResults,
    isLoading: Boolean(groupId) && loadedGroupId !== groupId,
    loadError: groupId ? loadError : MISSING_GROUP_ID_MESSAGE,
  }
}

export default useGroupResults
