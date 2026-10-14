import { useEffect, useRef, useState } from 'react'
import { mockGeneratedTest } from '../../mocks/aiMock'

const DEFAULT_SETTINGS = {
  questionCount: mockGeneratedTest.questionList.length,
  types: ['quiz', 'true_false', 'code', 'open'],
  difficulty: 'medium',
}

function getStorageKey(lessonId) {
  return `ai-generation-test:${encodeURIComponent(lessonId)}`
}

export function readGeneratedTest(lessonId) {
  if (!lessonId || typeof window === 'undefined') {
    return { generatedTest: null, error: null }
  }

  try {
    const savedTest = window.sessionStorage.getItem(getStorageKey(lessonId))
    if (!savedTest) {
      return { generatedTest: null, error: null }
    }

    const generatedTest = JSON.parse(savedTest)
    if (generatedTest?.lessonId !== lessonId || !Array.isArray(generatedTest.questionList)) {
      return { generatedTest: null, error: 'Saqlangan test qoralamasi yaroqsiz.' }
    }

    return { generatedTest, error: null }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return {
      generatedTest: null,
      error: `Test qoralamasini o‘qib bo‘lmadi: ${detail}`,
    }
  }
}

export function persistGeneratedTest(lessonId, generatedTest) {
  if (!lessonId || typeof window === 'undefined') {
    return 'Test qoralamasini joriy brauzer sessiyasida saqlab bo‘lmadi.'
  }

  try {
    window.sessionStorage.setItem(getStorageKey(lessonId), JSON.stringify(generatedTest))
    return null
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return `Test qoralamasini joriy brauzer sessiyasida saqlab bo‘lmadi: ${detail}`
  }
}

function useAiGenerate(lessonId) {
  const [generationStatus, setGenerationStatus] = useState('idle')
  const [generationSettings, setGenerationSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    types: [...DEFAULT_SETTINGS.types],
  }))
  const [generatedTest, setGeneratedTest] = useState(null)
  const [generationError, setGenerationError] = useState(null)
  const timeoutRef = useRef(null)
  const availableQuestionCount = mockGeneratedTest.questionList.filter((question) =>
    generationSettings.types.includes(question.type),
  ).length

  const handleQuestionCountChange = (nextValue) => {
    const parsedValue = Number(nextValue)
    const requestedValue = Number.isFinite(parsedValue) ? parsedValue : generationSettings.questionCount
    const clampedValue = Math.min(
      availableQuestionCount,
      Math.max(1, requestedValue),
    )
    setGenerationSettings((currentSettings) => ({
      ...currentSettings,
      questionCount: clampedValue,
    }))
  }

  const handleTypeToggle = (type) => {
    setGenerationSettings((currentSettings) => {
      if (currentSettings.types.includes(type) && currentSettings.types.length === 1) {
        return currentSettings
      }

      const nextTypes = currentSettings.types.includes(type)
        ? currentSettings.types.filter((currentType) => currentType !== type)
        : [...currentSettings.types, type]
      const nextAvailableQuestionCount = mockGeneratedTest.questionList.filter((question) =>
        nextTypes.includes(question.type),
      ).length

      return {
        ...currentSettings,
        types: nextTypes,
        questionCount: Math.min(currentSettings.questionCount, nextAvailableQuestionCount),
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
    if (generationStatus === 'loading') {
      return
    }

    if (!lessonId) {
      setGenerationStatus('error')
      setGenerationError('Dars identifikatori topilmadi. Test yaratish uchun dars sahifasidan kiring.')
      return
    }

    if (generationSettings.types.length === 0) {
      setGenerationStatus('error')
      setGenerationError('Kamida bitta savol turini tanlang.')
      return
    }

    const matchingQuestions = mockGeneratedTest.questionList.filter((question) =>
      generationSettings.types.includes(question.type),
    )
    if (generationSettings.questionCount > matchingQuestions.length) {
      setGenerationStatus('error')
      setGenerationError('Tanlangan sozlamalar uchun namunaviy savollar yetarli emas.')
      return
    }

    setGenerationStatus('loading')
    setGenerationError(null)
    setGeneratedTest(null)

    timeoutRef.current = window.setTimeout(() => {
      const nextTest = {
        ...mockGeneratedTest,
        lessonId,
        difficulty: generationSettings.difficulty,
        requestedQuestionCount: generationSettings.questionCount,
        questionList: matchingQuestions.slice(0, generationSettings.questionCount),
      }
      const storageError = persistGeneratedTest(lessonId, nextTest)

      if (storageError) {
        setGenerationStatus('error')
        setGenerationError(storageError)
        return
      }

      setGeneratedTest(nextTest)
      setGenerationStatus('done')
    }, 3000)
  }

  const resetGeneration = () => {
    window.clearTimeout(timeoutRef.current)
    setGenerationStatus('idle')
    setGeneratedTest(null)
    setGenerationError(null)
  }

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return {
    generationStatus,
    generationSettings,
    generatedTest,
    generationError,
    availableQuestionCount,
    handleGenerate,
    handleQuestionCountChange,
    handleTypeToggle,
    handleDifficultyChange,
    resetGeneration,
  }
}

export default useAiGenerate
