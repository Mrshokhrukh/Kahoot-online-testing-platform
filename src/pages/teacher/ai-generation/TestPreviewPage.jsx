import { useLocation, useNavigate, useParams } from 'react-router-dom'
import GeneratedTestPreview from '../../../components/ai-generation/GeneratedTestPreview'
import AppButton from '../../../components/shared/AppButton'
import AppLayout from '../../../components/shared/AppLayout'
import ROUTES from '../../../constants/routes'

function TestPreviewPage() {
  const { lessonId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const generatedTest = location.state?.generatedTest
  const hasGeneratedTest = Array.isArray(generatedTest?.questionList)

  const handleReturnToGeneration = () => {
    const generatePath = ROUTES.TEACHER_AI_GENERATE.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(generatePath)
  }

  const handleEdit = () => {
    const editPath = ROUTES.TEACHER_TEST_EDIT.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(editPath, { state: { generatedTest } })
  }

  const handleContinue = () => {
    navigate(ROUTES.TEACHER_TEST_CONFIG.replace(':testId', 'new-test-id'))
  }

  return (
    <AppLayout className="bg-gray-50">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Preview</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Testni ko‘rib chiqish</h1>
        </div>

        {hasGeneratedTest ? (
          <GeneratedTestPreview
            lessonId={lessonId}
            questionList={generatedTest.questionList}
            onEdit={handleEdit}
            onContinue={handleContinue}
          />
        ) : (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm text-yellow-800">
              Test ma’lumoti topilmadi. Sahifani yangilagan yoki to‘g‘ridan-to‘g‘ri ochgan
              bo‘lsangiz, testni qayta yaratib previewga o‘ting.
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
