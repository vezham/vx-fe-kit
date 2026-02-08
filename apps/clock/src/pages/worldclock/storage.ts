import { WorldClockItem } from './types'

const STORAGE_KEY = 'worldclocks'
const CLOCKS_KEY = 'worldclocks'
const MODAL_KEY = 'worldclock:isModalOpen'
const SELECTED_KEY = 'worldclock:selectedId'

export const loadClocks = (): WorldClockItem[] => {
  const saved = localStorage.getItem(CLOCKS_KEY)
  return saved ? JSON.parse(saved) : []
}

export const saveClocks = (clocks: WorldClockItem[]) => {
  localStorage.setItem(CLOCKS_KEY, JSON.stringify(clocks))
}

export const loadModalState = () => {
  return {
    open: localStorage.getItem(MODAL_KEY) === 'true',
    selectedId: localStorage.getItem(SELECTED_KEY)
  }
}

export const openModalState = (id: number) => {
  localStorage.setItem(SELECTED_KEY, String(id))
  localStorage.setItem(MODAL_KEY, 'true')
}

export const closeModalState = () => {
  localStorage.removeItem(SELECTED_KEY)
  localStorage.setItem(MODAL_KEY, 'false')
}

function read(): WorldClockItem[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function write(data: WorldClockItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getAllClocks(): WorldClockItem[] {
  return read()
}

export function saveAllClocks(clocks: WorldClockItem[]) {
  write(clocks)
}

export function getWorldClockById(id: number) {
  const clocks = read()
  return clocks.find(c => c.id === id) ?? null
}

export function deleteWorldClock(id: number) {
  const clocks = read()
  write(clocks.filter(c => c.id !== id))
}
