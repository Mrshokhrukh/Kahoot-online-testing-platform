import { useEffect, useState } from 'react'
import { useGroupStore } from '../../store/groupStore'
import { mockGroupList } from '../../mocks/groupsMock'
import { generateInviteCode } from './useGroupCreate'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const LOAD_ERROR_MESSAGE =
  "Guruh ma'lumotlarini yuklab bo'lmadi. Sahifani yangilab, qayta urinib ko'ring."
const GROUP_NOT_FOUND_MESSAGE = "Guruh topilmadi. Guruhlar ro'yxatiga qaytib ko'ring."

function findGroupInStore(groupId) {
  const { groupList, setGroupList } = useGroupStore.getState()
  if (groupList.length > 0) return groupList.find((group) => group.id === groupId) ?? null
  setGroupList(mockGroupList)
  return mockGroupList.find((group) => group.id === groupId) ?? null
}

function useGroupDetail(groupId) {
  const groupList = useGroupStore((state) => state.groupList)
  const setGroupList = useGroupStore((state) => state.setGroupList)
  const removeGroup = useGroupStore((state) => state.removeGroup)
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)
  const [loadResult, setLoadResult] = useState(null)

  const liveGroup = groupList.find((group) => group.id === groupId) ?? null

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        const foundGroup = findGroupInStore(groupId)
        setLoadResult({ groupId, loadError: foundGroup ? null : GROUP_NOT_FOUND_MESSAGE })
      } catch {
        setLoadResult({ groupId, loadError: LOAD_ERROR_MESSAGE })
      }
    }, MOCK_API_DELAY)
    return () => clearTimeout(timerId)
  }, [groupId])

  useEffect(() => {
    if (liveGroup) setActiveGroup(liveGroup)
  }, [liveGroup, setActiveGroup])

  const isLoading = !loadResult || loadResult.groupId !== groupId
  const loadError = isLoading ? null : loadResult.loadError

  function updateGroup(patchFields) {
    if (!liveGroup) return null
    const updatedGroup = { ...liveGroup, ...patchFields }
    setGroupList(
      groupList.map((group) => (group.id === groupId ? updatedGroup : group)),
    )
    setActiveGroup(updatedGroup)
    return updatedGroup
  }

  function deleteGroup() {
    removeGroup(groupId)
  }

  function refreshInviteCode() {
    return updateGroup({ inviteCode: generateInviteCode() })
  }

  return { group: liveGroup, isLoading, loadError, updateGroup, deleteGroup, refreshInviteCode }
}

export default useGroupDetail
