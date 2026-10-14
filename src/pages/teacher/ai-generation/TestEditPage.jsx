import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import AppButton from '../../../components/shared/AppButton'
import AppCard from '../../../components/shared/AppCard'
import AppLayout from '../../../components/shared/AppLayout'
import AppModal from '../../../components/shared/AppModal'
import QuestionEditorWrapper from '../../../components/ai-generation/QuestionEditorWrapper'
import ROUTES from '../../../constants/routes'
import useTestEditor from '../../../hooks/ai-generation/useTestEditor'
import { persistGeneratedTest, readGeneratedTest } from '../../../hooks/ai-generation/useAiGenerate'

const TYPE_OPTIONS = [
  { value: 'quiz', label: 'Quiz' },
  { value: 'true_false', label: 'T/F' },
  { value: 'code', label: 'Kod' },
  { value: 'open', label: 'Ochiq' },
]

function TestEditPage() {
  const { lessonId } = useParams()
  return <TestEditContent key={lessonId} lessonId={lessonId} />
}

function TestEditContent({ lessonId }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [storedDraft] = useState(() => readGeneratedTest(lessonId))
  const routeDraft = location.state?.generatedTest?.lessonId === lessonId
    ? location.state.generatedTest
    : null
  const generatedTest = routeDraft || storedDraft.generatedTest
  const hasGeneratedTest = Array.isArray(generatedTest?.questionList)
  const {
    questionList,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionChange,
    validateQuestionList,
  } = useTestEditor(hasGeneratedTest ? generatedTest.questionList : [])

  const [selectedType, setSelectedType] = useState('quiz')
  const [validationErrors, setValidationErrors] = useState([])
  const [storageError, setStorageError] = useState(storedDraft.error)
  const [questionToRemove, setQuestionToRemove] = useState(null)

  const handleSave = () => {
    const nextValidationErrors = validateQuestionList()
    setValidationErrors(nextValidationErrors)
    if (nextValidationErrors.length > 0 || !hasGeneratedTest) {
      return
    }

    const updatedTest = { ...generatedTest, lessonId, questionList }
    const nextStorageError = persistGeneratedTest(lessonId, updatedTest)
    setStorageError(nextStorageError)
    if (nextStorageError) {
      return
    }

    const previewPath = ROUTES.TEACHER_TEST_PREVIEW.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(previewPath, {
      state: { generatedTest: updatedTest },
    })
  }

  const handleReturnToGeneration = () => {
    const generatePath = ROUTES.TEACHER_AI_GENERATE.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(generatePath)
  }

  const handleQuestionRemove = () => {
    if (!questionToRemove) {
      return
    }
    handleRemoveQuestion(questionToRemove.id)
    setQuestionToRemove(null)
  }

  return (
    <AppLayout className="bg-gray-50">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Tahrirlash</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Savollarni tahrirlash</h1>
          </div>

          {hasGeneratedTest && (
            <div className="flex items-center gap-2">
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {TYPE_OPTIONS.map((typeOption) => (
                  <option key={typeOption.value} value={typeOption.value}>
                    {typeOption.label}
                  </option>
                ))}
              </select>
              <AppButton
                label="Savol qo‘shish"
                variant="secondary"
                onClick={() => handleAddQuestion(selectedType)}
                className="whitespace-nowrap"
              />
            </div>
          )}
        </div>

        {storageError && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {storageError} O‘zgarishlarni sahifalar orasida saqlab bo‘lmasligi mumkin.
          </div>
        )}

        {!hasGeneratedTest ? (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm text-yellow-800">
              {storedDraft.error || 'Tahrirlash uchun test ma’lumoti topilmadi.'}
              {' '}Avval test yarating va previewdan tahrirlash sahifasiga o‘ting.
            </p>
            <AppButton
              label="Test yaratishga qaytish"
              onClick={handleReturnToGeneration}
              className="mt-4"
            />
          </div>
        ) : (
          <>
            {validationErrors.length > 0 && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-semibold">Testni saqlashdan oldin quyidagilarni tuzating:</p>
                <ul className="mt-2 list-inside list-disc">
                  {validationErrors.map((error) => <li key={error}>{error}</li>)}
                </ul>
              </div>
            )}
            <div className="space-y-4">
              {questionList.length === 0 ? (
                <AppCard className="p-6 text-center text-gray-500">
                  Hozircha savollar mavjud emas. Yangi savol qo‘shing.
                </AppCard>
              ) : (
                questionList.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setQuestionToRemove(question)}
                        className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        O‘chirish
                      </button>
                    </div>
                    <QuestionEditorWrapper
                      question={question}
                      index={index}
                      onChange={(nextQuestion) => handleQuestionChange(question.id, nextQuestion)}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <AppButton
                label={
                  <span className="inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Saqlash
                  </span>
                }
                onClick={handleSave}
              />
            </div>
          </>
        )}
      </div>
      <AppModal
        isOpen={Boolean(questionToRemove)}
        onClose={() => setQuestionToRemove(null)}
        title="Savolni o‘chirish?"
      >
        <p className="text-sm text-gray-600">
          “{questionToRemove?.questionText || 'Yangi savol'}” testdan o‘chiriladi.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AppButton
            label="Bekor qilish"
            variant="secondary"
            onClick={() => setQuestionToRemove(null)}
          />
          <AppButton label="O‘chirish" variant="danger" onClick={handleQuestionRemove} />
        </div>
      </AppModal>
    </AppLayout>
  )
}

export default TestEditPage
