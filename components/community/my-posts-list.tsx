"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import PostCard from "./post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Heart } from "lucide-react"

interface Post {
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

interface MyPostsListProps {
  posts: Post[]
  onLike: (postId: string) => void
  onDelete: (postId: string) => void
}

export default function MyPostsList({ posts, onLike, onDelete }: MyPostsListProps) {
  const [activeTab, setActiveTab] = useState("all")

  // 게시물 필터링
  const filteredPosts = () => {
    switch (activeTab) {
      case "all":
        return posts
      case "liked":
        return posts.filter((post) => post.isLiked)
      case "commented":
        return posts.filter((post) => post.comments > 0)
      default:
        return posts
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            <FileText className="h-4 w-4 mr-2" />
            모든 게시물
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            <Heart className="h-4 w-4 mr-2" />
            좋아요한 게시물
          </TabsTrigger>
          <TabsTrigger
            value="commented"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            댓글단 게시물
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredPosts().length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              게시물이 없습니다. 첫 게시물을 작성해보세요!
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts().map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} onLike={onLike} isOwner={true} onDelete={onDelete} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="liked" className="mt-0">
          {filteredPosts().length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">좋아요한 게시물이 없습니다.</div>
          ) : (
            <div className="space-y-4">
              {filteredPosts().map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} onLike={onLike} isOwner={true} onDelete={onDelete} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="commented" className="mt-0">
          {filteredPosts().length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">댓글을 단 게시물이 없습니다.</div>
          ) : (
            <div className="space-y-4">
              {filteredPosts().map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} onLike={onLike} isOwner={true} onDelete={onDelete} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
