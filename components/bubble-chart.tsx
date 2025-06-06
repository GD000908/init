"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Settings, BarChart2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Bell, AlertCircle, Heart, MessageSquare, CheckSquare, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BarData {
  label: string
  count: number
  color: string
}

interface Company {
  name: string
  jobCategory: string
}

interface JobPosting {
  id: number
  title: string
  company: string
  date: Date
  color: string
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface BubbleChartProps {
  companies: Company[]
  onAddCompany: (name: string, jobCategory: string) => void
  onRemoveCompany: (index: number) => void
}

export default function BubbleChart({ companies, onAddCompany, onRemoveCompany }: BubbleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [newCompany, setNewCompany] = useState("")
  const [selectedJobCategory, setSelectedJobCategory] = useState("")
  const [isFlipped, setIsFlipped] = useState(true) // 첫 화면에서 그래프 표시

  // 애니메이션 관련 상태 변수
  const animationRef = useRef<number | null>(null)
  const animationProgressRef = useRef(0)

  // 현재 날짜 관련 상태
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  // 공고 더미 데이터 - 색상 추가
  const jobPostings: JobPosting[] = [
    { id: 1, title: "프론트엔드 개발자", company: "네이버", date: new Date(2025, 4, 5), color: "#4f46e5" },
    { id: 2, title: "백엔드 개발자", company: "카카오", date: new Date(2025, 4, 10), color: "#f59e0b" },
    { id: 3, title: "풀스택 개발자", company: "라인", date: new Date(2025, 4, 15), color: "#10b981" },
    { id: 4, title: "UI/UX 디자이너", company: "쿠팡", date: new Date(2025, 4, 20), color: "#ef4444" },
    { id: 5, title: "데이터 분석가", company: "당근마켓", date: new Date(2025, 4, 25), color: "#8b5cf6" },
  ]

  const jobInterests = [
    { label: "프론트엔드", value: 12 },
    { label: "백엔드", value: 8 },
    { label: "풀스택", value: 5 },
    { label: "데이터 분석", value: 3 },
    { label: "DevOps", value: 2 },
    { label: "모바일 앱", value: 4 },
    { label: "UI/UX", value: 6 },
    { label: "AI/ML", value: 1 },
  ]

  // 상태 변수 추가 (useState 부분 근처에 추가)
  const [todos, setTodos] = useState([
    { text: "이력서 업데이트하기", completed: false },
    { text: "자기소개서 작성하기", completed: true },
    { text: "포트폴리오 정리하기", completed: false },
    { text: "면접 준비하기", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  // 함수 추가 (다른 함수들 근처에 추가)
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const addCompany = () => {
    if (newCompany.trim() && selectedJobCategory) {
      onAddCompany(newCompany.trim(), selectedJobCategory)
      setNewCompany("")
      setSelectedJobCategory("")
    }
  }

  // 캔버스 초기화 및 리사이징 설정
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // 캔버스 크기 설정
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      setWidth(rect.width)
      setHeight(rect.height)
    }

    handleResize() // 초기 사이즈 설정
    window.addEventListener("resize", handleResize)

    // 컴포넌트가 마운트된 직후 약간의 지연을 두고 리사이즈 한번 더 실행
    const timer = setTimeout(() => {
      handleResize()
    }, 200)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  // 그래프 렌더링 로직
  useEffect(() => {
    // 캔버스 크기가 설정되지 않았거나 isFlipped가 false면 그래프를 그리지 않음
    if (!width || !height || !isFlipped) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // 데이터 집계
    const jobCounts: Record<string, number> = {}
    jobInterests.forEach((job) => (jobCounts[job.label] = 0))

    companies.forEach((company) => {
      if (jobCounts[company.jobCategory] !== undefined) {
        jobCounts[company.jobCategory]++
      }
    })

    const barData: BarData[] = jobInterests
      .map((job, i) => ({
        label: job.label,
        count: jobCounts[job.label],
        color: `hsla(${i * 40}, 80%, 65%, 1)`,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 이전 애니메이션 취소
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // 애니메이션 진행 상태 초기화
    animationProgressRef.current = 0

    // 그래프 애니메이션 함수
    const animate = () => {
      if (!ctx || !canvas) return

      // 애니메이션 진행 상태 업데이트
      animationProgressRef.current = Math.min(animationProgressRef.current + 0.03, 1)
      const progress = animationProgressRef.current

      // 캔버스 초기화
      ctx.clearRect(0, 0, width, height)

      // 그래프 크기 및 위치 계산
      const maxCount = Math.max(...barData.map((d) => d.count), 1)
      const barWidth = Math.min(70, width / (barData.length * 1.5))
      const maxBarHeight = height * 0.6
      const padding = barWidth * 0.3
      const startX = (width - (barData.length * barWidth + (barData.length - 1) * padding)) / 2

      // 막대 그래프 그리기
      barData.forEach((data, i) => {
        const x = startX + i * (barWidth + padding)
        const fullBarHeight = data.count > 0 ? (data.count / maxCount) * maxBarHeight : 0
        // 애니메이션 진행에 따라 막대 높이 계산
        const animatedBarHeight = fullBarHeight * progress
        const y = height - animatedBarHeight - 50

        // 막대 그리기
        const gradient = ctx.createLinearGradient(x, y, x, height - 50)
        gradient.addColorStop(0, data.color)
        gradient.addColorStop(1, `hsla(${i * 40}, 80%, 65%, 0.3)`)
        ctx.fillStyle = gradient

        // 막대 그리기 (둥근 모서리)
        ctx.beginPath()
        const radius = 6

        // 상단 둥근 모서리
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + barWidth - radius, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
        ctx.lineTo(x + barWidth, height - 50)
        ctx.lineTo(x, height - 50)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
        ctx.fill()

        // 텍스트 (애니메이션 진행에 따라 페이드인)
        const textOpacity = Math.min(progress * 2, 1)

        // 카운트 텍스트
        ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`
        ctx.font = "bold 14px Inter, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${data.count}`, x + barWidth / 2, y + 20)

        // 라벨 텍스트
        ctx.fillStyle = `rgba(79, 70, 229, ${textOpacity})`
        ctx.font = "12px Inter, sans-serif"
        ctx.fillText(data.label, x + barWidth / 2, height - 20)
      })

      // 애니메이션이 완료되지 않았으면 계속 진행
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    // 애니메이션 시작
    animate()

    // 컴포넌트 언마운트/업데이트 시 애니메이션 정리
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [width, height, companies, isFlipped])

  // 표시 토글
  const toggleFlip = () => {
    // 애니메이션 중지
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    setIsFlipped(!isFlipped)
  }

  // 이전 달로 이동
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // 다음 달로 이동
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // 해당 월의 일수 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // 해당 월의 첫 날의 요일 계산 (0: 일요일, 1: 월요일, ...)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // 캘린더 그리드 생성
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // 이전 달의 날짜 채우기
    const prevMonthDays =
      currentMonth === 0 ? getDaysInMonth(currentYear - 1, 11) : getDaysInMonth(currentYear, currentMonth - 1)

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        day: prevMonthDays - firstDayOfMonth + i + 1,
        currentMonth: false,
        date: new Date(
          currentMonth === 0 ? currentYear - 1 : currentYear,
          currentMonth === 0 ? 11 : currentMonth - 1,
          prevMonthDays - firstDayOfMonth + i + 1,
        ),
      })
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      })
    }

    // 다음 달의 날짜 채우기 (6주 채우기)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(
          currentMonth === 11 ? currentYear + 1 : currentYear,
          currentMonth === 11 ? 0 : currentMonth + 1,
          i,
        ),
      })
    }

    return days
  }

  // 날짜에 해당하는 공고 찾기
  const getPostingsForDate = (date: Date) => {
    return jobPostings.filter(
      (posting) =>
        posting.date.getDate() === date.getDate() &&
        posting.date.getMonth() === date.getMonth() &&
        posting.date.getFullYear() === date.getFullYear(),
    )
  }

  // 요일 이름
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  // 월 이름
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="h-[400px] w-full md:w-1/2 relative rounded-xl overflow-hidden border dark:bg-gray-900/80 shadow-lg">
        <div className="absolute inset-0 w-full h-full z-0 p-6 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-indigo-500" />
                알림 센터
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <CheckSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 cursor-pointer">
                전체
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                공고
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                커뮤니티
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                시스템
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {/* 공고 마감 임박 알림 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">마감 임박</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">10분 전</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      네이버 공고 마감이 임박했습니다
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      네이버 프론트엔드 개발자 공고가 오늘 자정에 마감됩니다. 지원을 서두르세요!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 커뮤니티 좋아요 알림 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        좋아요
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">1시간 전</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      김개발님이 회원님의 게시글을 좋아합니다
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      "신입 개발자 포트폴리오 준비 팁" 게시글에 좋아요를 받았습니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 커뮤니티 댓글 알림 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-700 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l-xl"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        댓글
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">3시간 전</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      이코딩님이 회원님의 게시글에 댓글을 남겼습니다
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      "정말 유익한 정보 감사합니다! 저도 면접 준비중인데 많은 도움이 됐어요."
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 시스템 알림 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        시스템
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">어제</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      이력서가 성공적으로 업데이트되었습니다
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      회원님의 이력서가 성공적으로 업데이트되었습니다. 이제 더 많은 기업에게 노출됩니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 추가 알림들 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-amber-200 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-colors duration-200 cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        공고
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">2일 전</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      새로운 추천 공고가 있습니다
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      회원님의 프로필과 일치하는 카카오 백엔드 개발자 공고가 등록되었습니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">총 12개의 알림</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              >
                모두 읽음 표시
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="h-[400px] w-full md:w-1/2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "chart" : "companies"}
            initial={{ opacity: 0, rotateY: isFlipped ? 90 : 0 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
            }}
          >
            {isFlipped ? (
              <Card className="h-full w-full p-5 rounded-xl border dark:bg-gray-900/80 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">할 일 목록</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={toggleFlip}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col h-[calc(100%-40px)]">
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="할 일 입력"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newTodo.trim()) {
                          addTodo()
                        }
                      }}
                      className="dark:bg-gray-800 rounded-lg"
                    />
                    <Button onClick={addTodo} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                    {todos.map((todo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            className={`w-5 h-5 rounded-full border ${todo.completed ? "bg-indigo-500 border-indigo-500" : "border-gray-300 dark:border-gray-600"} flex items-center justify-center`}
                            onClick={() => toggleTodo(index)}
                          >
                            {todo.completed && <Check className="w-3 h-3 text-white" />}
                          </button>
                          <span
                            className={`text-sm ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-red-500"
                          onClick={() => removeTodo(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {todos.length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">할 일이 없습니다</div>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full w-full p-5 rounded-xl border dark:bg-gray-900/80 shadow-lg overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">지원 회사 관리</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={toggleFlip}>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="회사명 입력"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="dark:bg-gray-800 rounded-lg"
                    />
                    <Select value={selectedJobCategory} onValueChange={setSelectedJobCategory}>
                      <SelectTrigger className="w-[180px] dark:bg-gray-800 rounded-lg">
                        <SelectValue placeholder="직군 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobInterests.map((job) => (
                          <SelectItem key={job.label} value={job.label}>
                            {job.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addCompany} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">지원 회사 목록</h4>
                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                      {companies.map((company, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{company.name}</span>
                            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                              {company.jobCategory}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-red-500"
                            onClick={() => onRemoveCompany(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {companies.length === 0 && (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                          지원한 회사가 없습니다
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
