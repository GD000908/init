"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface SkillTagProps {
  skill: string
  onRemove: () => void
}

export default function SkillTag({ skill, onRemove }: SkillTagProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
        isHovered
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      } transition-colors duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {skill}
      <button
        onClick={onRemove}
        className="ml-1.5 text-indigo-600 dark:text-indigo-300 hover:text-red-600 dark:hover:text-red-300 focus:outline-none"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}
