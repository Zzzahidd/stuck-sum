import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useReveal(dependencies: unknown[] = []) {
  const scope = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !scope.current) return
    const context = gsap.context(() => {
      gsap.from('[data-reveal]', { opacity: 0, y: 12, duration: 0.42, stagger: 0.045, ease: 'power2.out', clearProps: 'transform' })
    }, scope)
    return () => context.revert()
  }, dependencies)
  return scope
}
