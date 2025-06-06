"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const data = [
  { name: "1월", 이력서: 1, 자소서: 2, 지원: 3 },
  { name: "2월", 이력서: 2, 자소서: 3, 지원: 4 },
  { name: "3월", 이력서: 3, 자소서: 2, 지원: 5 },
  { name: "4월", 이력서: 2, 자소서: 4, 지원: 3 },
  { name: "5월", 이력서: 4, 자소서: 3, 지원: 6 },
  { name: "6월", 이력서: 3, 자소서: 5, 지원: 4 },
]

export default function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium mb-1">{label}</p>
                    {payload.map((entry, index) => (
                      <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}개`}
                      </p>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="이력서" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="자소서" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="지원" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1 bg-indigo-500" />
            <span className="text-xs text-gray-600 dark:text-gray-300">이력서</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1 bg-purple-500" />
            <span className="text-xs text-gray-600 dark:text-gray-300">자소서</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1 bg-emerald-500" />
            <span className="text-xs text-gray-600 dark:text-gray-300">지원</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
