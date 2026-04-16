import { describe, it, expect, beforeEach } from 'vitest'
import { loadAttended, saveAttended, toggleAttended, STORAGE_KEY } from '../attended.js'

beforeEach(() => { localStorage.clear() })

describe('loadAttended', () => {
  it('returns empty array when nothing stored', () => {
    expect(loadAttended()).toEqual([])
  })
  it('returns stored ids', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['apr17-2', 'apr18-5']))
    expect(loadAttended()).toEqual(['apr17-2', 'apr18-5'])
  })
  it('returns empty array on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json')
    expect(loadAttended()).toEqual([])
  })
})

describe('saveAttended', () => {
  it('writes ids as JSON', () => {
    saveAttended(['apr17-2'])
    expect(localStorage.getItem(STORAGE_KEY)).toBe('["apr17-2"]')
  })
})

describe('toggleAttended', () => {
  it('adds id when not present', () => {
    expect(toggleAttended([], 'apr17-2')).toEqual(['apr17-2'])
  })
  it('removes id when present', () => {
    expect(toggleAttended(['apr17-2', 'apr18-5'], 'apr17-2')).toEqual(['apr18-5'])
  })
  it('does not mutate original array', () => {
    const original = ['apr17-2']
    toggleAttended(original, 'apr18-5')
    expect(original).toEqual(['apr17-2'])
  })
})
