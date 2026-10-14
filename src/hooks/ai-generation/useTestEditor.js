import { useMemo, useState } from 'react'

const QUESTION_TYPES = new Set(['quiz', 'true_false', 'code', 'open'])

const buildNewQuestion = (type = 'quiz') => {
  const baseQuestion = {
    id: `q-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    type,
    questionText: '',
  }

  if (type === 'quiz') {
    return {
      ...baseQuestion,
      answerOptions: ['Variant 1', 'Variant 2', 'Variant 3', 'Variant 4'],
      correctOptionIndex: 0,
    }
  }

  if (type === 'true_false') {
    return {
      ...baseQuestion,
      correctAnswer: true,
    }
  }

  if (type === 'code') {
    return {
      ...baseQuestion,
      starterCode: 'function Example() {\n  // yozing\n}',
    }
  }

  return baseQuestion
}

function useTestEditor(initialQuestionList = []) {
  const [questionList, setQuestionList] = useState(initialQuestionList)

  const validateQuestionList = () => {
    const errors = []

    questionList.forEach((question, index) => {
      const questionNumber = index + 1
      if (!question || typeof question !== 'object') {
        errors.push(`Savol ${questionNumber}: savol ma’lumoti yaroqsiz.`)
        return
      }

      if (!QUESTION_TYPES.has(question.type)) {
        errors.push(`Savol ${questionNumber}: savol turini tanib bo‘lmadi.`)
      }

      if (typeof question.questionText !== 'string' || !question.questionText.trim()) {
        errors.push(`Savol ${questionNumber}: savol matnini kiriting.`)
      }

      if (question.type === 'quiz') {
        const answerOptions = Array.isArray(question.answerOptions) ? question.answerOptions : []
        if (
          answerOptions.length !== 4
          || answerOptions.some((option) => typeof option !== 'string' || !option.trim())
        ) {
          errors.push(`Savol ${questionNumber}: to‘rtta bo‘sh bo‘lmagan javob variantini kiriting.`)
        }
        if (
          !Number.isInteger(question.correctOptionIndex) ||
          question.correctOptionIndex < 0 ||
          question.correctOptionIndex >= answerOptions.length
        ) {
          errors.push(`Savol ${questionNumber}: to‘g‘ri javob variantini tanlang.`)
        }
      }
    })

    if (questionList.length === 0) {
      errors.push('Saqlashdan oldin kamida bitta savol qo‘shing.')
    }

    return errors
  }

  const handleAddQuestion = (type = 'quiz') => {
    setQuestionList((currentList) => [...currentList, buildNewQuestion(type)])
  }

  const handleRemoveQuestion = (questionId) => {
    setQuestionList((currentList) => currentList.filter((question) => question.id !== questionId))
  }

  const handleQuestionChange = (questionId, updatedQuestion) => {
    setQuestionList((currentList) =>
      currentList.map((question) => (question.id === questionId ? { ...question, ...updatedQuestion } : question)),
    )
  }

  const questionCount = useMemo(() => questionList.length, [questionList])

  return {
    questionList,
    questionCount,
    validateQuestionList,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionChange,
  }
}

export default useTestEditor
