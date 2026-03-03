import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Animated} component. */
export interface AnimatedProps {
  /** Delay in milliseconds from mount until the content fades in. @defaultValue `0` */
  delay?: number
  /** Content to reveal. */
  children: React.ReactNode
  /** Additional CSS class names applied to the wrapper element. */
  className?: string
}

/**
 * Reveals children with a fade-in transition after `delay` ms from mount.
 * Returns an empty fragment until the delay fires, so hidden content takes no space.
 */
function Animated({ delay = 0, children, className }: AnimatedProps): React.JSX.Element {
  const [mounted, setMounted] = React.useState(delay === 0)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (delay === 0) {
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  React.useLayoutEffect(() => {
    if (mounted && delay !== 0) {
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [mounted, delay])

  if (!mounted) return <></>

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className
      )}
    >
      {children}
    </div>
  )
}

export { Animated }
