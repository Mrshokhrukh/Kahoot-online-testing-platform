import { useState } from 'react'
import { useGroupStore } from '../../store/groupStore'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const CREATE_ERROR_MESSAGE = "Guruhni yaratib bo'lmadi. Qayta urinib ko'ring."
const NEW_GROUP_PREFIX = 'g'

export function generateInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function useGroupCreate() {
  const addGroup = useGroupStore((state) => state.addGroup)
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState(null)

  function createGroup(groupInput) {
    setIsCreating(true)
    setCreateError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const todayIsoDate = getTodayIsoDate()
          const newGroup = {
            id: `${NEW_GROUP_PREFIX}${Date.now()}`,
            studentCount: 0,
            testCount: 0,
            avgScore: 0,
            inviteCode: generateInviteCode(),
            createdAt: todayIsoDate,
            lastActivityAt: todayIsoDate,
            ...groupInput,
          }
          addGroup(newGroup)
          setActiveGroup(newGroup)
          resolve(newGroup)
        } catch {
          setCreateError(CREATE_ERROR_MESSAGE)
          resolve(null)
        } finally {
          setIsCreating(false)
        }
      }, MOCK_API_DELAY)
    })
  }

  return { createGroup, isCreating, createError }
}

export default useGroupCreate
