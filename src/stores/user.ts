import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: "",
    isSignedIn: false
  }),
  getters: {
    getName: (state) => state.name,
    getIsSignedIn: (state) => state.isSignedIn
  },
})