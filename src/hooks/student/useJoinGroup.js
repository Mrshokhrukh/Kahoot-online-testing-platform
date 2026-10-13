import { useEffect, useRef, useState } from 'react'
import { mockInviteCodeMap } from '../../mocks/studentMock'

const MOCK_JOIN_DELAY_MS = 600
const JOIN_ERROR_MESSAGE = 'Bu kod noto\'g\'ri yoki muddati o\'tgan'

function findGroupNameByInviteCode(inviteCode) {
  return Object.hasOwn(mockInviteCodeMap, inviteCode)
    ? mockInviteCodeMap[inviteCode]
    : null
}

function useJoinGroup() {
  const [joinedGroupName, setJoinedGroupName] = useState(null)
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState(null)
  const timerIdRef = useRef(null)

  useEffect(() => () => clearTimeout(timerIdRef.current), [])

  function handleGroupJoin(inviteCode) {
    setIsJoining(true)
    setJoinError(null)
    timerIdRef.current = setTimeout(() => {
      const groupName = findGroupNameByInviteCode(inviteCode)
      if (groupName) setJoinedGroupName(groupName)
      else setJoinError(JOIN_ERROR_MESSAGE)
      setIsJoining(false)
    }, MOCK_JOIN_DELAY_MS)
  }

  return { joinedGroupName, isJoining, joinError, handleGroupJoin }
}

export default useJoinGroup
