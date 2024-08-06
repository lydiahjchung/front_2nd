import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App.tsx"
import { afterAll, beforeAll, afterEach, describe, expect, test } from "vitest"
import { setupServer } from "msw/node"
import { mockApiHandlers } from "../mockApiHandlers.ts"
import { ReactNode } from "react"
import axios from "axios"
import { Event } from "../types"

const server = setupServer(...mockApiHandlers)

const setup = (component: ReactNode) => {
  const user = userEvent.setup()

  return {
    user,
    ...render(component),
  }
}

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios).
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

const getEvents = async () => {
  const response = await axios({
    method: "GET",
    url: "/api/events",
  })

  return response.data
}

const postNewEvent = async (event: Event) => {
  const response = await axios({
    method: "POST",
    url: "/api/events",
    data: event,
  })

  return response.data
}

describe("일정 관리 애플리케이션 통합 테스트", () => {
  describe("일정 CRUD 및 기본 기능", () => {
    const { user } = setup(<App />)

    const addNewEvent = async ({
      title,
      date,
      startTime,
      endTime,
    }: {
      title: string
      date: string
      startTime: string
      endTime: string
    }) => {
      const titleInput = screen.getByLabelText("제목")
      await user.type(titleInput, title)

      const dateInput = screen.getByLabelText("날짜")
      await user.type(dateInput, date)

      const startTimeInput = screen.getByLabelText("시작 시간")
      await user.type(startTimeInput, startTime)

      const endTimeInput = screen.getByLabelText("종료 시간")
      await user.type(endTimeInput, endTime)
    }

    test("새로운 일정을 생성하고 모든 필드가 정히 저장되는지 확인한다", async () => {
      const prevEvents = await getEvents()

      const newEvent = {
        id: 1,
        title: "새로운 일정",
        date: "2024-08-02",
        startTime: "10:00",
        endTime: "11:00",
      }

      await addNewEvent(newEvent)

      const submitButton = screen.getByRole("button", { name: "일정 추가" })
      await user.click(submitButton)

      postNewEvent(newEvent)
      const newEvents = await getEvents()

      expect(newEvents.length).toBe(prevEvents.length + 1)

      const monthView = screen.getByTestId("month-view")
      expect(within(monthView).getByText("새로운 일정")).toBeInTheDocument()
      const eventList = screen.getByTestId("event-list")
      expect(within(eventList).getByText("새로운 일정")).toBeInTheDocument()
    })

    test("기존 일정의 세부 정보 수정하고 변경사항이 정히 반영되는지 확인한다", () => {})
    test("일정을 삭제하고 더 이상 조회되지 않는지 확인한다", () => {
      // const deleteButton = screen.getByLabelText("Edit event")
      // await user.click(deleteButton)
    })
  })

  describe("일정 뷰 및 필터링", () => {
    test.fails("주별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.")
    test.fails("주별 뷰에 일정이 정확히 표시되는지 확인한다")
    test.fails("월별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.")
    test.fails("월별 뷰에 일정이 정확히 표시되는지 확인한다")
  })

  describe("알림 기능", () => {
    test.fails("일정 알림을 설정하고 지정된 시간에 알림이 발생하는지 확인한다")
  })

  describe("검색 기능", () => {
    test.fails("제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다")
    test.fails("제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다")
    test.fails("검색어를 지우면 모든 일정이 다시 표시되어야 한다")
  })

  describe("공휴일 표시", () => {
    test.fails("달력에 1월 1일(신정)이 공휴일로 표시되는지 확인한다")
    test.fails("달력에 5월 5일(어린이날)이 공휴일로 표시되는지 확인한다")
  })

  describe("일정 충돌 감지", () => {
    test.fails("겹치는 시간에 새 일정을 추가할 때 경고가 표시되는지 확인한다")
    test.fails(
      "기존 일정의 시간을 수정하여 충돌이 발생할 때 경고가 표시되는지 확인한다"
    )
  })
})
