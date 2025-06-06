"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Plus, X, Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import BookmarkList from "./bookmark-list"
import SimpleCalendar from "./SimpleCalendar"

interface Company {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
}

export default function JobCalendarView() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentHoverCompany, setCurrentHoverCompany] = useState<Company | null>(null)
  const [bookmarkedCompanies, setBookmarkedCompanies] = useState<Company[]>([
    {
      id: "1",
      title: "네이버",
      start: new Date(2025, 4, 5),
      end: new Date(2025, 4, 20),
      color: "#4f46e5",
    },
    {
      id: "2",
      title: "카카오",
      start: new Date(2025, 4, 10),
      end: new Date(2025, 4, 25),
      color: "#f59e0b",
    },
    {
      id: "3",
      title: "라인",
      start: new Date(2025, 4, 15),
      end: new Date(2025, 5, 5),
      color: "#10b981",
    },
    {
      id: "4",
      title: "쿠팡",
      start: new Date(2025, 4, 20),
      end: new Date(2025, 5, 10),
      color: "#ef4444",
    },
    {
      id: "5",
      title: "당근마켓",
      start: new Date(2025, 4, 25),
      end: new Date(2025, 5, 15),
      color: "#8b5cf6",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newCompany, setNewCompany] = useState({
    title: "",
    start: null as Date | null,
    end: null as Date | null,
  })

  // 이벤트 상세 정보 모달
  const [selectedEvent, setSelectedEvent] = useState<Company | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)

  // 캘린더 날짜 상태 추가
  const [calendarDate, setCalendarDate] = useState(new Date())

  const handleDeleteCompany = (id: string) => {
    setBookmarkedCompanies((prev) => prev.filter((company) => company.id !== id))
  }

  const handleCompanyMouseEnter = (company: Company) => {
    setCurrentHoverCompany(company)
  }

  const handleCompanyMouseLeave = () => {
    setCurrentHoverCompany(null)
  }

  const handleEventClick = (company: Company) => {
    setSelectedEvent(company)
    setShowEventDetails(true)
  }

  // 공고 클릭 핸들러 추가
  const handleCompanyClick = (company: Company) => {
    // 공고 시작일로 캘린더 날짜 변경
    setCalendarDate(new Date(company.start))
    // 선택된 이벤트 설정 및 상세 정보 모달 표시
    setSelectedEvent(company)
    setShowEventDetails(true)
  }

  const handleAddCompany = () => {
    if (!newCompany.title || !newCompany.start || !newCompany.end) {
      // 실제 구현에서는 Toast 등으로 사용자에게 알림
      console.error("모든 정보를 입력해주세요.")
      return
    }

    if (newCompany.start > newCompany.end) {
      // 실제 구현에서는 Toast 등으로 사용자에게 알림
      console.error("시작일은 마감일보다 앞서야 합니다.")
      return
    }

    const colors = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newCompanyWithId: Company = {
      ...newCompany,
      id: Date.now().toString(),
      color: randomColor,
    }

    setBookmarkedCompanies((prev) => [...prev, newCompanyWithId])
    setNewCompany({
      title: "",
      start: null,
      end: null,
    })
    setShowAddForm(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2 text-indigo-500" />
          공고 캘린더
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 북마크 목록 */}
        <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm lg:col-span-1 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
              <BookmarkIcon className="w-5 h-5 mr-2 text-indigo-500" />
              북마크한 공고
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? <X className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
              {showAddForm ? "취소" : "공고 추가"}
            </Button>
          </div>

          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">회사명</label>
                  <Input
                    placeholder="회사명을 입력하세요"
                    value={newCompany.title}
                    onChange={(e) => setNewCompany({ ...newCompany, title: e.target.value })}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">시작일</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newCompany.start ? format(newCompany.start, "PPP", { locale: ko }) : <span>시작일 선택</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={newCompany.start || undefined}
                        onSelect={(date) => setNewCompany({ ...newCompany, start: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">마감일</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newCompany.end ? format(newCompany.end, "PPP", { locale: ko }) : <span>마감일 선택</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={newCompany.end || undefined}
                        onSelect={(date) => setNewCompany({ ...newCompany, end: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  onClick={handleAddCompany}
                >
                  추가하기
                </Button>
              </div>
            </motion.div>
          )}

          <BookmarkList
            companies={bookmarkedCompanies}
            onDelete={handleDeleteCompany}
            onCompanyMouseEnter={handleCompanyMouseEnter}
            onCompanyMouseLeave={handleCompanyMouseLeave}
            onCompanyClick={handleCompanyClick}
          />
        </Card>

        {/* 캘린더 */}
        <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm lg:col-span-2 overflow-hidden">
          <SimpleCalendar
            currentHoverCompany={currentHoverCompany}
            bookmarkedCompanies={bookmarkedCompanies}
            onEventClick={handleEventClick}
            currentDate={calendarDate}
            onDateChange={setCalendarDate}
          />
        </Card>
      </div>

      {/* 이벤트 상세 정보 모달 */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedEvent.color || "#4f46e5" }}
                  ></div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">{selectedEvent.title}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-start gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">지원 기간</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(selectedEvent.start, "yyyy년 MM월 dd일", { locale: ko })} ~{" "}
                      {format(selectedEvent.end, "yyyy년 MM월 dd일", { locale: ko })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">상태</p>
                    <div className="mt-1">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        지원 가능
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">메모</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      메모가 없습니다. 메모를 추가해보세요.
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                  onClick={() => {
                    handleDeleteCompany(selectedEvent.id)
                    setShowEventDetails(false)
                  }}
                >
                  삭제
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  onClick={() => setShowEventDetails(false)}
                >
                  확인
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// BookmarkIcon 컴포넌트
function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}
