import { create } from 'zustand'

type Store = {
  user: boolean
  login: () => void
  logout: () => void
}

export const useUserStore = create<Store>()((set) => ({
  user: false,
  login: () => set((state) => ({ user: true })),
  logout: () => set((state) => ({ user: false })),
}))