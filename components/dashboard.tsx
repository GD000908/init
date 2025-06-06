"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Edit2, ChevronDown, BarChart3, PieChart, ChevronUp, X, Plus, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import StatusChart from "./status-chart"
import ActivityChart from "./activity-chart"
import AnimatedCounter from "./animated-counter"
import ProfileEditPanel from "./profile-edit-panel"
import ConditionsEditPanel from "./conditions-edit-panel"
import ProfileCompletion from "./profile-completion"
import BubbleChart from "./bubble-chart"
import InterestChart from "./interest-chart"

// 직무 카테고리 색상 매핑
const JOB_COLORS = {
  프론트엔드: "#4f46e5",
  백엔드: "#8b5cf6",
  풀스택: "#10b981",
  "데이터 분석": "#f59e0b",
  DevOps: "#ef4444",
  "모바일 앱": "#ec4899",
  "UI/UX": "#06b6d4",
  "AI/ML": "#14b8a6",
}

// 직무 카테고리 타입
type JobCategory = keyof typeof JOB_COLORS

interface Company {
  name: string
  jobCategory: JobCategory
}

interface JobInterest {
  label: string
  value: number
  color: string
}

export default function Dashboard() {
  const [chartView, setChartView] = useState<"pie" | "bar" | "interest">("pie")
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
  const [isConditionsEditOpen, setIsConditionsEditOpen] = useState(false)

  // 회사 데이터 상태
  const [companies, setCompanies] = useState<Company[]>([
    { name: "네이버", jobCategory: "프론트엔드" },
    { name: "카카오", jobCategory: "백엔드" },
    { name: "라인", jobCategory: "풀스택" },
    { name: "쿠팡", jobCategory: "프론트엔드" },
  ])

  // 관심 직무 데이터 상태
  const [jobInterests, setJobInterests] = useState<JobInterest[]>([])

  // 회사 데이터가 변경될 때마다 관심 직무 데이터 업데이트
  useEffect(() => {
    updateJobInterests()
  }, [companies])

  // 관심 직무 데이터 업데이트 함수
  const updateJobInterests = () => {
    // 각 직무 카테고리별 회사 수 계산
    const categoryCounts: Record<string, number> = {}

    // 모든 카테고리 초기화
    Object.keys(JOB_COLORS).forEach((category) => {
      categoryCounts[category] = 0
    })

    // 회사 데이터에서 카테고리별 카운트
    companies.forEach((company) => {
      if (categoryCounts[company.jobCategory] !== undefined) {
        categoryCounts[company.jobCategory]++
      }
    })

    // 관심 직무 데이터 생성
    const newJobInterests = Object.entries(categoryCounts)
      .map(([label, count]) => ({
        label,
        value: count,
        color: JOB_COLORS[label as JobCategory] || "#888888",
      }))
      .sort((a, b) => b.value - a.value)

    setJobInterests(newJobInterests)
  }

  // 회사 추가 함수
  const handleAddCompany = (name: string, jobCategory: JobCategory) => {
    if (name.trim() && jobCategory) {
      setCompanies((prev) => [...prev, { name: name.trim(), jobCategory }])
    }
  }

  // 회사 제거 함수
  const handleRemoveCompany = (index: number) => {
    setCompanies((prev) => prev.filter((_, i) => i !== index))
  }

  const [isApplicationsExpanded, setIsApplicationsExpanded] = useState(false)
  const [applications, setApplications] = useState({
    applied: [
      { id: "1", company: "네이버" },
      { id: "2", company: "라인" },
    ],
    document: [{ id: "3", company: "카카오" }],
    final: [{ id: "4", company: "토스" }],
    rejected: [{ id: "5", company: "쿠팡" }],
  })

  const removeApplication = (id: string, column: string) => {
    setApplications((prev) => ({
      ...prev,
      [column]: prev[column as keyof typeof prev].filter((app) => app.id !== id),
    }))
  }

  const [newApplication, setNewApplication] = useState("")

  const handleDrop = (item: { id: string; company: string }, sourceColumn: string, targetColumn: string) => {
    if (sourceColumn === targetColumn) return

    setApplications((prev) => {
      // Remove from source column
      const sourceItems = prev[sourceColumn as keyof typeof prev].filter((app) => app.id !== item.id)

      // Add to target column
      const targetItems = [...prev[targetColumn as keyof typeof prev], item]

      return {
        ...prev,
        [sourceColumn]: sourceItems,
        [targetColumn]: targetItems,
      }
    })
  }

  const handleAddApplication = (company: string) => {
    if (!company.trim()) return

    const newItem = {
      id: Date.now().toString(),
      company: company.trim(),
    }

    setApplications((prev) => ({
      ...prev,
      applied: [...prev.applied, newItem],
    }))

    setNewApplication("")
  }

  const { ref: profileRef, inView: profileInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: chartsRef, inView: chartsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 프로필 카드 */}
      <motion.div
        ref={profileRef}
        initial={{ opacity: 0, y: 20 }}
        animate={profileInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full -mr-32 -mt-32 opacity-50"></div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <span className="text-2xl font-semibold">박</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">박건도</h2>
                  <div className="flex items-center ml-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">매칭</span>
                    <Switch />
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>신입</span>
                  <span className="mx-2">|</span>
                  <span>개발자</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 flex items-center gap-1 dark:border-gray-700 dark:text-gray-300 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
              onClick={() => setIsProfileEditOpen(true)}
            >
              <Edit2 className="w-4 h-4" />
              <span>프로필 수정</span>
            </Button>
          </div>

          {/* 희망 조건 */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">희망 조건</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl"
                onClick={() => setIsConditionsEditOpen(true)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">직군 · 직무</p>
                <p className="text-sm font-medium dark:text-gray-300">웹・SW 개발 외 2개</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">근무 지역</p>
                <p className="text-sm font-medium dark:text-gray-300">서울특별시 외 1개</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">연봉</p>
                <p className="text-sm font-medium dark:text-gray-300">3,500만원 이상</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">기타 희망사항</p>
                <p className="text-sm font-medium dark:text-gray-300">재택근무 가능</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 프로필 완성도 */}
      <ProfileCompletion />

      {/* 요약 카드 2개 */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={statsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden relative min-h-[180px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-900/10 rounded-full -mr-16 -mt-16 opacity-50"></div>

            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4 relative z-10 flex items-center justify-between">
              <span>지원 현황</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400"
                onClick={() => setIsApplicationsExpanded(!isApplicationsExpanded)}
              >
                {isApplicationsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </h3>

            {!isApplicationsExpanded ? (
              <div className="grid grid-cols-4 gap-2 relative z-10">
                <AnimatedCounter end={applications.applied.length} label="지원 완료" />
                <AnimatedCounter end={applications.document.length} label="서류 합격" delay={0.2} />
                <AnimatedCounter end={applications.final.length} label="최종 합격" delay={0.4} />
                <AnimatedCounter end={applications.rejected.length} label="불합격" delay={0.6} />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative z-10"
              >
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <ApplicationColumn
                    title="지원 완료"
                    items={applications.applied}
                    id="applied"
                    onDrop={handleDrop}
                    onRemove={removeApplication}
                    allowInput={true}
                    onAddItem={handleAddApplication}
                  />
                  <ApplicationColumn
                    title="서류 합격"
                    items={applications.document}
                    id="document"
                    onDrop={handleDrop}
                    onRemove={removeApplication}
                  />
                  <ApplicationColumn
                    title="최종 합격"
                    items={applications.final}
                    id="final"
                    onDrop={handleDrop}
                    onRemove={removeApplication}
                  />
                  <ApplicationColumn
                    title="불합격"
                    items={applications.rejected}
                    id="rejected"
                    onDrop={handleDrop}
                    onRemove={removeApplication}
                  />
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={statsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden relative min-h-[180px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/10 rounded-full -mr-16 -mt-16 opacity-50"></div>

            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4 relative z-10">
              나의 활동 요약
            </h3>
            <div className="grid grid-cols-4 gap-2 relative z-10">
              <AnimatedCounter end={3} label="작성한 이력서" />
              <AnimatedCounter end={5} label="완성한 자소서" delay={0.2} />
              <AnimatedCounter end={8} label="북마크한 기업" delay={0.4} />
              <AnimatedCounter end={2} label="지원 마감 임박" delay={0.6} />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 차트 섹션 */}
      <motion.div
        ref={chartsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={chartsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">지원 현황 분석</h3>
            <div className="flex space-x-2">
              <Button
                variant={chartView === "pie" ? "default" : "outline"}
                size="sm"
                className={`rounded-xl ${
                  chartView === "pie"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                }`}
                onClick={() => setChartView("pie")}
              >
                <PieChart className="w-4 h-4 mr-1" />
                <span>지원 현황</span>
              </Button>
              <Button
                variant={chartView === "bar" ? "default" : "outline"}
                size="sm"
                className={`rounded-xl ${
                  chartView === "bar"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                }`}
                onClick={() => setChartView("bar")}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                <span>나의 활동</span>
              </Button>
              <Button
                variant={chartView === "interest" ? "default" : "outline"}
                size="sm"
                className={`rounded-xl ${
                  chartView === "interest"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                }`}
                onClick={() => setChartView("interest")}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>관심 직무</span>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {chartView === "pie" ? (
                <motion.div
                  key="pie"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatusChart />
                </motion.div>
              ) : chartView === "bar" ? (
                <motion.div
                  key="bar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityChart />
                </motion.div>
              ) : (
                <motion.div
                  key="interest"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <InterestChart jobInterests={jobInterests} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* 관심 직무 버블 차트 */}
      <BubbleChart
        companies={companies}
        onAddCompany={(name, jobCategory) => handleAddCompany(name, jobCategory as JobCategory)}
        onRemoveCompany={handleRemoveCompany}
      />

      {/* 프로필 수정 패널 */}
      <ProfileEditPanel isOpen={isProfileEditOpen} onClose={() => setIsProfileEditOpen(false)} />

      {/* 희망 조건 수정 패널 */}
      <ConditionsEditPanel isOpen={isConditionsEditOpen} onClose={() => setIsConditionsEditOpen(false)} />
    </div>
  )
}

interface ApplicationColumnProps {
  title: string
  items: { id: string; company: string }[]
  id: string
  onDrop: (item: { id: string; company: string }, sourceColumn: string, targetColumn: string) => void
  onRemove: (id: string, column: string) => void
  allowInput?: boolean
  onAddItem?: (company: string) => void
}

function ApplicationColumn({
  title,
  items,
  id,
  onDrop,
  onRemove,
  allowInput = false,
  onAddItem,
}: ApplicationColumnProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [newItem, setNewItem] = useState("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)

    const data = JSON.parse(e.dataTransfer.getData("application"))
    onDrop(data.item, data.sourceColumn, id)
  }

  const handleAddItem = () => {
    if (onAddItem && newItem.trim()) {
      onAddItem(newItem)
      setNewItem("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onAddItem && newItem.trim()) {
      onAddItem(newItem)
      setNewItem("")
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-3 border ${
        isDraggingOver
          ? "border-indigo-400 dark:border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
          : "border-gray-200 dark:border-gray-700"
      } transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {title} ({items.length})
      </h4>

      <div className="space-y-2 min-h-[100px]">
        {items.map((item) => (
          <ApplicationItem key={item.id} item={item} sourceColumn={id} onRemove={() => onRemove(item.id, id)} />
        ))}

        {allowInput && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                placeholder="회사명 입력"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-sm h-8 dark:bg-gray-700 dark:border-gray-600"
              />
              <Button
                size="sm"
                className="h-8 px-2 bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={handleAddItem}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ApplicationItemProps {
  item: { id: string; company: string }
  sourceColumn: string
  onRemove: () => void
}

function ApplicationItem({ item, sourceColumn, onRemove }: ApplicationItemProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application", JSON.stringify({ item, sourceColumn }))
    setIsDragging(true)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false)

    // 유효한 드롭 영역 밖으로 드래그된 경우 삭제
    if (e.dataTransfer.dropEffect === "none") {
      onRemove()
    }
  }

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600 cursor-move group ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800 dark:text-gray-200">{item.company}</p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  )
}
