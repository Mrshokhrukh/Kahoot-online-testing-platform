import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockLessonList } from '../../mocks/lessonsMock'
import { MOCK_API_DELAY } from '../../constants/appConstants'
import { ROUTES } from '../../constants/routes'

const MIN_CONTENT_LENGTH = 50
const MAX_TOPIC_LENGTH = 30
const GROUP_ID_PARAM = ':groupId'
const LESSON_ID_PARAM = ':lessonId'
const DEFAULT_SUBJECT = 'Dasturlash'
const INITIAL_TEST_STATUS = 'none'

function getTodayIsoDate() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

function getNextLessonNumber(groupId) {
  const groupLessonNumberList = mockLessonList
    .filter((lesson) => lesson.groupId === groupId)
    .map((lesson) => lesson.lessonNumber)
  return groupLessonNumberList.length === 0 ? 1 : Math.max(...groupLessonNumberList) + 1
}

function collectFormErrors({ lessonNumber, lessonTitle, lessonDate, lessonContent }) {
  const formErrors = {}
  if (!(Number(lessonNumber) >= 1)) formErrors.lessonNumber = 'Dars raqami 1 dan kichik bo\'lmasligi kerak'
  if (!lessonTitle.trim()) formErrors.lessonTitle = 'Dars mavzusini kiriting'
  if (!lessonDate) formErrors.lessonDate = 'Dars sanasini tanlang'
  const contentLength = lessonContent.trim().length
  if (contentLength < MIN_CONTENT_LENGTH) {
    formErrors.lessonContent = `Kamida ${MIN_CONTENT_LENGTH} belgi yozing (hozir ${contentLength} ta)`
  }
  return formErrors
}

function saveMockLesson(groupId, formValues) {
  const savedLesson = {
    id: `l${Date.now()}`,
    groupId,
    lessonNumber: Number(formValues.lessonNumber),
    title: formValues.lessonTitle.trim(),
    date: formValues.lessonDate,
    subject: DEFAULT_SUBJECT,
    content: formValues.lessonContent.trim(),
    topics: formValues.topicList,
    testStatus: INITIAL_TEST_STATUS,
  }
  mockLessonList.push(savedLesson)
  return savedLesson
}

function useTopicList() {
  const [topicList, setTopicList] = useState([])
  const [topicInput, setTopicInput] = useState('')

  function addTopic(tag) {
    const normalizedTag = tag.replace(/,/g, '').trim().slice(0, MAX_TOPIC_LENGTH)
    setTopicInput('')
    if (!normalizedTag) return
    setTopicList((currentList) =>
      currentList.includes(normalizedTag) ? currentList : [...currentList, normalizedTag],
    )
  }

  function removeTopic(tag) {
    setTopicList((currentList) => currentList.filter((topic) => topic !== tag))
  }

  return { topicList, topicInput, setTopicInput, addTopic, removeTopic }
}

function useLessonForm(groupId) {
  const navigate = useNavigate()
  const [lessonNumber, setLessonNumber] = useState(() => getNextLessonNumber(groupId))
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonDate, setLessonDate] = useState(getTodayIsoDate)
  const [lessonContent, setLessonContent] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const topicState = useTopicList()

  function validateLessonForm() {
    const nextFormErrors = collectFormErrors({ lessonNumber, lessonTitle, lessonDate, lessonContent })
    setFormErrors(nextFormErrors)
    return Object.keys(nextFormErrors).length === 0
  }

  function handleSaveLesson(shouldGenerateTest) {
    if (isSaving || !validateLessonForm()) return
    setIsSaving(true)
    const formValues = { lessonNumber, lessonTitle, lessonDate, lessonContent, topicList: topicState.topicList }
    setTimeout(() => {
      const savedLesson = saveMockLesson(groupId, formValues)
      const nextRoute = shouldGenerateTest
        ? ROUTES.TEACHER_AI_GENERATE.replace(LESSON_ID_PARAM, savedLesson.id)
        : ROUTES.TEACHER_LESSONS.replace(GROUP_ID_PARAM, groupId)
      navigate(nextRoute)
    }, MOCK_API_DELAY)
  }

  return {
    lessonNumber, setLessonNumber,
    lessonTitle, setLessonTitle,
    lessonDate, setLessonDate,
    lessonContent, setLessonContent,
    ...topicState,
    formErrors, isSaving,
    minContentLength: MIN_CONTENT_LENGTH,
    validateLessonForm, handleSaveLesson,
  }
}

export default useLessonForm
