import { create } from 'zustand'
import { selectedStackSchema } from '../schemas/stack'
import type { SelectedStackItem } from '../schemas/stack'

const storageKey = 'stacksum:selected-stack'
const load = (): SelectedStackItem[] => {
  if (typeof window === 'undefined') return []
  try {
    return selectedStackSchema.catch([]).parse(JSON.parse(window.localStorage.getItem(storageKey) ?? '[]'))
  } catch {
    return []
  }
}
const persist = (items: SelectedStackItem[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(items))
  }
}

type StackState = {
  items: SelectedStackItem[]
  hydrated: boolean
  hydrate: () => void
  selectPlan: (item: SelectedStackItem) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useStackStore = create<StackState>((set) => ({
  items: [],
  hydrated: false,
  hydrate: () => set({ items: load(), hydrated: true }),
  selectPlan: (item) =>
    set((state) => {
      const next = [...state.items.filter((existing) => existing.productId !== item.productId), item]
      persist(next)
      return { items: next }
    }),
  remove: (productId) =>
    set((state) => {
      const next = state.items.filter((item) => item.productId !== productId)
      persist(next)
      return { items: next }
    }),
  clear: () =>
    set(() => {
      persist([])
      return { items: [] }
    }),
}))
