import { describe, test, expect } from "vitest"
import {
  getDaysInMonth,
  getWeekDates,
  formatWeek,
  formatMonth,
  isDateInRange,
} from "../utils/date"

describe("단위 테스트: 날짜 및 시간 관리", () => {
  describe("getDaysInMonth 함수", () => {
    test("주어진 월의 일 수를 정확히 반환한다", () => {
      // February 2024 - 29 days
      expect(getDaysInMonth(2024, 1)).toBe(29)

      // July 2024 - 31 days
      expect(getDaysInMonth(2024, 6)).toBe(31)

      // February 2025 - 28 days
      expect(getDaysInMonth(2025, 1)).toBe(28)

      // January 2025 - 31 days
      expect(getDaysInMonth(2024, 12)).toBe(31)
    })
  })

  describe("getWeekDates 함수", () => {
    test("주어진 날짜가 속한 주의 모든 날짜를 반환한다", () => {
      // July 1, 2024
      expect(getWeekDates(new Date(2024, 6, 1))).toStrictEqual([
        new Date(2024, 6, 1),
        new Date(2024, 6, 2),
        new Date(2024, 6, 3),
        new Date(2024, 6, 4),
        new Date(2024, 6, 5),
        new Date(2024, 6, 6),
        new Date(2024, 6, 7),
      ])
    })
  })

  describe("formatWeek 함수", () => {
    test("주어진 날짜의 주 정보를 올바른 형식으로 반환한다", () => {
      // March 2024 - Week 1
      expect(formatWeek(new Date(2024, 2, 1))).toBe("2024년 3월 1주")
    })
  })

  describe("formatMonth 함수", () => {
    test("주어진 날짜의 월 정보를 올바른 형식으로 반환한다", () => {
      // March 2024
      expect(formatMonth(new Date(2024, 2, 1))).toBe("2024년 3월")
    })
  })

  describe("isDateInRange 함수", () => {
    test("주어진 날짜가 특정 범위 내에 있는지 정확히 판단한다", () => {
      // March 1, 2024
      expect(
        isDateInRange(
          new Date(2024, 2, 1),
          new Date(2024, 2, 1),
          new Date(2024, 2, 1)
        )
      ).toBe(true)
    })
  })
})
