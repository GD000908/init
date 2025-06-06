"use client"
import { useState } from "react"
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

// 더미 데이터 - 실제 구현에서는 API에서 가져올 것입니다
const POSTS = [
  {
    id: "1",
    author: {
      name: "김개발",
      username: "devkim",
      avatar: "/diverse-group-avatars.png",
      verified: true,
    },
    content:
      "오늘 기술 면접에서 받은 질문들을 공유합니다. 주로 React와 상태 관리에 관한 질문이었어요. 다들 면접 준비 어떻게 하시나요?",
    images: ["/coding-interview-scenario.png"],
    createdAt: "2시간 전",
    likes: 42,
    comments: 15,
    reposts: 5,
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "이코딩",
      username: "codinglee",
      avatar: "/diverse-group-avatars.png",
      verified: false,
    },
    content:
      "신입 개발자가 포트폴리오를 준비할 때 가장 중요한 것은 무엇일까요? 개인 프로젝트? 오픈소스 기여? 클론 코딩? 여러분의 경험을 공유해주세요!",
    images: [],
    createdAt: "5시간 전",
    likes: 78,
    comments: 32,
    reposts: 12,
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "박테크",
      username: "techpark",
      avatar: "/diverse-group-avatars.png",
      verified: true,
    },
    content:
      "요즘 핫한 기술 스택 정리해봤습니다.\n\n프론트엔드: React, Next.js, TypeScript\n백엔드: Node.js, NestJS, Go\n데이터: PostgreSQL, MongoDB\n인프라: Docker, Kubernetes, AWS\n\n다른 추천 있으신가요?",
    images: [],
    createdAt: "어제",
    likes: 156,
    comments: 48,
    reposts: 27,
    isLiked: false,
  },
  {
    id: "4",
    author: {
      name: "최취준",
      username: "jobseeker",
      avatar: "/diverse-group-avatars.png",
      verified: false,
    },
    content:
      "드디어 합격 메일을 받았습니다! 6개월간의 취준 끝에 원하던 회사에 입사하게 되었어요. 모두의 응원 덕분입니다. 취준생 여러분들도 포기하지 마세요! 💪",
    images: ["/job-offer-celebration.png"],
    createdAt: "2일 전",
    likes: 324,
    comments: 87,
    reposts: 42,
    isLiked: true,
  },
  {
    id: "5",
    author: {
      name: "정알고",
      username: "algojeong",
      avatar: "/diverse-group-avatars.png",
      verified: true,
    },
    content:
      "코딩 테스트 준비를 위한 알고리즘 공부 로드맵을 만들어봤습니다. 초보자부터 고급자까지 단계별로 정리했어요. 도움이 되길 바랍니다!",
    images: ["/algorithm-roadmap.png"],
    createdAt: "3일 전",
    likes: 210,
    comments: 45,
    reposts: 38,
    isLiked: false,
  },
]

// 내 게시물 더미 데이터
const MY_POSTS = [
  {
    id: "101",
    author: {
      name: "박건도",
      username: "nagundo",
      avatar: "/my-avatar.png",
      verified: false,
    },
    content: "첫 이력서 작성을 마쳤습니다! 피드백 부탁드려요. #취업준비 #이력서 #신입개발자",
    images: ["/placeholder.svg?key=w15ih"],
    createdAt: "1일 전",
    likes: 24,
    comments: 8,
    reposts: 2,
    isLiked: false,
  },
  {
    id: "102",
    author: {
      name: "박건도",
      username: "nagundo",
      avatar: "/my-avatar.png",
      verified: false,
    },
    content:
      "요즘 공부하고 있는 Next.js와 TypeScript 조합이 정말 좋네요. 타입 안정성과 SSR의 장점을 모두 가져갈 수 있어서 만족스럽습니다. 다들 어떤 기술 스택 사용하시나요?",
    images: [],
    createdAt: "3일 전",
    likes: 42,
    comments: 15,
    reposts: 5,
    isLiked: true,
  },
  {
    id: "103",
    author: {
      name: "박건도",
      username: "nagundo",
      avatar: "/my-avatar.png",
      verified: false,
    },
    content:
      "오늘 참석한 개발자 네트워킹 행사에서 좋은 인연을 많이 만났습니다. 커리어 성장에는 기술력도 중요하지만 네트워킹도 정말 중요한 것 같아요!",
    images: ["/placeholder.svg?key=ag5s7"],
    createdAt: "1주일 전",
    likes: 67,
    comments: 12,
    reposts: 8,
    isLiked: false,
  },
]

export default function CommunityFeed() {
  const [posts, setPosts] = useState(POSTS)
  const [myPosts, setMyPosts] = useState(MY_POSTS)
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
