"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, FileText } from "lucide-react"

interface SavedCoverLetter {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  questions: number
}

interface SavedCoverLettersModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SavedCoverLettersModal({ isOpen, onClose }: SavedCoverLettersModalProps) {
  // Mock data - in a real app, this would come from an API or database
  const [savedCoverLetters] = useState<SavedCoverLetter[]>([
    {
      id: "1",
      title: "삼성_최종",
      createdAt: "2025.05.01",
      updatedAt: "2025.05.07",
      questions: 3,
    },
    {
      id: "2",
      title: "네이버_지원동기",
      createdAt: "2025.04.15",
      updatedAt: "2025.04.20",
      questions: 2,
    },
    {
      id: "3",
      title: "카카오_자기소개",
      createdAt: "2025.03.22",
      updatedAt: "2025.03.25",
      questions: 4,
    },
    {
      id: "4",
      title: "라인_경력기술서",
      createdAt: "2025.02.10",
      updatedAt: "2025.02.15",
      questions: 1,
    },
  ])

  const handleLoad = (id: string) => {
    // In a real app, this would load the selected cover letter
    console.log("Loading cover letter with ID:", id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            작성한 자기소개서 불러오기
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          {savedCoverLetters.length > 0 ? (
            <div className="space-y-2">
              {savedCoverLetters.map((letter) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{letter.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>작성일: {letter.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>수정일: {letter.updatedAt}</span>
                        </div>
                        <div>문항 수: {letter.questions}개</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                      onClick={() => handleLoad(letter.id)}
                    >
                      불러오기
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">저장된 자기소개서가 없습니다.</div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-gray-700 rounded-xl">
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
