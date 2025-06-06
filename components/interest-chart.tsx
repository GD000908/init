"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface JobInterest {
  label: string
  value: number
  color: string
}

interface InterestChartProps {
  jobInterests: JobInterest[]
}

export default function InterestChart({ jobInterests }: InterestChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // 애니메이션 관련 상태 변수
  const animationRef = useRef<number | null>(null)
  const animationProgressRef = useRef(0)

  // 캔버스 초기화 및 리사이징 설정
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // 캔버스 크기 설정
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      setWidth(rect.width)
      setHeight(rect.height)
    }

    handleResize() // 초기 사이즈 설정
    window.addEventListener("resize", handleResize)

    // 컴포넌트가 마운트된 직후 약간의 지연을 두고 리사이즈 한번 더 실행
    const timer = setTimeout(() => {
      handleResize()
    }, 200)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  // 그래프 렌더링 로직
  useEffect(() => {
    if (!width || !height || jobInterests.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // 이전 애니메이션 취소
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // 애니메이션 진행 상태 초기화
    animationProgressRef.current = 0

    // 그래프 애니메이션 함수
    const animate = () => {
      if (!ctx || !canvas) return

      // 애니메이션 진행 상태 업데이트
      animationProgressRef.current = Math.min(animationProgressRef.current + 0.03, 1)
      const progress = animationProgressRef.current

      // 캔버스 초기화
      ctx.clearRect(0, 0, width, height)

      // 그래프 크기 및 위치 계산
      const maxValue = Math.max(...jobInterests.map((d) => d.value), 1)
      const barHeight = Math.min(30, height / (jobInterests.length * 1.5))
      const maxBarWidth = width * 0.7
      const padding = barHeight * 0.5
      const startY = (height - (jobInterests.length * barHeight + (jobInterests.length - 1) * padding)) / 2

      // 막대 그래프 그리기 (가로 방향)
      jobInterests.forEach((data, i) => {
        const y = startY + i * (barHeight + padding)
        const fullBarWidth = data.value > 0 ? (data.value / maxValue) * maxBarWidth : 0
        // 애니메이션 진행에 따라 막대 너비 계산
        const animatedBarWidth = fullBarWidth * progress
        const x = 80 // 레이블을 위한 여백

        // 막대 그리기
        const gradient = ctx.createLinearGradient(x, y, x + animatedBarWidth, y)
        gradient.addColorStop(0, data.color)
        gradient.addColorStop(1, `${data.color}80`) // 50% 투명도
        ctx.fillStyle = gradient

        // 막대 그리기 (둥근 모서리)
        ctx.beginPath()
        const radius = 4

        // 둥근 모서리 막대
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + animatedBarWidth - radius, y)
        ctx.quadraticCurveTo(x + animatedBarWidth, y, x + animatedBarWidth, y + radius)
        ctx.lineTo(x + animatedBarWidth, y + barHeight - radius)
        ctx.quadraticCurveTo(x + animatedBarWidth, y + barHeight, x + animatedBarWidth - radius, y + barHeight)
        ctx.lineTo(x + radius, y + barHeight)
        ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
        ctx.fill()

        // 텍스트 (애니메이션 진행에 따라 페이드인)
        const textOpacity = Math.min(progress * 2, 1)

        // 레이블 텍스트 (왼쪽)
        ctx.fillStyle = `rgba(79, 70, 229, ${textOpacity})`
        ctx.font = "12px Inter, sans-serif"
        ctx.textAlign = "right"
        ctx.fillText(data.label, x - 10, y + barHeight / 2 + 4)

        // 값 텍스트 (막대 오른쪽)
        ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`
        ctx.font = "bold 12px Inter, sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(`${data.value}`, x + animatedBarWidth + 10, y + barHeight / 2 + 4)
      })

      // 애니메이션이 완료되지 않았으면 계속 진행
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    // 애니메이션 시작
    animate()

    // 컴포넌트 언마운트/업데이트 시 애니메이션 정리
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [width, height, jobInterests])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[350px] w-full"
    >
      <div className="h-[300px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap justify-center gap-4">
          {jobInterests.slice(0, 5).map((job, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: job.color }} />
              <span className="text-xs text-gray-600 dark:text-gray-300">{job.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
