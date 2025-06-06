"use client"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Search, TrendingUp, Users, Filter, Bell, User, Bookmark } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import PostCard from "./post-card"
import CreatePostForm from "./create-post-form"
import TrendingTopics from "./trending-topics"
import SuggestedUsers from "./suggested-users"
import FollowingList from "./following-list"
import MyPostsList from "./my-posts-list"
import { usePosts } from "@/hooks/use-posts"


export default function CommunityFeed() {
  const { posts: fetchedPosts } = usePosts(1)
  const [posts, setPosts] = useState<any[]>([])
  const [myPosts, setMyPosts] = useState<any[]>([])
  useEffect(() => {
    setPosts(
      fetchedPosts.map((p) => ({
        id: String(p.postId),
        author: {
          name: p.userName,
          username: p.userName,
          avatar: "/placeholder.svg",
          verified: false,
        },
        content: p.content,
        images: [],
        createdAt: p.createdAt,
        likes: 0,
        comments: 0,
        reposts: 0,
        isLiked: false,
      }))
    )
    setMyPosts([])
  }, [fetchedPosts])
  const [activeTab, setActiveTab] = useState("for-you")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleLike = (postId: string) => {
    // 일반 피드 게시물 좋아요 처리
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )

    // 내 게시물 좋아요 처리
    setMyPosts(
      myPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleCreatePost = (newPost: any) => {
    const newPostObj = {
      id: Date.now().toString(),
      author: {
        name: "박건도",
        username: "nagundo",
        avatar: "/my-avatar.png",
        verified: false,
      },
      content: newPost.content,
      images: newPost.images || [],
      createdAt: "방금 전",
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
    }

    setPosts([newPostObj, ...posts])
    setMyPosts([newPostObj, ...myPosts])
  }

  const handleDeletePost = (postId: string) => {
    // 내 게시물에서 삭제
    setMyPosts(myPosts.filter((post) => post.id !== postId))

    // 일반 피드에서도 삭제
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">커뮤니티</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="검색"
              className="pl-10 w-[200px] md:w-[300px] rounded-full bg-gray-100 dark:bg-gray-800 border-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 메인 피드 */}
        <div className="flex-1 order-2 md:order-1">
          <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger
                value="for-you"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
              >
                <Users className="w-4 h-4 mr-2" />
                맞춤 피드
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                팔로잉
              </TabsTrigger>
              <TabsTrigger
                value="my-posts"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
              >
                <Bookmark className="w-4 h-4 mr-2" />내 게시물
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                트렌딩
              </TabsTrigger>
              <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400 transition-all duration-200"
              >
                <Bell className="w-4 h-4 mr-2" />
                최신
              </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="space-y-4 mt-0">
              <CreatePostForm onCreatePost={handleCreatePost} />

              <div className="flex items-center justify-between my-4">
                <div className="flex gap-2">
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 cursor-pointer">
                    전체
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    개발
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    취업
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    커리어
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  필터
                </Button>
              </div>

              <Separator className="my-4" />

              {posts.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} isOwner={false} onDelete={() => {}} />
              ))}
            </TabsContent>

            <TabsContent value="following" className="space-y-4 mt-0">
              <FollowingList />
            </TabsContent>

            <TabsContent value="my-posts" className="space-y-4 mt-0">
              <CreatePostForm onCreatePost={handleCreatePost} />
              <Separator className="my-4" />
              <MyPostsList posts={myPosts} onLike={handleLike} onDelete={handleDeletePost} />
            </TabsContent>

            <TabsContent value="trending" className="space-y-4 mt-0">
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                트렌딩 콘텐츠가 여기에 표시됩니다.
              </div>
            </TabsContent>

            <TabsContent value="latest" className="space-y-4 mt-0">
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">최신 콘텐츠가 여기에 표시됩니다.</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 사이드바 */}
        <div className="w-full md:w-80 order-1 md:order-2 space-y-6">
          <TrendingTopics />
          <SuggestedUsers />
        </div>
      </div>
    </motion.div>
  )
}
