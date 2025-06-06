"use client"
import { useState, useRef } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ImageIcon, X, Smile, MapPin, Calendar, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface CreatePostFormProps {
  onCreatePost: (post: { content: string; images?: string[] }) => void
}

export default function CreatePostForm({ onCreatePost }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (!isExpanded && e.target.value) {
      setIsExpanded(true)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // 실제 구현에서는 이미지를 서버에 업로드하고 URL을 받아옵니다
      // 여기서는 데모를 위해 placeholder 이미지를 사용합니다
      const newImages = Array.from(files).map(
        (_, index) => `/placeholder.svg?height=400&width=600&query=uploaded image ${index + 1}`,
      )
      setImages([...images, ...newImages])
      setIsExpanded(true)
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onCreatePost({ content, images: images.length > 0 ? images : undefined })
      setContent("")
      setImages([])
      setIsExpanded(false)
    }
  }

  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
            <AvatarImage src="/my-avatar.png" alt="Me" />
            <AvatarFallback>나</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="무슨 생각을 하고 계신가요?"
              value={content}
              onChange={handleContentChange}
              onClick={() => setIsExpanded(true)}
              className="min-h-[60px] resize-none border-none bg-transparent p-0 focus-visible:ring-0 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />

            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 grid grid-cols-2 gap-2"
                >
                  {images.map((image, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Uploaded ${index}`}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center justify-between"
                >
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white px-4"
                    disabled={!content.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    게시
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </Card>
  )
}
