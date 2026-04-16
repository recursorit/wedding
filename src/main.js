import Alpine from 'alpinejs'
import './style.css'
import { events, DAYS } from './events.js'
import { loadAttended, saveAttended, toggleAttended } from './attended.js'

Alpine.data('weddingApp', () => ({
  days: DAYS,
  activeDay: 'apr17',
  attended: [],

  init() {
    this.attended = loadAttended()
  },

  eventsForDay(day) {
    return events.filter(e => e.day === day)
  },

  isAttended(id) {
    return this.attended.includes(id)
  },

  toggle(id) {
    this.attended = toggleAttended(this.attended, id)
    saveAttended(this.attended)
  },

  cardClass(event) {
    const classes = ['event-card']
    if (event.group === 'all' || event.group === 'cousins-friends') classes.push('highlight-gold')
    else if (event.group === 'bridesmaids') classes.push('highlight-pink')
    else if (event.group === 'groomsmen') classes.push('highlight-blue')
    if (event.id && this.isAttended(event.id)) classes.push('attended')
    return classes.join(' ')
  },

  formatTime(event) {
    if (!event.time) return ''
    return event.endTime ? `${event.time} – ${event.endTime}` : event.time
  },
}))

Alpine.start()
