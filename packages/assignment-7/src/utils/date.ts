/**
 * 주어진 월의 일 수를 반환한다
 * @param year 연도
 * @param month 월
 * @returns 주어진 월의 일 수
 */
export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 주어진 날짜가 속한 주의 모든 날짜를 반환한다
 * @param date 날짜
 * @returns 주어진 날짜가 속한 주의 모든 날짜
 */
export const getWeekDates = (date: Date) => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(date.setDate(diff))
  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(monday)
    nextDate.setDate(monday.getDate() + i)
    weekDates.push(nextDate)
  }
  return weekDates
}

/**
 * 주어진 날짜의 주 정보를 올바른 형식으로 반환한다
 * @param date 날짜
 * @returns 주어진 날짜를 주 형식으로 반환
 */
export const formatWeek = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const weekNumber = Math.ceil(date.getDate() / 7)
  return `${year}년 ${month}월 ${weekNumber}주`
}

/**
 * 주어진 날짜의 월 정보를 올바른 형식으로 반환한다
 * @param date 날짜
 * @returns 주어진 날짜를 월 형식으로 반환
 */
export const formatMonth = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${year}년 ${month}월`
}

/**
 * 주어진 날짜가 특정 범위 내에 있는지 정확히 판단한다
 * @param date 날짜
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @returns 주어진 날짜가 특정 범위 내에 있는지 여부
 */
export const isDateInRange = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  return date >= startDate && date <= endDate
}
