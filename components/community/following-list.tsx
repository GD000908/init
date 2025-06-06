"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, UserCheck, UserPlus, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// 더미 데이터 - 실제 구현에서는 API에서 가져올 것입니다
const FOLLOWING = [
  {
    id: "1",
    name: "김개발",
    username: "devkim",
    avatar: "/diverse-group-avatars.png",
    bio: "프론트엔드 개발자 | React, TypeScript 전문 | 5년차",
    isFollowing: true,
  },
  {
    id: "2",
    name: "이코딩",
    username: "codinglee",
    avatar: "/avatar-follower-2.png",
    bio: "백엔드 개발자 | Node.js, Python | 취업 준비 팁 공유",
    isFollowing: true,
  },
  {
    id: "3",
    name: "박테크",
    username: "techpark",
    avatar: "/diverse-group-avatars.png",
    bio: "풀스택 개발자 | 개발 블로그 운영 중 | 신입 개발자 멘토링",
    isFollowing: true,
  },
  {
    id: "4",
    name: "최취준",
    username: "jobseeker",
    avatar: "/diverse-group-avatars.png",
    bio: "취업 준비생 | 포트폴리오 제작 중 | 코딩 테스트 공부 중",
    isFollowing: true,
  },
]

const FOLLOWERS = [
  {
    id: "5",
    name: "정알고",
    username: "algojeong",
    avatar: "/diverse-group-avatars.png",
    bio: "알고리즘 전문가 | 코딩 테스트 강사 | 대기업 개발자",
    isFollowing: false,
  },
  {
    id: "6",
    name: "한기술",
    username: "techhan",
    avatar: "/avatar-follower-2.png",
    bio: "DevOps 엔지니어 | AWS, Docker, Kubernetes | 기술 블로그 운영",
    isFollowing: true,
  },
  {
    id: "7",
    name: "윤스타트",
    username: "startyun",
    avatar: "/diverse-group-avatars.png",
    bio: "스타트업 CTO | 개발자 채용 담당 | 기술 면접 팁 공유",
    isFollowing: false,
  },
]

export default function FollowingList() {
  const [following, setFollowing] = useState(FOLLOWING)
  const [followers, setFollowers] = useState(FOLLOWERS)
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleFollow = (userId: string, listType: "following" | "followers") => {
    if (listType === "following") {
      setFollowing(following.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)))
    } else {
      setFollowers(followers.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)))
    }
  }

  const filteredFollowing = following.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFollowers = followers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderUserList = (users: typeof following, listType: "following" | "followers") => {
    if (users.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {listType === "following" ? "팔로우한 사용자가 없습니다." : "팔로워가 없습니다."}
        </div>
      )
    }

    return users.map((user) => (
      <motion.div
        key={user.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/profile/${user.username}`} className="hover:underline">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{user.bio}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={user.isFollowing ? "outline" : "default"}
            size="sm"
            className={user.isFollowing ? "gap-1" : "gap-1"}
            onClick={() => handleToggleFollow(user.id, listType)}
          >
            {user.isFollowing ? (
              <>
                <UserCheck className="h-4 w-4" />
                <span>팔로잉</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>팔로우</span>
              </>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    ))
  }

  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="사용자 검색"
          className="pl-10 bg-gray-100 dark:bg-gray-800 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="following" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger
            value="following"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            <User className="h-4 w-4 mr-2" />
            팔로잉 ({following.length})
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/20 dark:data-[state=active]:text-indigo-400"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            팔로워 ({followers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="following" className="mt-0">
          <div className="space-y-1">{renderUserList(filteredFollowing, "following")}</div>
        </TabsContent>

        <TabsContent value="followers" className="mt-0">
          <div className="space-y-1">{renderUserList(filteredFollowers, "followers")}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
