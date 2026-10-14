import { create } from 'zustand'

export const useStudentStore = create((set) => ({
  myGroupList: [],
  upcomingTestList: [],
  myResultList: [],

  setMyGroupList: (myGroupList) => set({ myGroupList: Array.isArray(myGroupList) ? myGroupList : [] }),
  setUpcomingTestList: (upcomingTestList) => set({ upcomingTestList: Array.isArray(upcomingTestList) ? upcomingTestList : [] }),
  setMyResultList: (myResultList) => set({ myResultList: Array.isArray(myResultList) ? myResultList : [] }),
  addMyResult: (result) => set((state) => ({ myResultList: [...state.myResultList, result] })),
}))

export default useStudentStore
