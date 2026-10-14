import { create } from 'zustand'

export const useLessonStore = create((set) => ({
  lessonList: [],
  activeLesson: null,

  setLessonList: (lessonList) => set({ lessonList: Array.isArray(lessonList) ? lessonList : [] }),
  setActiveLesson: (activeLesson) => set({ activeLesson }),
  addLesson: (lesson) => set((state) => ({ lessonList: [...state.lessonList, lesson] })),
}))

export default useLessonStore
