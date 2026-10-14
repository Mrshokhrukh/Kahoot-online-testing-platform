import { useEffect, useMemo, useState } from 'react'
import { mockGroupNameById, mockMemberList } from '../../mocks/membersMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const SEARCH_DEBOUNCE_MS = 300
const DEFAULT_SORT_FIELD = 'name'
const LOAD_ERROR_MESSAGE = "O'quvchilarni yuklab bo'lmadi. Sahifani yangilab, qayta urinib ko'ring."

const SORT_COMPARATORS = {
  name: (first, second) => first.name.localeCompare(second.name),
  score: (first, second) => second.avgScore - first.avgScore,
  attendance: (first, second) => second.attendanceRate - first.attendanceRate,
}

function useMemberList(groupId) {
  const [memberList, setMemberList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setMemberList(mockMemberList)
      } catch {
        setLoadError(LOAD_ERROR_MESSAGE)
      }
      setIsLoading(false)
    }, MOCK_API_DELAY)
    return () => clearTimeout(timerId)
  }, [groupId])

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedQuery(searchQuery), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timerId)
  }, [searchQuery])

  const filteredList = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase()
    const matchedList = memberList.filter((member) =>
      member.name.toLowerCase().includes(normalizedQuery),
    )
    return [...matchedList].sort(SORT_COMPARATORS[sortField])
  }, [memberList, debouncedQuery, sortField])

  function removeMember(memberId) {
    setMemberList((currentList) => currentList.filter((member) => member.id !== memberId))
  }

  return {
    groupName: mockGroupNameById[groupId] ?? 'Guruh',
    memberList,
    filteredList,
    searchQuery,
    setSearchQuery,
    sortField,
    sortBy: setSortField,
    removeMember,
    isLoading,
    loadError,
  }
}

export default useMemberList
