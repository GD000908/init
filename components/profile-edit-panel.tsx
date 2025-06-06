"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileEditPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileEditPanel({ isOpen, onClose }: ProfileEditPanelProps) {
  const [profile, setProfile] = useState({
    name: "박건도",
    email: "nagundo@naver.com",
    phone: "010-1234-5678",
    careerLevel: "신입",
    jobTitle: "개발자",
    introduction: "안녕하세요, 신입 개발자 박건도입니다. 웹 개발에 관심이 많으며 새로운 기술을 배우는 것을 좋아합니다.",
  })

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // 실제로는 API 호출 등을 통해 저장
    console.log("저장된 프로필:", profile)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">프로필 수정</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-700 dark:text-gray-300">
              이름
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-gray-700 dark:text-gray-300">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right text-gray-700 dark:text-gray-300">
              연락처
            </Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="careerLevel" className="text-right text-gray-700 dark:text-gray-300">
              경력
            </Label>
            <Select value={profile.careerLevel} onValueChange={(value) => handleChange("careerLevel", value)}>
              <SelectTrigger
                id="careerLevel"
                className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              >
                <SelectValue placeholder="경력 선택" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="신입">신입</SelectItem>
                <SelectItem value="1년 미만">1년 미만</SelectItem>
                <SelectItem value="1~3년">1~3년</SelectItem>
                <SelectItem value="3~5년">3~5년</SelectItem>
                <SelectItem value="5~10년">5~10년</SelectItem>
                <SelectItem value="10년 이상">10년 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right text-gray-700 dark:text-gray-300">
              직무
            </Label>
            <Input
              id="jobTitle"
              value={profile.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="introduction" className="text-right text-gray-700 dark:text-gray-300 pt-2">
              자기소개
            </Label>
            <Textarea
              id="introduction"
              value={profile.introduction}
              onChange={(e) => handleChange("introduction", e.target.value)}
              className="col-span-3 h-24 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-gray-700 rounded-xl">
            취소
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
