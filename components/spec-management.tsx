"use client"
import { useState } from "react"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Briefcase,
  GraduationCap,
  Code,
  FileCheck,
  Target,
  Info,
  Plus,
  ChevronDown,
  ChevronUp,
  LinkIcon,
  Globe,
  Award,
  Folder,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Edit2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SkillTag from "./skill-tag"

export default function SpecManagement() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"])
  const [newSkill, setNewSkill] = useState("")
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)

  const [careerStats, setCareerStats] = useState({
    experience: "0개월",
    workRecords: "0개",
    careerGoal: "커리어 목표를 입력해 주세요",
  })

  const [editingCard, setEditingCard] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEditCard = (field: string, value: string) => {
    setEditingCard(field)
    setEditValue(value)
  }

  const saveCardEdit = () => {
    if (editingCard) {
      setCareerStats({
        ...careerStats,
        [editingCard]: editValue,
      })
      setEditingCard(null)
    }
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // 프로필 데이터
  const profile = {
    name: "박건도",
    email: "nagundo@naver.com",
    phone: "010-1234-5678",
    location: "서울특별시 강남구",
    careerLevel: "신입",
    jobTitle: "프론트엔드 개발자",
    stacks: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
    introduction:
      "안녕하세요, 신입 프론트엔드 개발자 박건도입니다. 사용자 경험을 중요시하며 새로운 기술을 배우는 것을 좋아합니다. 웹 개발에 대한 열정을 가지고 있으며, 특히 React와 TypeScript를 활용한 프로젝트에 관심이 많습니다.",
  }

  // 섹션 정의
  const sections = [
    { id: "work", title: "업무 경력", icon: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> },
    {
      id: "education",
      title: "학력",
      icon: <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
    { id: "skills", title: "스킬", icon: <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { id: "certificates", title: "자격증", icon: <FileCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
    { id: "links", title: "링크", icon: <LinkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { id: "languages", title: "어학", icon: <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
    { id: "projects", title: "프로젝트", icon: <Folder className="w-5 h-5 text-pink-600 dark:text-pink-400" /> },
    {
      id: "activities",
      title: "활동 & 경험",
      icon: <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
    },
    { id: "military", title: "병역", icon: <Shield className="w-5 h-5 text-red-600 dark:text-red-400" /> },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">스펙 관리</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
          <Save className="mr-2 h-4 w-4" />
          모든 변경사항 저장
        </Button>
      </div>

      {/* 프로필 카드 */}
      <ProfileCard profile={profile} onEditProfile={() => setIsProfileEditOpen(true)} />

      {/* 간단 소개 */}
      <IntroductionCard profile={profile} />

      {/* 경력 요약 카드 */}
      <div ref={statsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="총 경력"
          value={careerStats.experience}
          icon={<Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          field="experience"
          onEdit={handleEditCard}
          isEditing={editingCard === "experience"}
          editValue={editValue}
          onEditChange={setEditValue}
          onSave={saveCardEdit}
        />
        <StatCard
          title="총 업무기록"
          value={careerStats.workRecords}
          icon={<FileCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          field="workRecords"
          onEdit={handleEditCard}
          isEditing={editingCard === "workRecords"}
          editValue={editValue}
          onEditChange={setEditValue}
          onSave={saveCardEdit}
        />
        <StatCard
          title="내 커리어 목표"
          value={careerStats.careerGoal}
          icon={<Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          field="careerGoal"
          onEdit={handleEditCard}
          isEditing={editingCard === "careerGoal"}
          editValue={editValue}
          onEditChange={setEditValue}
          onSave={saveCardEdit}
        />
      </div>

      {/* 섹션들 */}
      <div className="space-y-6">
        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            icon={section.icon}
            isActive={activeSection === section.id}
            onClick={() => handleSectionClick(section.id)}
          >
            {activeSection === section.id && (
              <div className="p-4">
                {section.id === "work" && <WorkExperienceForm />}
                {section.id === "education" && <EducationForm />}
                {section.id === "skills" && (
                  <SkillsForm
                    skills={skills}
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    handleKeyDown={handleKeyDown}
                  />
                )}
                {section.id === "certificates" && <CertificatesForm />}
                {section.id === "links" && <LinksForm />}
                {section.id === "languages" && <LanguagesForm />}
                {section.id === "projects" && <ProjectsForm />}
                {section.id === "activities" && <ActivitiesForm />}
                {section.id === "military" && <MilitaryForm />}
              </div>
            )}
          </Section>
        ))}
      </div>
      {/* 프로필 수정 패널 */}
      <ProfileEditPanel isOpen={isProfileEditOpen} onClose={() => setIsProfileEditOpen(false)} />
    </div>
  )
}

interface ProfileCardProps {
  profile: {
    name: string
    email: string
    phone: string
    location: string
    careerLevel: string
    jobTitle: string
    stacks: string[]
  }
  onEditProfile: () => void
}

function ProfileCard({ profile, onEditProfile }: ProfileCardProps) {
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
      <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full -mr-32 -mt-32 opacity-50"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="flex items-center">
            <div className="relative">
              <motion.div
                className="w-20 h-20 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <span className="text-3xl font-semibold">{profile.name.charAt(0)}</span>
                </div>
              </motion.div>
            </div>
            <div className="ml-5">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{profile.name}</h2>
                <div className="flex items-center ml-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">이력서 공개</span>
                  <Switch />
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{profile.careerLevel}</span>
                <span className="mx-2">|</span>
                <span>{profile.jobTitle}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 md:mt-0 flex items-center gap-1 dark:border-gray-700 dark:text-gray-300 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
            onClick={onEditProfile}
          >
            <Edit2 className="w-4 h-4" />
            <span>프로필 수정</span>
          </Button>
        </div>

        {/* 연락처 및 기본 정보 */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">이메일</p>
                <p className="text-sm font-medium dark:text-gray-300">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">연락처</p>
                <p className="text-sm font-medium dark:text-gray-300">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">거주지</p>
                <p className="text-sm font-medium dark:text-gray-300">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Code className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">주요 스택</p>
                <p className="text-sm font-medium dark:text-gray-300 truncate max-w-[200px]">
                  {profile.stacks.slice(0, 3).join(", ")}{" "}
                  {profile.stacks.length > 3 ? `외 ${profile.stacks.length - 3}개` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

interface IntroductionCardProps {
  profile: {
    introduction: string
  }
}

function IntroductionCard({ profile }: IntroductionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [introduction, setIntroduction] = useState(profile.introduction)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-indigo-100/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full -mr-32 -mt-32 opacity-50"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">나의 간단 소개</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "취소" : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="min-h-[150px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                  placeholder="자기소개를 입력하세요"
                />
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    onClick={() => setIsEditing(false)}
                  >
                    저장
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
              >
                {introduction || "자기소개를 입력해주세요."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  field: string
  onEdit: (field: string, value: string) => void
  isEditing: boolean
  editValue: string
  onEditChange: (value: string) => void
  onSave: () => void
}

function StatCard({ title, value, icon, field, onEdit, isEditing, editValue, onEditChange, onSave }: StatCardProps) {
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
      whileHover={{ y: -5 }}
    >
      <Card className="p-4 relative z-10 rounded-2xl shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-100 to-gray-50 dark:from-gray-800/30 dark:to-gray-800/10 rounded-full -mr-12 -mt-12 opacity-50"></div>

        <div className="flex items-center justify-between relative z-10">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">{icon}</div>
        </div>

        {isEditing ? (
          <div className="mt-2 flex gap-2">
            <Input
              value={editValue}
              onChange={(e) => onEditChange(e.target.value)}
              className="text-sm dark:bg-gray-800"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") onSave()
              }}
            />
            <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={onSave}>
              저장
            </Button>
          </div>
        ) : (
          <p
            className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100 relative z-10 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            onClick={() => onEdit(field, value)}
          >
            {value}
          </p>
        )}
      </Card>
    </motion.div>
  )
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  children?: React.ReactNode
  isActive: boolean
  onClick: () => void
}

function Section({ title, icon, children, isActive, onClick }: SectionProps) {
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
      className="space-y-2"
    >
      <div
        className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onClick}
      >
        <div className="flex items-center">
          {icon}
          <h2 className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h2>
        </div>
        <Info className="w-4 h-4 ml-2 text-gray-400" />
      </div>

      <Card
        className={`transition-all duration-300 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden ${
          isActive ? "ring-2 ring-indigo-400 dark:ring-indigo-600" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          {children && isActive ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-400 text-sm p-4 cursor-pointer"
              onClick={onClick}
            >
              <div className="text-center">
                <p>클릭해서 정보를 입력하세요</p>
                <div className="flex justify-center mt-2">
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="text-gray-400"
                  >
                    {isActive ? <ChevronUp className="w-5 h-5 mx-auto" /> : <ChevronDown className="w-5 h-5 mx-auto" />}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

function WorkExperienceForm() {
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: "work-" + Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    },
  ])

  const addWorkExperience = () => {
    const newWorkExperience = {
      id: "work-" + Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    }
    setWorkExperiences([...workExperiences, newWorkExperience])
  }

  const removeWorkExperience = (id: string) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter((exp) => exp.id !== id))
    }
  }

  const updateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setWorkExperiences(workExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  return (
    <div className="space-y-6">
      {workExperiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">업무 경력 #{index + 1}</h3>
            {workExperiences.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeWorkExperience(experience.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">회사명</label>
              <Input
                placeholder="회사명을 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={experience.company}
                onChange={(e) => updateWorkExperience(experience.id, "company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">직책/직무</label>
              <Input
                placeholder="직책 또는 직무를 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={experience.position}
                onChange={(e) => updateWorkExperience(experience.id, "position", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시작일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={experience.startDate}
                onChange={(e) => updateWorkExperience(experience.id, "startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">종료일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={experience.endDate}
                onChange={(e) => updateWorkExperience(experience.id, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">업무 내용</label>
            <Textarea
              placeholder="담당했던 업무에 대해 설명해주세요"
              className="min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={experience.description}
              onChange={(e) => updateWorkExperience(experience.id, "description", e.target.value)}
            />
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addWorkExperience}
        >
          <Plus className="w-4 h-4 mr-2" />
          업무 경력 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function EducationForm() {
  const [educations, setEducations] = useState([
    {
      id: "edu-" + Date.now(),
      school: "",
      major: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    },
  ])

  const addEducation = () => {
    const newEducation = {
      id: "edu-" + Date.now(),
      school: "",
      major: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    }
    setEducations([...educations, newEducation])
  }

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter((edu) => edu.id !== id))
    }
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setEducations(educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  return (
    <div className="space-y-6">
      {educations.map((education, index) => (
        <motion.div
          key={education.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">학력 #{index + 1}</h3>
            {educations.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">학교명</label>
            <Input
              placeholder="학교명을 입력하세요"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={education.school}
              onChange={(e) => updateEducation(education.id, "school", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">전공</label>
              <Input
                placeholder="전공을 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={education.major}
                onChange={(e) => updateEducation(education.id, "major", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">학위</label>
              <Input
                placeholder="학위를 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">입학일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">졸업일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addEducation}
        >
          <Plus className="w-4 h-4 mr-2" />
          학력 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function CertificatesForm() {
  const [certificates, setCertificates] = useState([
    {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      acquisitionDate: "",
      expirationDate: "",
    },
  ])

  const addCertificate = () => {
    const newCertificate = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      acquisitionDate: "",
      expirationDate: "",
    }
    setCertificates([...certificates, newCertificate])
  }

  const removeCertificate = (id: string) => {
    if (certificates.length > 1) {
      setCertificates(certificates.filter((cert) => cert.id !== id))
    }
  }

  const updateCertificate = (id: string, field: string, value: string) => {
    setCertificates(certificates.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  return (
    <div className="space-y-6">
      {certificates.map((certificate, index) => (
        <motion.div
          key={certificate.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">자격증 #{index + 1}</h3>
            {certificates.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeCertificate(certificate.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">자격증명</label>
              <Input
                placeholder="자격증명을 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={certificate.name}
                onChange={(e) => updateCertificate(certificate.id, "name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">발급 기관</label>
              <Input
                placeholder="발급 기관을 입력하세요"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={certificate.issuer}
                onChange={(e) => updateCertificate(certificate.id, "issuer", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">취득일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={certificate.acquisitionDate}
                onChange={(e) => updateCertificate(certificate.id, "acquisitionDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">만료일 (선택사항)</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={certificate.expirationDate}
                onChange={(e) => updateCertificate(certificate.id, "expirationDate", e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addCertificate}
        >
          <Plus className="w-4 h-4 mr-2" />
          자격증 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function LinksForm() {
  const [links, setLinks] = useState([
    {
      id: "link-" + Date.now(),
      title: "",
      url: "",
      description: "",
    },
  ])

  const addLink = () => {
    const newLink = {
      id: "link-" + Date.now(),
      title: "",
      url: "",
      description: "",
    }
    setLinks([...links, newLink])
  }

  const removeLink = (id: string) => {
    if (links.length > 1) {
      setLinks(links.filter((link) => link.id !== id))
    }
  }

  const updateLink = (id: string, field: string, value: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  return (
    <div className="space-y-6">
      {links.map((link, index) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">링크 #{index + 1}</h3>
            {links.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeLink(link.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">링크 제목</label>
              <Input
                placeholder="예: 개인 블로그, 포트폴리오, GitHub"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={link.title}
                onChange={(e) => updateLink(link.id, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
              <Input
                placeholder="https://"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={link.url}
                onChange={(e) => updateLink(link.id, "url", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">설명 (선택사항)</label>
            <Textarea
              placeholder="링크에 대한 간단한 설명을 입력하세요"
              className="min-h-[80px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={link.description}
              onChange={(e) => updateLink(link.id, "description", e.target.value)}
            />
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addLink}
        >
          <Plus className="w-4 h-4 mr-2" />
          링크 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function LanguagesForm() {
  const [languages, setLanguages] = useState([
    {
      id: "lang-" + Date.now(),
      language: "",
      level: "",
      testName: "",
      score: "",
    },
  ])

  const addLanguage = () => {
    const newLanguage = {
      id: "lang-" + Date.now(),
      language: "",
      level: "",
      testName: "",
      score: "",
    }
    setLanguages([...languages, newLanguage])
  }

  const removeLanguage = (id: string) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((lang) => lang.id !== id))
    }
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    setLanguages(languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)))
  }

  return (
    <div className="space-y-6">
      {languages.map((language, index) => (
        <motion.div
          key={language.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">어학 #{index + 1}</h3>
            {languages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeLanguage(language.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">언어</label>
              <Input
                placeholder="예: 영어, 일본어, 중국어"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={language.language}
                onChange={(e) => updateLanguage(language.id, "language", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">수준</label>
              <Input
                placeholder="예: 비즈니스 회화, 일상 회화, 기초"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={language.level}
                onChange={(e) => updateLanguage(language.id, "level", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시험명 (선택사항)</label>
              <Input
                placeholder="예: TOEIC, JLPT, HSK"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={language.testName}
                onChange={(e) => updateLanguage(language.id, "testName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">점수/급수 (선택사항)</label>
              <Input
                placeholder="예: 900점, N1, 6급"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={language.score}
                onChange={(e) => updateLanguage(language.id, "score", e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addLanguage}
        >
          <Plus className="w-4 h-4 mr-2" />
          어학 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function ProjectsForm() {
  const [projects, setProjects] = useState([
    {
      id: "proj-" + Date.now(),
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
      url: "",
    },
  ])

  const addProject = () => {
    const newProject = {
      id: "proj-" + Date.now(),
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
      url: "",
    }
    setProjects([...projects, newProject])
  }

  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter((proj) => proj.id !== id))
    }
  }

  const updateProject = (id: string, field: string, value: string) => {
    setProjects(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">프로젝트 #{index + 1}</h3>
            {projects.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">프로젝트명</label>
            <Input
              placeholder="프로젝트명을 입력하세요"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={project.name}
              onChange={(e) => updateProject(project.id, "name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시작일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={project.startDate}
                onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">종료일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={project.endDate}
                onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">프로젝트 설명</label>
            <Textarea
              placeholder="프로젝트에 대한 설명을 입력하세요"
              className="min-h-[120px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={project.description}
              onChange={(e) => updateProject(project.id, "description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">사용 기술</label>
            <Input
              placeholder="예: React, Node.js, MongoDB"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL (선택사항)</label>
            <Input
              placeholder="프로젝트 URL을 입력하세요"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={project.url}
              onChange={(e) => updateProject(project.id, "url", e.target.value)}
            />
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addProject}
        >
          <Plus className="w-4 h-4 mr-2" />
          프로젝트 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function ActivitiesForm() {
  const [activities, setActivities] = useState([
    {
      id: "act-" + Date.now(),
      name: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])

  const addActivity = () => {
    const newActivity = {
      id: "act-" + Date.now(),
      name: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setActivities([...activities, newActivity])
  }

  const removeActivity = (id: string) => {
    if (activities.length > 1) {
      setActivities(activities.filter((act) => act.id !== id))
    }
  }

  const updateActivity = (id: string, field: string, value: string) => {
    setActivities(activities.map((act) => (act.id === id ? { ...act, [field]: value } : act)))
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">활동 #{index + 1}</h3>
            {activities.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeActivity(activity.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">활동명</label>
            <Input
              placeholder="활동명을 입력하세요"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={activity.name}
              onChange={(e) => updateActivity(activity.id, "name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">기관/단체명</label>
            <Input
              placeholder="기관 또는 단체명을 입력하세요"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={activity.organization}
              onChange={(e) => updateActivity(activity.id, "organization", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시작일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={activity.startDate}
                onChange={(e) => updateActivity(activity.id, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">종료일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={activity.endDate}
                onChange={(e) => updateActivity(activity.id, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">활동 내용</label>
            <Textarea
              placeholder="활동 내용을 입력하세요"
              className="min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={activity.description}
              onChange={(e) => updateActivity(activity.id, "description", e.target.value)}
            />
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addActivity}
        >
          <Plus className="w-4 h-4 mr-2" />
          활동 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

function MilitaryForm() {
  const [militaryRecords, setMilitaryRecords] = useState([
    {
      id: "mil-" + Date.now(),
      serviceType: "",
      militaryBranch: "",
      startDate: "",
      endDate: "",
      position: "",
      note: "",
    },
  ])

  const addMilitaryRecord = () => {
    const newMilitaryRecord = {
      id: "mil-" + Date.now(),
      serviceType: "",
      militaryBranch: "",
      startDate: "",
      endDate: "",
      position: "",
      note: "",
    }
    setMilitaryRecords([...militaryRecords, newMilitaryRecord])
  }

  const removeMilitaryRecord = (id: string) => {
    if (militaryRecords.length > 1) {
      setMilitaryRecords(militaryRecords.filter((record) => record.id !== id))
    }
  }

  const updateMilitaryRecord = (id: string, field: string, value: string) => {
    setMilitaryRecords(militaryRecords.map((record) => (record.id === id ? { ...record, [field]: value } : record)))
  }

  return (
    <div className="space-y-6">
      {militaryRecords.map((record, index) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">병역 #{index + 1}</h3>
            {militaryRecords.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => removeMilitaryRecord(record.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">병역 구분</label>
              <Input
                placeholder="예: 육군, 해군, 공군, 면제"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={record.serviceType}
                onChange={(e) => updateMilitaryRecord(record.id, "serviceType", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">군별</label>
              <Input
                placeholder="예: 현역, 보충역, 전문연구요원"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={record.militaryBranch}
                onChange={(e) => updateMilitaryRecord(record.id, "militaryBranch", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">입대일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={record.startDate}
                onChange={(e) => updateMilitaryRecord(record.id, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">전역일</label>
              <Input
                type="date"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                value={record.endDate}
                onChange={(e) => updateMilitaryRecord(record.id, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">보직</label>
            <Input
              placeholder="예: 전산병, 통신병"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={record.position}
              onChange={(e) => updateMilitaryRecord(record.id, "position", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">비고 (선택사항)</label>
            <Textarea
              placeholder="추가 정보를 입력하세요"
              className="min-h-[80px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              value={record.note}
              onChange={(e) => updateMilitaryRecord(record.id, "note", e.target.value)}
            />
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full max-w-md text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
          onClick={addMilitaryRecord}
        >
          <Plus className="w-4 h-4 mr-2" />
          병역 정보 추가
        </Button>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">필수 항목을 모두 입력해야 저장됩니다.</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
      </div>
    </div>
  )
}

// Save 아이콘 추가
function Save(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  )
}

function ProfileEditPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50 dark:bg-gray-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-md w-full mx-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">프로필 수정</h2>
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={onClose}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">이름</label>
                <Input
                  placeholder="이름을 입력하세요"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">이메일</label>
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">연락처</label>
                <Input
                  placeholder="연락처를 입력하세요"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">거주지</label>
                <Input
                  placeholder="거주지를 입력하세요"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">직무</label>
                <Input
                  placeholder="직무를 입력하세요"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 rounded-xl"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">저장</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SkillsForm({
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  handleKeyDown,
}: {
  skills: string[]
  newSkill: string
  setNewSkill: (value: string) => void
  addSkill: () => void
  removeSkill: (skillToRemove: string) => void
  handleKeyDown: (e: React.KeyboardEvent) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="새로운 스킬을 입력하세요"
          className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl" onClick={addSkill}>
          추가
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} onRemove={removeSkill} />
        ))}
      </div>
    </div>
  )
}
