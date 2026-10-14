import { useNavigate, useParams } from 'react-router-dom'
import AppButton from '../../../components/shared/AppButton'
import AppLayout from '../../../components/shared/AppLayout'
import AppSpinner from '../../../components/shared/AppSpinner'
import LessonContentPanel from '../../../components/ai-generation/LessonContentPanel'
import GenerationSettings from '../../../components/ai-generation/GenerationSettings'
import GeneratingAnimation from '../../../components/ai-generation/GeneratingAnimation'
import ROUTES from '../../../constants/routes'
import useAiGenerate from '../../../hooks/ai-generation/useAiGenerate'

function AiGeneratePage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const {
    generationStatus,
    generationSettings,
    generatedTest,
    handleGenerate,
    handleQuestionCountChange,
    handleTypeToggle,
    handleDifficultyChange,
  } = useAiGenerate(lessonId)

  const handlePreview = () => {
    const previewPath = ROUTES.TEACHER_TEST_PREVIEW.replace(
      ':lessonId',
      encodeURIComponent(lessonId),
    )
    navigate(previewPath, { state: { generatedTest } })
  }

  return (
    <AppLayout className="bg-gray-50">
      <div className="space-y-6">
        {generationStatus === 'loading' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <AppSpinner size="sm" label="AI test yaratish" />
              AI test yaratish jarayoni boshlandi
            </div>
            <GeneratingAnimation />
          </div>
        ) : generationStatus === 'done' && generatedTest ? (
          <>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {generationSettings.questionCount} ta savol yaratildi
            </div>
            <div className="flex flex-wrap gap-3">
              <AppButton label="Previewni ko‘rish" onClick={handlePreview} />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1fr]">
            <LessonContentPanel lessonId={lessonId} />
            <div className="space-y-5">
              <GenerationSettings
                generationSettings={generationSettings}
                onQuestionCountChange={handleQuestionCountChange}
                onTypeToggle={handleTypeToggle}
                onDifficultyChange={handleDifficultyChange}
              />
              <div className="flex justify-end">
                <AppButton
                  label="AI bilan test yaratish"
                  size="lg"
                  onClick={handleGenerate}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default AiGeneratePage
