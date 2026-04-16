export const STORAGE_KEY = 'wedding-attended'

export function loadAttended() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveAttended(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function toggleAttended(ids, id) {
  return ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
}
