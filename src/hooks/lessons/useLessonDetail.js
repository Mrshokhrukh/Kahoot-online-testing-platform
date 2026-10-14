import { useEffect, useState } from 'react'
import { mockLessonList } from '../../mocks/lessonsMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'
import { useLessonStore } from '../../store/lessonStore'

const NOT_FOUND_MESSAGE = 'Dars topilmadi. U o\'chirilgan yoki havola noto\'g\'ri bo\'lishi mumkin.'
const LOAD_ERROR_MESSAGE =
  'Darsni yuklab bo\'lmadi. Sahifani yangilab, qayta urinib ko\'ring.'

function findGroupLesson(groupId, lessonId) {
  return mockLessonList.find(
    (lesson) => lesson.id === lessonId && lesson.groupId === groupId,
  )
}

function useLessonDetail(groupId, lessonId) {
  const [loadResult, setLoadResult] = useState(null)
  const setActiveLesson = useLessonStore((state) => state.setActiveLesson)
  const requestKey = `${groupId}/${lessonId}`

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        const lesson = findGroupLesson(groupId, lessonId) ?? null
        setActiveLesson(lesson)
        const loadError = lesson ? null : NOT_FOUND_MESSAGE
        setLoadResult({ requestKey: `${groupId}/${lessonId}`, lesson, loadError })
      } catch {
        setLoadResult({ requestKey: `${groupId}/${lessonId}`, lesson: null, loadError: LOAD_ERROR_MESSAGE })
      }
    }, MOCK_API_DELAY)

    return () => clearTimeout(timerId)
  }, [groupId, lessonId, setActiveLesson])

  const isLoading = !loadResult || loadResult.requestKey !== requestKey
  if (isLoading) return { lesson: null, isLoading, loadError: null }

  return { lesson: loadResult.lesson, isLoading, loadError: loadResult.loadError }
}

export default useLessonDetail
