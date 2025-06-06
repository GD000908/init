"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Edit, Calendar, Users, FileOutput, Share2, User, ClipboardList, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: <Home size={20} />, text: "이력 관리 홈", href: "/" },
    { icon: <ClipboardList size={20} />, text: "스펙 관리", href: "/spec-management" },
    { icon: <FileText size={20} />, text: "이력서 작성", href: "/resume" },
    { icon: <Edit size={20} />, text: "자소서 작성", href: "/cover-letter" },
    { icon: <Calendar size={20} />, text: "공고 캘린더", href: "/job-calendar" },
    { icon: <Users size={20} />, text: "커뮤니티", href: "/community" },
  ]

  const utilityItems = [
    { icon: <FileOutput size={20} />, text: "PDF 이력서", href: "/pdf-resume" },
    { icon: <Share2 size={20} />, text: "링크 공유하기", href: "/share" },
  ]

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  }

  // 로그아웃 함수 추가
  const handleLogout = () => {
    // 실제 구현에서는 인증 상태를 초기화하고 쿠키/토큰을 삭제하는 로직이 필요합니다
    console.log("로그아웃 처리")
    // 로그아웃 후 홈페이지로 리다이렉트
    window.location.href = "/"
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen shadow-sm"
    >
      <div className="p-6 flex items-center justify-between">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Careerlog
        </motion.h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="로그아웃"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-4 py-2">
          {menuItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 mt-2 text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                <span
                  className={`mr-3 ${
                    pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.text}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="px-4 py-2 mt-8">
          {utilityItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 mt-2 text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                <span
                  className={`mr-3 ${
                    pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.text}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="sidebar-utility-indicator"
                    className="absolute left-0 w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>

      <motion.div
        variants={itemVariants}
        className="absolute bottom-0 w-64 p-6 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white">
            <User size={18} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium dark:text-gray-200">박건도</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">nagundo@naver.com</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
