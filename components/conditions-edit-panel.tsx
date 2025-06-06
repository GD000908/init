"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface ConditionsEditPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConditionsEditPanel({ isOpen, onClose }: ConditionsEditPanelProps) {
  const [conditions, setConditions] = useState({
    jobTypes: ["웹・SW 개발", "프론트엔드 개발", "백엔드 개발"],
    locations: ["서울특별시", "경기도"],
    minSalary: "3500",
    preferences: ["재택근무 가능", "유연근무제", "주 4일 근무"],
    newJobType: "",
    newLocation: "",
    newPreference: "",
  })

  const handleChange = (field: string, value: string) => {
    setConditions((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddItem = (field: string, value: string, inputField: string) => {
    if (!value.trim()) return

    setConditions((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], value.trim()],
      [inputField]: "",
    }))
  }

  const handleRemoveItem = (field: string, index: number) => {
    setConditions((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    // 실제로는 API 호출 등을 통해 저장
    console.log("저장된 희망 조건:", conditions)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">희망 조건 수정</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* 직군・직무 */}
          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">직군・직무</Label>
            <div className="flex flex-wrap gap-2">
              {conditions.jobTypes.map((job, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {job}
                  <button
                    onClick={() => handleRemoveItem("jobTypes", index)}
                    className="ml-1 text-indigo-500 hover:text-red-500 dark:text-indigo-400 dark:hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="직군・직무 추가"
                value={conditions.newJobType}
                onChange={(e) => handleChange("newJobType", e.target.value)}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddItem("jobTypes", conditions.newJobType, "newJobType")
                  }
                }}
              />
              <Button
                size="icon"
                onClick={() => handleAddItem("jobTypes", conditions.newJobType, "newJobType")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* 근무 지역 */}
          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">근무 지역</Label>
            <div className="flex flex-wrap gap-2">
              {conditions.locations.map((location, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {location}
                  <button
                    onClick={() => handleRemoveItem("locations", index)}
                    className="ml-1 text-purple-500 hover:text-red-500 dark:text-purple-400 dark:hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="근무 지역 추가"
                value={conditions.newLocation}
                onChange={(e) => handleChange("newLocation", e.target.value)}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddItem("locations", conditions.newLocation, "newLocation")
                  }
                }}
              />
              <Button
                size="icon"
                onClick={() => handleAddItem("locations", conditions.newLocation, "newLocation")}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* 연봉 */}
          <div className="space-y-3">
            <Label htmlFor="minSalary" className="text-gray-700 dark:text-gray-300">
              희망 연봉 (만원)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="minSalary"
                type="number"
                value={conditions.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value)}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
              />
              
            </div>
          </div>

          {/* 기타 희망사항 */}
          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">기타 희망사항</Label>
            <div className="flex flex-wrap gap-2">
              {conditions.preferences.map((pref, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {pref}
                  <button
                    onClick={() => handleRemoveItem("preferences", index)}
                    className="ml-1 text-emerald-500 hover:text-red-500 dark:text-emerald-400 dark:hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="기타 희망사항 추가"
                value={conditions.newPreference}
                onChange={(e) => handleChange("newPreference", e.target.value)}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddItem("preferences", conditions.newPreference, "newPreference")
                  }
                }}
              />
              <Button
                size="icon"
                onClick={() => handleAddItem("preferences", conditions.newPreference, "newPreference")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
              >
                <Plus size={16} />
              </Button>
            </div>
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
