import { useState } from 'react'
import { mockGeneratedTest } from '../../mocks/aiMock'

const DEFAULT_SETTINGS = {
  questionCount: 20,
  types: ['quiz', 'true_false', 'code', 'open'],
  difficulty: 'medium',
}

function useAiGenerate(lessonId) {
  const [generationStatus, setGenerationStatus] = useState('idle')
  const [generationSettings, setGenerationSettings] = useState(DEFAULT_SETTINGS)
  const [generatedTest, setGeneratedTest] = useState(null)

  const handleQuestionCountChange = (nextValue) => {
    const clampedValue = Math.min(30, Math.max(5, Number(nextValue) || 20))
    setGenerationSettings((currentSettings) => ({
      ...currentSettings,
      questionCount: clampedValue,
    }))
  }

  const handleTypeToggle = (type) => {
    setGenerationSettings((currentSettings) => {
      const nextTypes = currentSettings.types.includes(type)
        ? currentSettings.types.filter((currentType) => currentType !== type)
        : [...currentSettings.types, type]

      return {
        ...currentSettings,
        types: nextTypes,
      }
    })
  }

  const handleDifficultyChange = (nextDifficulty) => {
    setGenerationSettings((currentSettings) => ({
      ...currentSettings,
      difficulty: nextDifficulty,
    }))
  }

  const handleGenerate = () => {
    setGenerationStatus('loading')
    setGeneratedTest(null)

    window.setTimeout(() => {
      setGeneratedTest({
        ...mockGeneratedTest,
        lessonId,
        questionList: mockGeneratedTest.questionList.slice(
          0,
          Math.min(generationSettings.questionCount, mockGeneratedTest.questionList.length),
        ),
      })
      setGenerationStatus('done')
    }, 3000)
  }

  const resetGeneration = () => {
    setGenerationStatus('idle')
    setGeneratedTest(null)
  }

  return {
    generationStatus,
    generationSettings,
    generatedTest,
    handleGenerate,
    handleQuestionCountChange,
    handleTypeToggle,
    handleDifficultyChange,
    resetGeneration,
  }
}

export default useAiGenerate
