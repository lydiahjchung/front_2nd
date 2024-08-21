import { Event } from "../types"

const secInMili = 1000
const minInMili = secInMili * 60

export function getUpcomingEvents(
  events: Event[],
  now: Date,
  notifiedEvents: number[]
) {
  return events.filter((event) => {
    const eventStart = new Date(`${event.date}T${event.startTime}`)
    const timeDiff = (eventStart.getTime() - now.getTime()) / minInMili
    return (
      timeDiff > 0 &&
      timeDiff <= event.notificationTime &&
      !notifiedEvents.includes(event.id)
    )
  })
}

export function createNotificationMessage({ notificationTime, title }: Event) {
  return `${notificationTime}분 후 ${title} 일정이 시작됩니다.`
}
