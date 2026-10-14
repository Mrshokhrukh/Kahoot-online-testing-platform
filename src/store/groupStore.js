import { create } from 'zustand'

export const useGroupStore = create((set) => ({
  groupList: [],
  activeGroup: null,

  setGroupList: (groupList) => set({ groupList: Array.isArray(groupList) ? groupList : [] }),
  setActiveGroup: (activeGroup) => set({ activeGroup }),
  addGroup: (group) => set((state) => ({ groupList: [...state.groupList, group] })),
  removeGroup: (groupId) => set((state) => ({
    groupList: state.groupList.filter((group) => group.id !== groupId),
    activeGroup: state.activeGroup?.id === groupId ? null : state.activeGroup,
  })),
}))

export default useGroupStore
