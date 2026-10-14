import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import GeneratedTestPreview from '../../../components/ai-generation/GeneratedTestPreview'
import AppButton from '../../../components/shared/AppButton'
import AppLayout from '../../../components/shared/AppLayout'
import ROUTES from '../../../constants/routes'
import { mockTestList } from '../../../mocks/testsMock'
import { useTestStore } from '../../../store/testStore'
import { useGroupStore } from '../../../store/groupStore'
import { useLessonStore } from '../../../store/lessonStore'
import { persistGeneratedTest, readGeneratedTest } from '../../../hooks/ai-generation/useAiGenerate'

function TestPreviewPage() {
  const { lessonId } = useParams()
  return <TestPreviewContent key={lessonId} lessonId={lessonId} />
}

function TestPreviewContent({ lessonId }) {
  const location = useLocation()
  const navigate = useNavigate()
  const setTestList = useTestStore((state) => state.setTestList)
  const upsertTest = useTestStore((state) => state.upsertTest)
  const activeLesson = useLessonStore((state) =>
    state.activeLesson?.id === lessonId ? state.activeLesson : null,
  )
  const activeGroup = useGroupStore((state) => {
    const groupId = activeLesson?.groupId
    return state.groupList.find((group) => group.id === groupId)
      || (state.activeGroup?.id === groupId ? state.activeGroup : null)
  })
  const [storedDraft] = useState(() => readGeneratedTest(lessonId))
  const routeDraft = location.state?.generatedTest?.lessonId === lessonId
    ? location.state.generatedTest
    : null
  const generatedTest = routeDraft || storedDraft.generatedTest
  const [storageError, setStorageError] = useState(storedDraft.error)
  const hasGeneratedTest = Array.isArray(generatedTest?.questionList)

  const handleReturnToGeneration = () => {
    const generatePath = ROUTES.TEACHER_AI_GENERATE.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(generatePath)
  }

  const handleEdit = () => {
    const storageErrorMessage = persistGeneratedTest(lessonId, generatedTest)
    setStorageError(storageErrorMessage)
    if (storageErrorMessage) {
      return
    }

    const editPath = ROUTES.TEACHER_TEST_EDIT.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(editPath, { state: { generatedTest } })
  }

  const handleContinue = () => {
    if (!lessonId || !generatedTest || !hasGeneratedTest) {
      setStorageError('Test ma’lumoti topilmadi. Davom etish uchun testni qayta yarating.')
      return
    }

    const storageErrorMessage = persistGeneratedTest(lessonId, generatedTest)
    setStorageError(storageErrorMessage)
    if (storageErrorMessage) {
      return
    }

    if (useTestStore.getState().testList.length === 0) {
      setTestList(mockTestList)
    }

    const scheduledDate = new Date()
    scheduledDate.setDate(scheduledDate.getDate() + 1)
    const scheduledAt = `${scheduledDate.getFullYear()}-${String(scheduledDate.getMonth() + 1).padStart(2, '0')}-${String(scheduledDate.getDate()).padStart(2, '0')}T18:00:00`
    const testId = `generated-${lessonId}`

    upsertTest({
      id: testId,
      name: `${activeLesson?.title || `Dars ${lessonId}`} testi`,
      lessonId,
      groupName: activeGroup?.name || 'Guruh',
      groupId: activeLesson?.groupId || activeGroup?.id || 'g1',
      status: 'scheduled',
      scheduledAt,
      studentCount: 0,
      questionCount: generatedTest.questionList.length,
      durationMinutes: 30,
      questionList: generatedTest.questionList,
      difficulty: generatedTest.difficulty,
      generationMode: generatedTest.generationMode,
    })
    navigate(ROUTES.TEACHER_TEST_CONFIG.replace(':testId', encodeURIComponent(testId)))
  }

  return (
    <AppLayout className="bg-gray-50">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Preview</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Testni ko‘rib chiqish</h1>
        </div>

        {(storageError || storedDraft.error) && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {storageError || storedDraft.error}
          </div>
        )}

        {hasGeneratedTest ? (
          <GeneratedTestPreview
            lessonId={lessonId}
            questionList={generatedTest.questionList}
            difficulty={generatedTest.difficulty}
            requestedQuestionCount={generatedTest.requestedQuestionCount}
            generationMode={generatedTest.generationMode}
            onEdit={handleEdit}
            onContinue={handleContinue}
          />
        ) : (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm text-yellow-800">
              {storedDraft.error || 'Test ma’lumoti topilmadi.'} Testni qayta yaratib previewga o‘ting.
            </p>
            <AppButton
              label="Test yaratishga qaytish"
              onClick={handleReturnToGeneration}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default TestPreviewPage
