"use client"
import { motion } from "framer-motion"
import { Users, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 더미 데이터
const SUGGESTED_USERS = [
  {
    id: "1",
    name: "김개발",
    username: "devkim",
    avatar: "/diverse-group-avatars.png",
    bio: "프론트엔드 개발자 | React, TypeScript",
    verified: true,
  },
  {
    id: "2",
    name: "이코딩",
    username: "codinglee",
    avatar: "/diverse-group-avatars.png",
    bio: "백엔드 개발자 | Node.js, Python",
    verified: false,
  },
  {
    id: "3",
    name: "박테크",
    username: "techpark",
    avatar: "/diverse-group-avatars.png",
    bio: "풀스택 개발자 | React, Django",
    verified: true,
  },
]

export default function SuggestedUsers() {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl">
      <div className="flex items-center mb-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 flex items-center">
          <Users className="h-4 w-4 mr-2 text-indigo-500" />
          팔로우 추천
        </h3>
      </div>

      <div className="space-y-4">
        {SUGGESTED_USERS.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                  {user.verified && <CheckCircle className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              팔로우
            </Button>
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" size="sm" className="w-full mt-4 text-indigo-500 hover:text-indigo-600">
        더 보기
      </Button>
    </Card>
  )
}
