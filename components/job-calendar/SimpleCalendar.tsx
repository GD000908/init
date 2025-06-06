"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, Home } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns"
import { ko } from "date-fns/locale"

interface Company {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
}

interface SimpleCalendarProps {
  currentHoverCompany: Company | null
  bookmarkedCompanies: Company[]
  onEventClick?: (company: Company) => void
  currentDate?: Date
  onDateChange?: (date: Date) => void
}

export default function SimpleCalendar({
  currentHoverCompany,
  bookmarkedCompanies,
  onEventClick,
  currentDate: externalCurrentDate,
  onDateChange,
}: SimpleCalendarProps) {
  const [internalCurrentDate, setInternalCurrentDate] = useState(new Date())

  // 외부에서 제공된 날짜가 있으면 그것을 사용, 없으면 내부 상태 사용
  const currentDate = externalCurrentDate || internalCurrentDate

  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  // 캘린더 날짜 계산
  useEffect(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = new Date(monthStart)
    const endDate = new Date(monthEnd)

    // 첫 주의 시작일 계산 (이전 달의 날짜 포함)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    // 마지막 주의 종료일 계산 (다음 달의 날짜 포함)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    setCalendarDays(days)
  }, [currentDate])

  // 이전 달로 이동
  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1)
    if (onDateChange) {
      onDateChange(newDate)
    } else {
      setInternalCurrentDate(newDate)
    }
  }

  // 다음 달로 이동
  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1)
    if (onDateChange) {
      onDateChange(newDate)
    } else {
      setInternalCurrentDate(newDate)
    }
  }

  // 오늘로 이동
  const goToToday = () => {
    const today = new Date()
    if (onDateChange) {
      onDateChange(today)
    } else {
      setInternalCurrentDate(today)
    }
  }

  // 특정 날짜에 해당하는 이벤트 찾기
  const getEventsForDay = (day: Date) => {
    return bookmarkedCompanies.filter((company) =>
      isWithinInterval(day, {
        start: new Date(company.start.setHours(0, 0, 0, 0)),
        end: new Date(company.end.setHours(23, 59, 59, 999)),
      }),
    )
  }

  // 요일 헤더
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">공고 일정</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
            {format(currentDate, "yyyy년 MM월", { locale: ko })}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-xl text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            onClick={goToToday}
          >
            <Home className="h-4 w-4 mr-1" />
            오늘
          </Button>
        </div>
      </div>

      <div className="calendar-container h-[700px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 overflow-auto">
        <div className="grid grid-cols-7 gap-1">
          {/* 요일 헤더 */}
          {weekdays.map((day, index) => (
            <div
              key={`weekday-${index}`}
              className={`text-center py-2 text-sm font-medium ${
                index === 0
                  ? "text-red-500 dark:text-red-400"
                  : index === 6
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {day}
            </div>
          ))}

          {/* 날짜 그리드 */}
          {calendarDays.map((day, index) => {
            const isToday = isSameDay(day, new Date())
            const isCurrentMonth = isSameMonth(day, currentDate)
            const events = getEventsForDay(day)
            const isHighlighted = currentHoverCompany && events.some((event) => event.id === currentHoverCompany.id)

            return (
              <div
                key={`day-${index}`}
                className={`relative min-h-[80px] p-1 border transition-all ${
                  isCurrentMonth
                    ? isToday
                      ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20"
                      : isHighlighted
                        ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10"
                        : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    : "border-transparent bg-gray-50/50 dark:bg-gray-900/20 text-gray-400 dark:text-gray-600"
                }`}
              >
                <div
                  className={`text-xs font-medium ${
                    isCurrentMonth
                      ? day.getDay() === 0
                        ? "text-red-500 dark:text-red-400"
                        : day.getDay() === 6
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {format(day, "d")}
                </div>

                {/* 이벤트 표시 */}
                <div className="mt-1 space-y-1">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={`${day.toISOString()}-${event.id}`}
                      className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer transition-colors ${
                        currentHoverCompany && currentHoverCompany.id === event.id
                          ? "opacity-100 font-medium"
                          : "opacity-80"
                      }`}
                      style={{
                        backgroundColor: `${event.color}20`,
                        color: event.color,
                        borderLeft: `2px solid ${event.color}`,
                      }}
                      onClick={() => onEventClick && onEventClick(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
                      +{events.length - 3}개 더보기
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
