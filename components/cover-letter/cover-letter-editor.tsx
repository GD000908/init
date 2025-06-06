"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Save, FileDown, Plus, Minus, FileText, FileOutput, Info } from "lucide-react"
import QuestionBlock from "./question-block"
import SavedCoverLettersModal from "./saved-cover-letters-modal"

interface Question {
  id: string
  title: string
  content: string
}

export default function CoverLetterEditor() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [showMultipleQuestions, setShowMultipleQuestions] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Initialize with one question
  useEffect(() => {
    if (questions.length === 0) {
      addQuestion()
    }
  }, [questions.length])

  const addQuestion = () => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      title: "",
      content: "",
    }
    setQuestions([...questions, newQuestion])

    // 더 부드러운 스크롤 및 포커스 처리
    setTimeout(() => {
      const newIndex = questions.length
      const questionElement = document.getElementById(`question-block-${newIndex}`)
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: "smooth", block: "center" })

        // 포커스 설정 지연 추가
        setTimeout(() => {
          const inputToFocus = showMultipleQuestions
            ? questionElement.querySelector("input")
            : questionElement.querySelector("textarea")

          if (inputToFocus) {
            ;(inputToFocus as HTMLElement).focus()
          }
        }, 300) // 스크롤 완료 후 포커스
      }
    }, 100)
  }

  const removeLastQuestion = () => {
    if (questions.length > 1) {
      // 삭제 전 이전 질문으로 스크롤
      const prevIndex = questions.length - 2
      scrollToQuestion(prevIndex)

      // 약간의 지연 후 삭제 실행
      setTimeout(() => {
        setQuestions(questions.slice(0, -1))
      }, 100)
    }
  }

  const updateQuestion = (id: string, field: "title" | "content", value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const scrollToQuestion = (index: number) => {
    const questionElement = document.getElementById(`question-block-${index}`)
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSaveDraft = () => {
    // In a real app, this would save to a database
    console.log("Saving draft:", { title, questions })
    // Show success notification
  }

  const handleSaveFinal = () => {
    // In a real app, this would save to a database as final
    console.log("Saving final:", { title, questions })
    // Show success notification
  }

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log("Exporting as PDF")
    setShowExportOptions(false)
  }

  const handleExportWord = () => {
    // In a real app, this would generate and download a Word document
    console.log("Exporting as Word")
    setShowExportOptions(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">자소서 작성</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              <FileText className="w-4 h-4" />
              <span>저장된 자소서</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Question navigation sidebar */}
          <AnimatePresence>
            {showMultipleQuestions && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "60px" }}
                exit={{ opacity: 0, width: 0 }}
                className="h-fit"
              >
                <Card className="w-[60px] p-2 flex flex-col items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 ease-in-out">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="w-9 h-9 rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                      onClick={() => scrollToQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-1"></div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                    onClick={removeLastQuestion}
                    disabled={questions.length <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                    onClick={addQuestion}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main editor area */}
          <div className="flex-1">
            <Card className="p-6 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative rounded-2xl shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full -mr-32 -mt-32 opacity-50"></div>

              <div className="relative z-10 space-y-6">
                <Input
                  className="text-xl font-semibold border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl"
                  placeholder="자기소개서 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch checked={showMultipleQuestions} onCheckedChange={setShowMultipleQuestions} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">여러 문항 작성</span>
                  </div>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      ON: 여러 문항을 작성할 수 있습니다.
                      <br />
                      OFF: 하나의 문항만 작성할 수 있습니다.
                    </div>
                  </div>
                </div>

                <div ref={containerRef} className="space-y-8">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      id={`question-block-${index}`}
                      className={index > 0 && !showMultipleQuestions ? "hidden" : ""}
                    >
                      <QuestionBlock
                        index={index}
                        id={question.id}
                        title={question.title}
                        content={question.content}
                        showTitle={showMultipleQuestions}
                        onTitleChange={(value) => updateQuestion(question.id, "title", value)}
                        onContentChange={(value) => updateQuestion(question.id, "content", value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Action sidebar */}
          <div
            className="sticky top-8 h-fit transition-all duration-300 ease-in-out z-20"
            style={{ position: "sticky", top: "2rem" }}
          >
            <Card className="w-[200px] p-4 flex flex-col gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                중간 저장
              </Button>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                onClick={handleSaveFinal}
              >
                <Save className="w-4 h-4 mr-2" />
                최종 저장
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  내보내기
                </Button>

                {showExportOptions && (
                  <Card className="absolute right-0 top-full mt-2 w-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl z-10">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={handleExportPDF}
                      >
                        <FileOutput className="w-4 h-4 mr-2" />
                        PDF로 저장
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={handleExportWord}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Word로 저장
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Saved Cover Letters Modal */}
      <SavedCoverLettersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
