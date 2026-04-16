import { describe, it, expect } from 'vitest'
import { events, DAYS } from '../events.js'

const VALID_GROUPS = ['all', 'bridesmaids', 'groomsmen', 'cousins-friends', 'individual', null]
const VALID_DAYS = ['apr16', 'apr17', 'apr18', 'apr19']

describe('events', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })
  it('every entry has a valid day', () => {
    events.forEach(e => expect(VALID_DAYS).toContain(e.day))
  })
  it('event entries have non-empty titles', () => {
    events.filter(e => !e.type).forEach(e => {
      expect(typeof e.title).toBe('string')
      expect(e.title.length).toBeGreaterThan(0)
    })
  })
  it('event entries have valid group values', () => {
    events.filter(e => !e.type).forEach(e => {
      expect(VALID_GROUPS).toContain(e.group ?? null)
    })
  })
  it('event ids are unique', () => {
    const ids = events.filter(e => e.id).map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('all four days have events', () => {
    VALID_DAYS.forEach(day => {
      expect(events.filter(e => e.day === day && !e.type).length).toBeGreaterThan(0)
    })
  })
})

describe('DAYS', () => {
  it('has four entries', () => expect(DAYS).toHaveLength(4))
  it('each has id, label, name', () => {
    DAYS.forEach(d => {
      expect(typeof d.id).toBe('string')
      expect(typeof d.label).toBe('string')
      expect(typeof d.name).toBe('string')
    })
  })
})
