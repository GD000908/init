"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  ArrowLeft,
  Download,
  Eye,
  Globe,
  Languages,
  Plus,
  Trash2,
  BookOpen,
  BadgeIcon as Certificate,
  Heart,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building,
  Rocket,
  Target,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// props 타입 정의 추가
interface ResumeEditorProps {
  resumeId?: string
}

// 컴포넌트 정의 수정
export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const router = useRouter()
  const [resumeTitle, setResumeTitle] = useState("새 이력서")
  const [isPublic, setIsPublic] = useState(true)
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)

  // 이력서 데이터 상태 추가
  const [resumeData, setResumeData] = useState({
    basic: {
      name: "",
      birthDate: "",
      email: "",
      phone: "",
      address: "",
      jobPosition: "frontend",
      introduction: "",
      // 추가된 필드
      jobCategory: "IT개발·데이터",
      companyType: "회사내규에 따름",
      location: "서울 전체",
    },
    work: [] as any[],
    education: [] as any[],
    skills: {
      techStack: "",
      certificates: [] as any[],
      languages: [] as any[],
    },
    additional: {
      portfolio: "",
      github: "",
      blog: "",
      awards: "",
      etc: "",
    },
  })

  // 이력서 데이터 불러오기
  useEffect(() => {
    if (resumeId) {
      setIsLoading(true)
      // 실제 구현에서는 API 호출로 대체
      setTimeout(() => {
        // 샘플 데이터 - 실제로는 API에서 가져온 데이터를 사용
        const mockResumes = [
          {
            id: "1",
            title: "기본 이력서",
            isPublic: true,
            basic: {
              name: "박건도",
              birthDate: "1995-01-15",
              email: "nagundo@naver.com",
              phone: "010-1234-5678",
              address: "서울특별시 강남구",
              jobPosition: "frontend",
              jobCategory: "IT개발·데이터",
              companyType: "회사내규에 따름",
              location: "경기 이천시",
              introduction:
                "안녕하세요, 신입 프론트엔드 개발자 박건도입니다. 사용자 경험을 중요시하며 새로운 기술을 배우는 것을 좋아합니다. 웹 개발에 대한 열정을 가지고 있으며, 특히 React와 TypeScript를 활용한 프로젝트에 관심이 많습니다.",
            },
            work: [
              {
                company: "테크스타트 주식회사",
                department: "프론트엔드 개발팀",
                startDate: "2023-03-01",
                endDate: "2024-02-29",
                description:
                  "React와 TypeScript를 활용한 웹 애플리케이션 개발. 사용자 인터페이스 개선 및 성능 최적화 작업 수행.",
              },
            ],
            education: [
              {
                school: "서울대학교",
                major: "컴퓨터공학과",
                startDate: "2015-03-01",
                endDate: "2019-02-28",
                description: "컴퓨터 과학 및 프로그래밍 기초 학습. 웹 개발 동아리 활동.",
              },
            ],
            skills: {
              techStack: "React, TypeScript, Next.js, Node.js, Tailwind CSS, HTML, CSS, JavaScript",
              certificates: [
                {
                  name: "정보처리기사",
                  organization: "한국산업인력공단",
                  date: "2024-03-15",
                  number: "24-A-123456",
                },
              ],
              languages: [
                { name: "영어", level: "business" },
                { name: "일본어", level: "daily" },
              ],
            },
            additional: {
              portfolio: "https://myportfolio.com",
              github: "https://github.com/nagundo",
              blog: "https://velog.io/@nagundo",
              awards: "2023 웹 개발 경진대회 우수상",
              etc: "취미: 독서, 여행, 코딩",
            },
          },
          {
            id: "2",
            title: "백엔드 개발자 이력서",
            isPublic: false,
            basic: {
              name: "박건도",
              birthDate: "1995-01-15",
              email: "nagundo@naver.com",
              phone: "010-1234-5678",
              address: "서울특별시 강남구",
              jobPosition: "backend",
              jobCategory: "IT개발·데이터",
              companyType: "스타트업 지원",
              location: "서울 강남구",
              introduction: "안녕하세요, 백엔드 개발자 박건도입니다. 서버 개발과 데이터베이스 설계에 관심이 많습니다.",
            },
            work: [
              {
                company: "서버테크 주식회사",
                department: "백엔드 개발팀",
                startDate: "2022-06-01",
                endDate: "2023-02-28",
                description: "Node.js와 Express를 활용한 RESTful API 개발. MongoDB 데이터베이스 설계 및 최적화.",
              },
            ],
            education: [
              {
                school: "서울대학교",
                major: "컴퓨터공학과",
                startDate: "2015-03-01",
                endDate: "2019-02-28",
                description: "컴퓨터 과학 및 프로그래밍 기초 학습. 서버 개발 동아리 활동.",
              },
            ],
            skills: {
              techStack: "Node.js, Express, MongoDB, MySQL, AWS, Docker, Python, JavaScript",
              certificates: [
                {
                  name: "정보처리기사",
                  organization: "한국산업인력공단",
                  date: "2024-03-15",
                  number: "24-A-123456",
                },
              ],
              languages: [{ name: "영어", level: "business" }],
            },
            additional: {
              portfolio: "https://mybackendportfolio.com",
              github: "https://github.com/nagundo",
              blog: "https://velog.io/@nagundo",
              awards: "2022 서버 개발 경진대회 장려상",
              etc: "취미: 알고리즘 문제 풀기, 독서",
            },
          },
          {
            id: "3",
            title: "프론트엔드 개발자 이력서",
            isPublic: true,
            basic: {
              name: "박건도",
              birthDate: "1995-01-15",
              email: "nagundo@naver.com",
              phone: "010-1234-5678",
              address: "서울특별시 강남구",
              jobPosition: "frontend",
              jobCategory: "IT개발·데이터",
              companyType: "대기업 지원용",
              location: "서울 전체",
              introduction: "안녕하세요, 프론트엔드 개발자 박건도입니다. 사용자 중심의 UI/UX 개발에 관심이 많습니다.",
            },
            work: [
              {
                company: "디자인테크 주식회사",
                department: "UI 개발팀",
                startDate: "2021-09-01",
                endDate: "2022-05-31",
                description: "React와 Styled Components를 활용한 UI 컴포넌트 개발. 반응형 웹 디자인 구현.",
              },
            ],
            education: [
              {
                school: "서울대학교",
                major: "컴퓨터공학과",
                startDate: "2015-03-01",
                endDate: "2019-02-28",
                description: "컴퓨터 과학 및 프로그래밍 기초 학습. UI/UX 디자인 동아리 활동.",
              },
            ],
            skills: {
              techStack: "React, JavaScript, HTML, CSS, Styled Components, Redux, Figma, Adobe XD",
              certificates: [
                {
                  name: "웹디자인기능사",
                  organization: "한국산업인력공단",
                  date: "2021-05-20",
                  number: "21-B-789012",
                },
              ],
              languages: [{ name: "영어", level: "daily" }],
            },
            additional: {
              portfolio: "https://myuiportfolio.com",
              github: "https://github.com/nagundo",
              blog: "https://velog.io/@nagundo",
              awards: "2021 UI 디자인 공모전 입상",
              etc: "취미: 디자인 트렌드 분석, 그림 그리기",
            },
          },
        ]

        const resume = mockResumes.find((r) => r.id === resumeId)

        if (resume) {
          setResumeTitle(resume.title)
          setIsPublic(resume.isPublic)
          setResumeData(resume as any)
        }

        setIsLoading(false)
      }, 500)
    }
  }, [resumeId])

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleGoBack = () => {
    router.push("/resume")
  }

  // 직무 카테고리 옵션
  const jobCategoryOptions = [
    "IT개발·데이터",
    "경영·사무",
    "마케팅·광고·홍보",
    "디자인",
    "영업·고객상담",
    "연구개발·설계",
    "생산·제조",
    "교육",
    "의료·보건·복지",
    "미디어·문화·스포츠",
    "금융·보험",
    "기타",
  ]

  // 회사 유형 옵션
  const companyTypeOptions = [
    "대기업 지원용",
    "중견기업 지원용",
    "스타트업 지원용",
    "외국계 지원용",
    "공기업 지원용",
    "회사내규에 따름",
    "기타",
  ]

  // 지역 옵션
  const locationOptions = [
    "서울 전체",
    "서울 강남구",
    "서울 서초구",
    "서울 송파구",
    "서울 마포구",
    "서울 영등포구",
    "경기 성남시",
    "경기 수원시",
    "경기 이천시",
    "인천 전체",
    "부산 전체",
    "대구 전체",
    "광주 전체",
    "대전 전체",
    "울산 전체",
    "세종 전체",
    "전국",
    "해외",
    "재택",
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {resumeId ? "이력서 수정" : "이력서 작성"}
        </h1>
      </div>

      {/* 이력서 제목 및 상단 액션 */}
      <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full -mr-32 -mt-32 opacity-50"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="flex-1 mr-4">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-indigo-500 mr-2" />
              <Input
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="text-xl font-semibold border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl"
                placeholder="이력서 제목을 입력하세요"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-7">
              멋진 이력서의 시작은 눈에 띄는 제목부터!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200"
            >
              <Eye className="mr-1 h-4 w-4" />
              미리보기
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200"
            >
              <Download className="mr-1 h-4 w-4" />
              PDF 추출하기
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200">
              <Save className="mr-1 h-4 w-4" />
              저장하기
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">이력서 공개</span>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {isPublic ? "공개 시 포지션 제안을 받을 수 있습니다." : "비공개 상태입니다."}
            </span>
          </div>
        </div>
      </Card>

      {/* 이력서 작성 탭 */}
      <Tabs defaultValue="basic" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
          >
            <User className="w-4 h-4 mr-2" />
            기본 정보
          </TabsTrigger>
          <TabsTrigger
            value="work"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            경력
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            학력
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
          >
            <Code className="w-4 h-4 mr-2" />
            스킬
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
          >
            <Award className="w-4 h-4 mr-2" />
            추가 정보
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/30 to-purple-100/30 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full -mr-32 -mt-32 opacity-50"></div>

            <div className="flex items-center mb-4 relative z-10">
              <User className="w-5 h-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">기본 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2 text-indigo-500" />
                  이름
                </label>
                <Input
                  placeholder="이름을 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.name}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, name: e.target.value },
                    })
                  }
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  생년월일
                </label>
                <Input
                  type="date"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.birthDate}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, birthDate: e.target.value },
                    })
                  }
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  이메일
                </label>
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, email: e.target.value },
                    })
                  }
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  연락처
                </label>
                <Input
                  placeholder="연락처를 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.phone}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, phone: e.target.value },
                    })
                  }
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  주소
                </label>
                <Input
                  placeholder="주소를 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.address}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, address: e.target.value },
                    })
                  }
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  희망 직무
                </label>
                <Select
                  defaultValue={resumeData.basic.jobPosition}
                  onValueChange={(value) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, jobPosition: value },
                    })
                  }
                >
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl">
                    <SelectValue placeholder="희망 직무를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
                    <SelectItem value="backend">백엔드 개발자</SelectItem>
                    <SelectItem value="fullstack">풀스택 개발자</SelectItem>
                    <SelectItem value="mobile">모바일 개발자</SelectItem>
                    <SelectItem value="devops">DevOps 엔지니어</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* 이력서 리스트에 표시되는 정보 설정 섹션 */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 relative z-10">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Target className="w-5 h-5 text-indigo-500 mr-2" />
                이력서 분류 설정
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                아래 설정한 정보는 이력서 목록에 표시되며, 이력서를 분류하는 데 사용됩니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Building className="w-4 h-4 mr-2 text-indigo-500" />
                    직무 카테고리
                  </label>
                  <Select
                    value={resumeData.basic.jobCategory}
                    onValueChange={(value) =>
                      setResumeData({
                        ...resumeData,
                        basic: { ...resumeData.basic, jobCategory: value },
                      })
                    }
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl">
                      <SelectValue placeholder="직무 카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[200px]">
                      {jobCategoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Rocket className="w-4 h-4 mr-2 text-purple-500" />
                    회사 유형
                  </label>
                  <Select
                    value={resumeData.basic.companyType}
                    onValueChange={(value) =>
                      setResumeData({
                        ...resumeData,
                        basic: { ...resumeData.basic, companyType: value },
                      })
                    }
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl">
                      <SelectValue placeholder="회사 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[200px]">
                      {companyTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    희망 지역
                  </label>
                  <Select
                    value={resumeData.basic.location}
                    onValueChange={(value) =>
                      setResumeData({
                        ...resumeData,
                        basic: { ...resumeData.basic, location: value },
                      })
                    }
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl">
                      <SelectValue placeholder="희망 지역을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[200px]">
                      {locationOptions.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-6 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-pink-500" />
                자기소개
              </label>
              <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <Textarea
                  placeholder="간단한 자기소개를 입력하세요"
                  className="min-h-[150px] resize-none bg-white/80 dark:bg-gray-800/80 border-indigo-200 dark:border-indigo-700/50 dark:text-gray-100 rounded-xl"
                  value={resumeData.basic.introduction}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      basic: { ...resumeData.basic, introduction: e.target.value },
                    })
                  }
                />
                <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-2">
                  자기소개는 이력서의 첫인상을 결정합니다. 자신의 강점과 열정을 담아보세요!
                </p>
              </div>
            </motion.div>
          </Card>
        </TabsContent>

        <TabsContent value="work" className="space-y-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">경력 사항</h2>
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
              >
                + 경력 추가
              </Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">회사명</label>
                    <Input
                      placeholder="회사명을 입력하세요"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">부서/직책</label>
                    <Input
                      placeholder="부서/직책을 입력하세요"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">입사일</label>
                    <Input
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">퇴사일</label>
                    <Input
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">주요 업무</label>
                  <Textarea
                    placeholder="주요 업무를 입력하세요"
                    className="min-h-[100px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">학력 사항</h2>
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
              >
                + 학력 추가
              </Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">학교명</label>
                    <Input
                      placeholder="학교명을 입력하세요"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">전공</label>
                    <Input
                      placeholder="전공을 입력하세요"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">입학일</label>
                    <Input
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">졸업일</label>
                    <Input
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">학력 관련 추가 정보</label>
                  <Textarea
                    placeholder="추가 정보를 입력하세요"
                    className="min-h-[100px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">보유 스킬</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Code className="w-4 h-4 mr-2 text-indigo-500" />
                  기술 스택
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <Textarea
                    placeholder="보유한 기술 스택을 입력하세요 (쉼표로 구분)"
                    className="min-h-[100px] resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                    value={resumeData.skills.techStack}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        skills: { ...resumeData.skills, techStack: e.target.value },
                      })
                    }
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resumeData.skills.techStack.split(",").map(
                      (skill) =>
                        skill.trim() && (
                          <Badge
                            key={skill}
                            className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 px-2.5 py-1 rounded-full"
                          >
                            {skill.trim()}
                          </Badge>
                        ),
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    쉼표(,)로 구분하여 입력하세요. 입력 후 자동으로 태그가 생성됩니다.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 자격증 섹션 */}
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Certificate className="w-5 h-5 text-emerald-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">자격증</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1" /> 자격증 추가
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="certificate-1" className="border-b border-gray-200 dark:border-gray-800">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-3">
                      <Certificate className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">정보처리기사</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2024년 취득</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="space-y-4 pl-11">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">자격증명</label>
                        <Input
                          placeholder="자격증명을 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="정보처리기사"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">발급 기관</label>
                        <Input
                          placeholder="발급 기관을 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="한국산업인력공단"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">취득일</label>
                        <Input
                          type="date"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="2024-03-15"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">자격증 번호</label>
                        <Input
                          placeholder="자격증 번호를 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="24-A-123456"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">자격증을 추가해보세요!</p>
            </div>
          </Card>

          {/* 어학 및 외국어 능력 섹션 */}
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">어학 및 외국어 능력</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1" /> 어학 추가
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="language-1" className="border-b border-gray-200 dark:border-gray-800">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <Languages className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">TOEIC</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">850점 (2023년)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="space-y-4 pl-11">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시험명</label>
                        <Input
                          placeholder="시험명을 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="TOEIC"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">점수/급수</label>
                        <Input
                          placeholder="점수 또는 급수를 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="850"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">취득일</label>
                        <Input
                          type="date"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="2023-09-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          만료일 (선택사항)
                        </label>
                        <Input
                          type="date"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="2025-09-10"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="language-2" className="border-b border-gray-200 dark:border-gray-800">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <Languages className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">JLPT</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">N2 (2022년)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="space-y-4 pl-11">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시험명</label>
                        <Input
                          placeholder="시험명을 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="JLPT"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">점수/급수</label>
                        <Input
                          placeholder="점수 또는 급수를 입력하세요"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="N2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">취득일</label>
                        <Input
                          type="date"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                          defaultValue="2022-07-05"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          만료일 (선택사항)
                        </label>
                        <Input
                          type="date"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">외국어 능력</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">영어</h4>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        비즈니스
                      </Badge>
                    </div>
                    <Select defaultValue="business">
                      <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-800/50 rounded-lg text-sm">
                        <SelectValue placeholder="능숙도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">원어민 수준</SelectItem>
                        <SelectItem value="business">비즈니스 레벨</SelectItem>
                        <SelectItem value="daily">일상 회화</SelectItem>
                        <SelectItem value="basic">기초</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-100 dark:border-red-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-red-700 dark:text-red-300">일본어</h4>
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">일상 회화</Badge>
                    </div>
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 border-red-200 dark:border-red-800/50 rounded-lg text-sm">
                        <SelectValue placeholder="능숙도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">원어민 수준</SelectItem>
                        <SelectItem value="business">비즈니스 레벨</SelectItem>
                        <SelectItem value="daily">일상 회화</SelectItem>
                        <SelectItem value="basic">기초</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">언어 추가</h4>
                    </div>
                    <Select>
                      <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                        <SelectValue placeholder="언어 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chinese">중국어</SelectItem>
                        <SelectItem value="spanish">스페인어</SelectItem>
                        <SelectItem value="french">프랑스어</SelectItem>
                        <SelectItem value="german">독일어</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="space-y-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">추가 정보</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">포트폴리오 링크</label>
                <Input
                  placeholder="포트폴리오 링크를 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.additional.portfolio || ""}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      additional: { ...resumeData.additional, portfolio: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
                <Input
                  placeholder="GitHub 링크를 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.additional.github || ""}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      additional: { ...resumeData.additional, github: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">블로그</label>
                <Input
                  placeholder="블로그 링크를 입력하세요"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.additional.blog || ""}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      additional: { ...resumeData.additional, blog: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">수상 경력</label>
                <Textarea
                  placeholder="수상 경력을 입력하세요"
                  className="min-h-[100px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.additional.awards || ""}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      additional: { ...resumeData.additional, awards: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">기타 사항</label>
                <Textarea
                  placeholder="기타 사항을 입력하세요"
                  className="min-h-[100px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  value={resumeData.additional.etc || ""}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      additional: { ...resumeData.additional, etc: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 하단 저장 버튼 */}
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200"
          onClick={handleGoBack}
        >
          취소
        </Button>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200">
          <Save className="mr-1 h-4 w-4" />
          저장하기
        </Button>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <p className="text-gray-700 dark:text-gray-300">이력서 불러오는 중...</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
