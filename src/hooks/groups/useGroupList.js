import { useEffect, useState } from 'react'
import { useGroupStore } from '../../store/groupStore'
import { mockGroupList } from '../../mocks/groupsMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const LOAD_ERROR_MESSAGE =
  "Guruhlarni yuklab bo'lmadi. Sahifani yangilab, qayta urinib ko'ring."

let hasLoadedGroupList = false

function useGroupList() {
  const groupList = useGroupStore((state) => state.groupList)
  const setGroupList = useGroupStore((state) => state.setGroupList)
  const [isLoading, setIsLoading] = useState(!hasLoadedGroupList)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (hasLoadedGroupList) return undefined

    const timerId = setTimeout(() => {
      try {
        const { groupList: currentList } = useGroupStore.getState()
        if (currentList.length === 0) setGroupList(mockGroupList)
        hasLoadedGroupList = true
        setLoadError(null)
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_API_DELAY)

    return () => clearTimeout(timerId)
  }, [setGroupList])

  return { groupList, isLoading, loadError }
}

export default useGroupList
