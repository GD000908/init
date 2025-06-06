"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface QuestionBlockProps {
  index: number
  id: string
  title: string
  content: string
  showTitle: boolean
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
}

export default function QuestionBlock({
  index,
  id,
  title,
  content,
  showTitle,
  onTitleChange,
  onContentChange,
}: QuestionBlockProps) {
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  useEffect(() => {
    setCharCount(content.length)
  }, [content])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    if (newContent.length <= maxChars) {
      onContentChange(newContent)
      setCharCount(newContent.length)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative pl-6 border-l-4 border-indigo-500 dark:border-indigo-600"
      id={`question-block-${index}`}
    >
      {showTitle && (
        <div className="mb-3 flex items-center gap-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px]">문항 {index + 1}</div>
          <Input
            placeholder="지원 동기, 입사 후 포부 등 입력"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl"
          />
        </div>
      )}

      <div className="space-y-2">
        <Textarea
          id={id}
          placeholder="내용을 입력해주세요 (최대 500자)"
          value={content}
          onChange={handleContentChange}
          className="min-h-[350px] resize-none border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl"
        />

        <div
          className={`text-right text-sm ${charCount > maxChars * 0.9 ? "text-amber-600 dark:text-amber-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          {charCount} / {maxChars}자
        </div>
      </div>
    </motion.div>
  )
}
