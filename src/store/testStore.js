import { create } from 'zustand'
import { TEST_STATUS } from '../constants/testConstants'

export const useTestStore = create((set) => ({
  testList: [],
  activeTest: null,
  currentQuestion: 0,
  testStatus: TEST_STATUS.IDLE,
  currentAnswers: {},

  setTestList: (testList) => set({ testList: Array.isArray(testList) ? testList : [] }),
  setActiveTest: (activeTest) => set({ activeTest }),
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  setTestStatus: (testStatus) => set({ testStatus }),
  setCurrentAnswers: (answers) => set({ currentAnswers: answers && typeof answers === 'object' ? answers : {} }),
  setCurrentAnswer: (questionId, answer) =>
    set((state) => ({
      currentAnswers: {
        ...state.currentAnswers,
        [questionId]: answer,
      },
    })),
  clearCurrentAnswers: () => set({ currentAnswers: {} }),
}))

export default useTestStore
