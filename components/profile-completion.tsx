"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Award, Code, FileCheck, Globe, Target, LinkIcon, User, Shield } from "lucide-react"
import { useInView } from "react-intersection-observer"

// 실제 API 호출 함수 (나중에 실제 API로 대체)
const fetchProfileData = async () => {
  // 실제 API 호출 대신 임시 데이터 반환
  // 실제 구현에서는 API 호출로 대체
  return {
    work: [{ company: "ABC 회사", position: "프론트엔드 개발자" }],
    education: [{ school: "XYZ 대학교", major: "컴퓨터 공학" }],
    language: [],
    activity: [],
    skill: ["React", "TypeScript", "Next.js"],
    certificate: [],
    link: [],
    goal: "프론트엔드 개발자로 성장하기",
    introduction: "안녕하세요, 신입 개발자입니다.",
    military: { serviceType: "육군", completed: true },
  }
}

export default function ProfileCompletion() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchProfileData()
        setProfileData(data)

        // 완료된 섹션 계산
        const completed = sections
          .filter((section) => {
            const sectionData = data[section.id]
            if (!sectionData) return false

            // 배열인 경우 길이가 0보다 크면 완료
            if (Array.isArray(sectionData)) {
              return sectionData.length > 0
            }

            // 문자열인 경우 비어있지 않으면 완료
            if (typeof sectionData === "string") {
              return sectionData.trim() !== ""
            }

            // 객체인 경우 completed 속성이 true이거나 다른 속성이 있으면 완료
            if (typeof sectionData === "object") {
              return sectionData.completed === true || Object.keys(sectionData).length > 0
            }

            return false
          })
          .map((section) => section.id)

        setCompletedSections(completed)
        setIsLoading(false)
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error)
        setIsLoading(false)
      }
    }

    loadProfileData()
  }, [])

  const sections = [
    { id: "work", icon: <Briefcase size={16} />, title: "업무 경력" },
    { id: "education", icon: <GraduationCap size={16} />, title: "학력" },
    { id: "language", icon: <Globe size={16} />, title: "외국어" },
    { id: "activity", icon: <Award size={16} />, title: "활동 & 경험" },
    { id: "skill", icon: <Code size={16} />, title: "스킬" },
    { id: "certificate", icon: <FileCheck size={16} />, title: "자격증" },
    { id: "link", icon: <LinkIcon size={16} />, title: "링크" },
    { id: "goal", icon: <Target size={16} />, title: "커리어 목표" },
    { id: "introduction", icon: <User size={16} />, title: "자기소개" },
    { id: "military", icon: <Shield size={16} />, title: "병역" },
  ]

  const totalSections = sections.length
  const completionPercentage = Math.round((completedSections.length / totalSections) * 100)
  const incompleteSections = sections.filter((section) => !completedSections.includes(section.id))
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full -mr-32 -mt-32 opacity-50"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">프로필 완성도</h3>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                {isLoading ? "..." : completionPercentage}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">전체 완성도</span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {isLoading ? "로딩 중..." : `${completedSections.length}/${totalSections}`}
                </span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: isLoading ? "5%" : `${(completedSections.length / totalSections) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800"
                >
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">전체 항목</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center p-2 ${
                          completedSections.includes(section.id)
                            ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50"
                            : "bg-gray-50 dark:bg-gray-800/50"
                        } rounded-lg`}
                      >
                        <div
                          className={`mr-2 ${completedSections.includes(section.id) ? "text-indigo-500 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`}
                        >
                          {section.icon}
                        </div>
                        <span
                          className={`text-sm ${completedSections.includes(section.id) ? "text-indigo-600 dark:text-indigo-300 font-medium" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {section.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push("/spec-management")
                      }}
                    >
                      프로필 작성 완료하기
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
