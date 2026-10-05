import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'

export function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Default is strictly Light mode unless explicitly saved as 'dark'
    const savedTheme = localStorage.getItem('stacksum-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark

    const applyThemeUpdate = () => {
      setIsDark(nextDark)
      if (nextDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('stacksum-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('stacksum-theme', 'light')
      }
    }

    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }

    // Fallback if View Transition API is not supported or user prefers reduced motion
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyThemeUpdate()
      return
    }

    // Get origin coordinates from clicked button for precise circular reveal
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX || (rect.left + rect.width / 2)
    const y = event.clientY || (rect.top + rect.height / 2)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyThemeUpdate()
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 280,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-link" aria-label="StackSum Home">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img
              src="/logo.svg"
              alt="StackSum Logo"
              className="brand-logo-img"
              width="32"
              height="32"
            />
            <span className="font-bold text-[16px] sm:text-[19px] tracking-tight text-[var(--color-text-primary)]">
              StackSum
            </span>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main Navigation">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            <span className="hidden sm:inline">Calculator</span>
            <span className="sm:hidden">Stack</span>
          </Link>
          <Link
            to="/models"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            <span className="hidden sm:inline">AI Models</span>
            <span className="sm:hidden">Models</span>
          </Link>
          <Link
            to="/news"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            <span className="hidden sm:inline">Tech News</span>
            <span className="sm:hidden">News</span>
          </Link>
          <button
            type="button"
            className="theme-toggle-pill"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
              <Sun
                size={16}
                className={`absolute transition-all duration-200 ease-out ${
                  isDark
                    ? 'scale-0 rotate-90 opacity-0 pointer-events-none'
                    : 'scale-100 rotate-0 opacity-100 text-amber-500'
                }`}
              />
              <Moon
                size={16}
                className={`absolute transition-all duration-200 ease-out ${
                  isDark
                    ? 'scale-100 rotate-0 opacity-100 text-emerald-400'
                    : 'scale-0 -rotate-90 opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </button>
        </nav>
      </div>
    </header>
  )
}
