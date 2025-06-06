"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, X } from "lucide-react"
import { format, isAfter } from "date-fns"
import { ko } from "date-fns/locale"

interface Company {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
}

interface BookmarkListProps {
  companies: Company[]
  onDelete: (id: string) => void
  onCompanyMouseEnter: (company: Company) => void
  onCompanyMouseLeave: () => void
  onCompanyClick?: (company: Company) => void
}

export default function BookmarkList({
  companies,
  onDelete,
  onCompanyMouseEnter,
  onCompanyMouseLeave,
  onCompanyClick,
}: BookmarkListProps) {
  const isExpired = (endDate: Date) => !isAfter(endDate, new Date())

  return (
    <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
      <AnimatePresence>
        {companies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            북마크한 공고가 없습니다
          </motion.div>
        ) : (
          companies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
              className={`relative p-3 rounded-xl border ${
                isExpired(company.end)
                  ? "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800"
              } transition-colors duration-200 cursor-pointer group`}
              onMouseEnter={() => onCompanyMouseEnter(company)}
              onMouseLeave={onCompanyMouseLeave}
              onClick={() => onCompanyClick && onCompanyClick(company)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: company.color || "#4f46e5" }}
                    ></div>
                    <h3
                      className={`font-medium ${
                        isExpired(company.end) ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {company.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {format(company.start, "yyyy.MM.dd", { locale: ko })} ~{" "}
                      {format(company.end, "yyyy.MM.dd", { locale: ko })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {isExpired(company.end) ? (
                    <Badge
                      variant="outline"
                      className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    >
                      마감됨
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      진행중
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 ml-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(company.id)
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
