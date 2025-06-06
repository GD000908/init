"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2, Edit, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import Image from "next/image"

interface PostCardProps {
  post: {
    id: string
    author: {
      name: string
      username: string
      avatar: string
      verified: boolean
    }
    content: string
    images: string[]
    createdAt: string
    likes: number
    comments: number
    reposts: number
    isLiked: boolean
  }
  onLike: (postId: string) => void
  isOwner?: boolean
  onDelete?: (postId: string) => void
}

export default function PostCard({ post, onLike, isOwner = false, onDelete = () => {} }: PostCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLike = () => {
    onLike(post.id)
  }

  const handleDelete = () => {
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    onDelete(post.id)
    setShowDeleteDialog(false)
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
  }

  // 내용이 길 경우 접기/펼치기 기능
  const contentLength = post.content.length
  const shouldTruncate = contentLength > 280 && !isExpanded
  const displayContent = shouldTruncate ? `${post.content.substring(0, 280)}...` : post.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <div className="flex items-center gap-1">
              <Link href={`/profile/${post.author.username}`} className="hover:underline">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{post.author.name}</h3>
              </Link>
              {post.author.verified && (
                <Badge
                  variant="outline"
                  className="text-xs py-0 px-1 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 text-blue-500 dark:text-blue-400"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.author.username} · {post.createdAt}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">더 보기</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {isOwner ? (
              <>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="h-4 w-4 mr-2" />
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-400" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  삭제하기
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem className="cursor-pointer">
                <Flag className="h-4 w-4 mr-2" />
                신고하기
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Share className="h-4 w-4 mr-2" />
              공유하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{displayContent}</p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-1 hover:underline"
          >
            더 보기
          </button>
        )}
        {isExpanded && contentLength > 280 && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-1 hover:underline"
          >
            접기
          </button>
        )}
      </div>

      {post.images && post.images.length > 0 && (
        <div className={`mt-3 grid ${post.images.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
          {post.images.map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${post.isLiked ? "text-red-500 dark:text-red-400" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share className="h-4 w-4" />
            <span>{post.reposts}</span>
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시물 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 게시물을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
