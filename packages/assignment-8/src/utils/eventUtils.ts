import { Event } from "../types"
import { getWeekDates, isDateInRange } from "./dateUtils"

function filterEventsByDateRange(
  events: Event[],
  start: Date,
  end: Date
): Event[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date)
    return isDateInRange(eventDate, start, end)
  })
}

function containsTerm(target: string, term: string) {
  return target.toLowerCase().includes(term.toLowerCase())
}

function searchEvents(events: Event[], term: string) {
  return events.filter(
    ({ title, description, location }) =>
      containsTerm(title, term) ||
      containsTerm(description, term) ||
      containsTerm(location, term)
  )
}

function filterEventsByDateRangeAtWeek(events: Event[], currentDate: Date) {
  const weekDates = getWeekDates(currentDate)
  return filterEventsByDateRange(events, weekDates[0], weekDates[6])
}

function filterEventsByDateRangeAtMonth(events: Event[], currentDate: Date) {
  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const monthEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
  return filterEventsByDateRange(events, monthStart, monthEnd)
}

export function getFilteredEvents(
  events: Event[],
  searchTerm: string,
  currentDate: Date,
  view: "week" | "month"
): Event[] {
  const searchedEvents = searchEvents(events, searchTerm)

  if (view === "week") {
    return filterEventsByDateRangeAtWeek(searchedEvents, currentDate)
  }

  if (view === "month") {
    return filterEventsByDateRangeAtMonth(searchedEvents, currentDate)
  }

  return searchedEvents
}

export function getRepeatedEvents(event: Event) {
  const { type, interval, endDate } = event.repeat
  const startDate = new Date(event.date)

  const repeatedEvents = []

  if (type === "none") return [event]

  if (endDate) {
    const currentDate = new Date(startDate)
    const finalDate = new Date(endDate)

    while (currentDate <= finalDate) {
      repeatedEvents.push({
        ...event,
        date: new Date(currentDate).toISOString().split("T")[0],
      })

      if (type === "daily") {
        currentDate.setDate(currentDate.getDate() + interval)
      } else if (type === "weekly") {
        currentDate.setDate(currentDate.getDate() + interval * 7)
      } else if (type === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + interval)
      } else if (type === "yearly") {
        currentDate.setFullYear(currentDate.getFullYear() + interval)
      }
    }

    return repeatedEvents
  }

  return [event]
}
