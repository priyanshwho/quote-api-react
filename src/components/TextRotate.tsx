import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRotateProps {
  words: string[]
  intervalMs?: number
}

const TextRotate = ({ words, intervalMs = 2400 }: TextRotateProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % words.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, words])

  if (words.length === 0) {
    return null
  }

  return (
    <span className="inline-flex min-w-0 items-center overflow-hidden align-middle text-[var(--accent)]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[activeIndex]}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="font-[var(--font-serif)] text-inherit"
        >
          {words[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default TextRotate