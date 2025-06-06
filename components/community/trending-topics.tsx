"use client"
import { motion } from "framer-motion"
import { TrendingUp, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 더미 데이터
const TRENDING_TOPICS = [
  { id: "1", name: "#취업준비", posts: 1243 },
  { id: "2", name: "#기술면접", posts: 982 },
  { id: "3", name: "#React", posts: 756 },
  { id: "4", name: "#포트폴리오", posts: 621 },
  { id: "5", name: "#개발자연봉", posts: 543 },
]

export default function TrendingTopics() {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-indigo-500" />
          트렌딩 토픽
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {TRENDING_TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{topic.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{topic.posts.toLocaleString()}개의 게시물</div>
            </div>
            <div className="text-sm text-indigo-500 font-medium">#{index + 1}</div>
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" size="sm" className="w-full mt-3 text-indigo-500 hover:text-indigo-600">
        더 보기
      </Button>
    </Card>
  )
}
