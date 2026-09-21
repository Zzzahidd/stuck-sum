import gsap from 'gsap'

/**
 * Checks if the user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smoothly animates a numeric value inside an element (precision rolling ticker)
 */
export function animatePriceCounter(
  element: HTMLElement | null,
  startValue: number,
  endValue: number,
  formatFn: (val: number) => string,
  duration = 0.5
) {
  if (!element) return
  if (isReducedMotion() || startValue === endValue) {
    element.textContent = formatFn(endValue)
    return
  }

  const obj = { val: startValue }
  gsap.to(obj, {
    val: endValue,
    duration,
    ease: 'power3.out',
    onUpdate: () => {
      element.textContent = formatFn(Math.round(obj.val))
    },
    onComplete: () => {
      element.textContent = formatFn(endValue)
    },
  })

  // Subtle text pop on significant total change
  gsap.fromTo(
    element,
    { scale: 1.05 },
    { scale: 1, duration: 0.3, ease: 'power2.out' }
  )
}

/**
 * Smooth accordion height expansion using GSAP
 */
export function animateAccordion(element: HTMLElement | null, open: boolean, onComplete?: () => void) {
  if (!element) return
  if (isReducedMotion()) {
    element.style.height = open ? 'auto' : '0px'
    element.style.opacity = open ? '1' : '0'
    if (onComplete) onComplete()
    return
  }

  if (open) {
    gsap.killTweensOf(element)
    gsap.fromTo(
      element,
      { height: 0, opacity: 0, y: -4 },
      {
        height: 'auto',
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: 'power3.out',
        onComplete,
      }
    )
  } else {
    gsap.killTweensOf(element)
    gsap.to(element, {
      height: 0,
      opacity: 0,
      y: -4,
      duration: 0.22,
      ease: 'power3.inOut',
      onComplete,
    })
  }
}

/**
 * Staggered entrance animation for product cards
 */
export function animateGridEntrance(container: HTMLElement | null, cardSelector = '.product-card-shell, .product-card') {
  if (!container || isReducedMotion()) return
  const cards = container.querySelectorAll(cardSelector)
  if (!cards.length) return

  gsap.killTweensOf(cards)
  gsap.fromTo(
    cards,
    { opacity: 0, y: 18, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.42,
      stagger: 0.035,
      ease: 'power3.out',
      clearProps: 'transform',
    }
  )
}

/**
 * Gentle tactile feedback on button click or item add
 */
export function animateClickFeedback(element: HTMLElement | null) {
  if (!element || isReducedMotion()) return
  gsap.fromTo(
    element,
    { scale: 0.97 },
    { scale: 1, duration: 0.25, ease: 'back.out(2)' }
  )
}

/**
 * Smooth animation for hero section and discovery elements on page load
 */
export function animateHeroEntrance(heroElement: HTMLElement | null, discoveryElement: HTMLElement | null) {
  if (isReducedMotion()) return

  if (heroElement) {
    gsap.fromTo(
      heroElement.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    )
  }

  if (discoveryElement) {
    gsap.fromTo(
      discoveryElement,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.out',
      }
    )
  }
}
