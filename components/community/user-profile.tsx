"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Briefcase, LinkIcon, UserPlus, UserCheck, MessageCircle, Settings } from "lucide-react"
import PostCard from "./post-card"
import Link from "next/link"

interface UserProfileProps {
  username: string
}

export default function UserProfile({ username }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 실제 구현에서는 API에서 사용자 데이터를 가져옵니다
    // 여기서는 더미 데이터를 사용합니다
    const fetchUserData = () => {
      setIsLoading(true)

      // 현재 사용자인지 확인 (실제로는 인증 상태를 확인해야 함)
      const currentUser = username === "nagundo"
      setIsCurrentUser(currentUser)

      // 더미 사용자 데이터
      const dummyUserData = {
        id: "1",
        name: username === "nagundo" ? "박건도" : username === "devkim" ? "김개발" : "사용자",
        username: username,
        avatar: username === "nagundo" ? "/my-avatar.png" : "/diverse-group-avatars.png",
        bio: "커리어 성장을 위해 노력하는 개발자입니다. React, TypeScript, Next.js를 주로 사용합니다.",
        location: "서울특별시",
        website: "https://portfolio.example.com",
        joinedDate: "2023년 3월",
        occupation: "프론트엔드 개발자",
        followers: 128,
        following: 87,
        verified: username === "devkim",
      }

      // 더미 게시물 데이터
      const dummyPosts = [
        {
          id: "101",
          author: {
            name: dummyUserData.name,
            username: dummyUserData.username,
            avatar: dummyUserData.avatar,
            verified: dummyUserData.verified,
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
          id: "102",
          author: {
            name: dummyUserData.name,
            username: dummyUserData.username,
            avatar: dummyUserData.avatar,
            verified: dummyUserData.verified,
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
      ]

      setUserData(dummyUserData)
      setUserPosts(dummyPosts)
      setIsFollowing(username === "devkim") // 예시로 특정 사용자는 이미 팔로우 중
      setIsLoading(false)
    }

    fetchUserData()
  }, [username])

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleLike = (postId: string) => {
    setUserPosts(
      userPosts.map((post) =>
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 프로필 헤더 */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"></div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-900">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="pt-16 px-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userData.name}</h1>
              {userData.verified && (
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
            <p className="text-gray-500 dark:text-gray-400">@{userData.username}</p>
          </div>
          <div className="flex gap-2">
            {isCurrentUser ? (
              <Button variant="outline" className="gap-1">
                <Settings className="h-4 w-4" />
                프로필 수정
              </Button>
            ) : (
              <>
                <Button variant={isFollowing ? "outline" : "default"} className="gap-1" onClick={handleToggleFollow}>
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4" />
                      팔로잉
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      팔로우
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-1">
                  <MessageCircle className="h-4 w-4" />
                  메시지
                </Button>
              </>
            )}
          </div>
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300">{userData.bio}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          {userData.occupation && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{userData.occupation}</span>
            </div>
          )}
          {userData.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{userData.location}</span>
            </div>
          )}
          {userData.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a
                href={userData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                포트폴리오
              </a>
            </div>
          )}
          {userData.joinedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>가입일: {userData.joinedDate}</span>
            </div>
          )}
        </div>

        <div className="flex gap-6 mt-4">
          <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <span className="font-semibold">{userData.following}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">팔로잉</span>
          </Link>
          <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <span className="font-semibold">{userData.followers}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">팔로워</span>
          </Link>
        </div>
      </div>

      <Separator />

      {/* 프로필 콘텐츠 */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            게시물
          </TabsTrigger>
          <TabsTrigger
            value="resumes"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            이력서
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            활동
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          {userPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">게시물이 없습니다.</div>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} isOwner={isCurrentUser} onDelete={() => {}} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resumes" className="mt-6">
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {isCurrentUser
              ? "공개된 이력서가 없습니다. 이력서를 공개하려면 이력서 설정에서 공개 여부를 변경하세요."
              : "공개된 이력서가 없습니다."}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">최근 활동이 없습니다.</div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
