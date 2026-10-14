import { useEffect, useState } from 'react'
import { mockLessonGroupList, mockLessonList } from '../../mocks/lessonsMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'

const LOAD_ERROR_MESSAGE =
  'Darslarni yuklab bo\'lmadi. Sahifani yangilab, qayta urinib ko\'ring.'

function sortLessonsByDate(lessonList) {
  return [...lessonList].sort((firstLesson, secondLesson) =>
    firstLesson.date.localeCompare(secondLesson.date),
  )
}

function loadGroupLessons(groupId) {
  const groupLessonList = mockLessonList.filter(
    (lesson) => lesson.groupId === groupId,
  )
  const group = mockLessonGroupList.find((item) => item.id === groupId)
  return {
    lessonList: sortLessonsByDate(groupLessonList),
    groupName: group ? group.name : '',
  }
}

function useLessonList(groupId) {
  const [loadResult, setLoadResult] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setLoadResult({ groupId, loadError: null, ...loadGroupLessons(groupId) })
      } catch {
        setLoadResult({ groupId, loadError: LOAD_ERROR_MESSAGE, lessonList: [], groupName: '' })
      }
    }, MOCK_API_DELAY)

    return () => clearTimeout(timerId)
  }, [groupId])

  const isLoading = !loadResult || loadResult.groupId !== groupId
  if (isLoading) return { lessonList: [], groupName: '', isLoading, loadError: null }

  const { lessonList, groupName, loadError } = loadResult
  return { lessonList, groupName, isLoading, loadError }
}

export default useLessonList
