"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowUpDown,
  Calendar,
  Clock,
  Download,
  Edit,
  Copy,
  Trash2,
  Star,
  Building,
  MapPin,
  Plus,
  RefreshCw,
  FileText,
  Rocket,
  Heart,
  Zap,
} from "lucide-react"
import { useResumes } from "@/hooks/use-resumes"

interface Resume {
  id: string
  title: string
  isPrimary: boolean
  lastUpdated: string
  createdAt: string // 추가
  jobCategory: string
  location: string
  company: string
  isPublic: boolean
}

export default function ResumeList() {
  const router = useRouter()
  // TODO: Replace with actual authenticated user ID
  const { resumes: fetchedResumes } = useResumes(1)
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    setResumes(
      fetchedResumes.map((r) => ({
        id: String(r.resumeId),
        title: r.title,
        isPrimary: r.isPrimary,
        lastUpdated: r.updatedAt,
        createdAt: r.createdAt,
        jobCategory: r.jobCategory || "",
        company: r.targetCompanyType || "",
        location: r.targetLocation || "",
        isPublic: r.isPublic,
      }))
    )
  }, [fetchedResumes])

  const [sortBy, setSortBy] = useState<string>("lastUpdated")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleCreateResume = () => {
    router.push("/resume/create")
  }

  // 수정하기 버튼 핸들러 추가
  const handleEditResume = (id: string) => {
    router.push(`/resume/edit/${id}`)
  }

  const handleSetPrimary = (id: string) => {
    setResumes(
      resumes.map((resume) => ({
        ...resume,
        isPrimary: resume.id === id,
      })),
    )
  }

  const handleTogglePublic = (id: string) => {
    setResumes(resumes.map((resume) => (resume.id === id ? { ...resume, isPublic: !resume.isPublic } : resume)))
  }

  const handleCopyResume = (id: string) => {
    const resumeToCopy = resumes.find((resume) => resume.id === id)
    if (!resumeToCopy) return

    const newResume: Resume = {
      ...resumeToCopy,
      id: Date.now().toString(),
      title: `${resumeToCopy.title} (복사본)`,
      isPrimary: false,
      lastUpdated:
        new Date()
          .toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\. /g, ".")
          .replace(",", " ") + " 수정",
    }

    setResumes([...resumes, newResume])
  }

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  const getSortedResumes = () => {
    // 대표 이력서는 항상 최상단에 표시
    const primaryResume = resumes.find((resume) => resume.isPrimary)
    const otherResumes = resumes.filter((resume) => !resume.isPrimary)

    // 정렬 로직
    const sortedResumes = [...otherResumes].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "lastUpdated":
          // 날짜 문자열에서 날짜 부분만 추출하여 비교
          const dateA = a.lastUpdated.split(" ")[0]
          const dateB = b.lastUpdated.split(" ")[0]
          comparison = dateA.localeCompare(dateB)
          break
        case "createdAt":
          comparison = a.createdAt.localeCompare(b.createdAt)
          break
        case "jobCategory":
          comparison = a.jobCategory.localeCompare(b.jobCategory)
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return { primaryResume, otherResumes: sortedResumes }
  }

  const { primaryResume, otherResumes } = getSortedResumes()

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
          <FileText className="w-6 h-6 mr-2 text-indigo-500" />
          이력서 관리
        </h1>
        <Button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200"
          onClick={handleCreateResume}
        >
          <Plus className="mr-2 h-4 w-4" />
          이력서 작성
        </Button>
      </div>

      {/* 대표 이력서 */}
      {primaryResume && (
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 mr-2"
            >
              <Star className="w-3 h-3 mr-1 fill-blue-500" /> 대표 이력서
            </Badge>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
              포지션 제안받는 중
            </p>
          </div>

          <Card className="p-6 border border-indigo-200 dark:border-indigo-800 dark:bg-gray-900/95 overflow-hidden relative rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/70 to-purple-100/70 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full -mr-32 -mt-32 opacity-50"></div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
              <div>
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mr-2 flex items-center">
                    {primaryResume.title}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{primaryResume.lastUpdated}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                    <span>{primaryResume.jobCategory}</span>
                  </div>
                  <div className="flex items-center">
                    <Rocket className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
                    <span>{primaryResume.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-red-500 dark:text-red-400" />
                    <span>{primaryResume.location}</span>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 flex items-center">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    오늘 날짜로 업데이트
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200"
                  onClick={() => handleEditResume(primaryResume.id)}
                >
                  <Edit className="mr-1 h-4 w-4" />
                  수정하기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200"
                >
                  <Download className="mr-1 h-4 w-4" />
                  PDF 추출하기
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-2 flex items-center">
                  <Heart className="w-3.5 h-3.5 mr-1 text-pink-500" />
                  이력서 공개
                </span>
                <Switch checked={primaryResume.isPublic} onCheckedChange={() => handleTogglePublic(primaryResume.id)} />
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {primaryResume.isPublic ? "공개 중" : "비공개"}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
                  onClick={() => handleCopyResume(primaryResume.id)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                  onClick={() => handleDeleteResume(primaryResume.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 구분선 추가 */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 dark:bg-gray-950 px-4 text-sm text-gray-500 dark:text-gray-400">
            다른 이력서 목록
          </span>
        </div>
      </div>

      {/* 정렬 컨트롤 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-indigo-500" />총 {resumes.length}건
        </h2>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">정렬:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] h-9 rounded-xl">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastUpdated" className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> 최신 수정순
                </SelectItem>
                <SelectItem value="createdAt" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> 생성일순
                </SelectItem>
                <SelectItem value="title" className="flex items-center">
                  <ArrowDownAZ className="w-4 h-4 mr-2" /> 제목순
                </SelectItem>
                <SelectItem value="jobCategory" className="flex items-center">
                  <Building className="w-4 h-4 mr-2" /> 직무 카테고리
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 rounded-xl"
            onClick={handleSortOrderToggle}
            title={sortOrder === "asc" ? "오름차순" : "내림차순"}
          >
            {sortOrder === "asc" ? <ArrowUpDown className="h-4 w-4" /> : <ArrowDownUp className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* 이력서 목록 */}
      <div className="mb-4">
        <div className="space-y-4">
          {otherResumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="p-5 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors duration-200 hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 mr-2 flex items-center">
                        {resume.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{resume.lastUpdated}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Building className="w-3.5 h-3.5 mr-1 text-indigo-500 dark:text-indigo-400" />
                        <span>{resume.jobCategory}</span>
                      </div>
                      <div className="flex items-center">
                        <Rocket className="w-3.5 h-3.5 mr-1 text-purple-500 dark:text-purple-400" />
                        <span>{resume.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-red-500 dark:text-red-400" />
                        <span>{resume.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl h-8 transition-all duration-200"
                      onClick={() => handleSetPrimary(resume.id)}
                    >
                      <Star className="w-3.5 h-3.5 mr-1" /> 대표 설정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-xl h-8 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200"
                      onClick={() => handleEditResume(resume.id)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-xl h-8 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200"
                      onClick={() => handleCopyResume(resume.id)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-xl h-8 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-300 mr-2 flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-pink-500" />
                      이력서 공개
                    </span>
                    <Switch checked={resume.isPublic} onCheckedChange={() => handleTogglePublic(resume.id)} />
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {resume.isPublic ? "공개 중" : "비공개"}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
