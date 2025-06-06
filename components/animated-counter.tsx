"use client"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

interface AnimatedCounterProps {
  end: number
  label: string
  duration?: number
  delay?: number
}

export default function AnimatedCounter({ end, label, duration = 2, delay = 0 }: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {hasAnimated ? <CountUp start={0} end={end} duration={duration} delay={delay} separator="," /> : "0"}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  )
}
