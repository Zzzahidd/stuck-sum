export interface BrandLogoProps {
  slug?: string
  name: string
  className?: string
  size?: number
}

const BRAND_PALETTES = [
  ['#0E553B', '#177353'], // StackSum emerald
  ['#1D4ED8', '#3B82F6'], // Blue
  ['#6D28D9', '#8B5CF6'], // Purple
  ['#B45309', '#F59E0B'], // Amber
  ['#BE123C', '#F43F5E'], // Rose
  ['#047857', '#10B981'], // Green
  ['#0F766E', '#14B8A6'], // Teal
  ['#C2410C', '#EA580C'], // Orange
  ['#374151', '#4B5563'], // Slate
]

const getGradient = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const pair = BRAND_PALETTES[Math.abs(hash) % BRAND_PALETTES.length]
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
}

/**
 * Renders an initial badge using the first letter of the company/tool name with an elegant gradient
 */
export function BrandLogo({ name, className = '', size = 44 }: BrandLogoProps) {
  // Strip common provider prefixes like "OpenAI: ", "Google: ", "Anthropic: " if needed
  const cleanedName = (name || '').replace(/^(OpenAI|Google|Meta|Anthropic|Microsoft):\s*/i, '').trim()
  const initial = cleanedName.charAt(0).toUpperCase() || 'A'
  const fontSize = Math.max(12, Math.round(size * 0.45))

  return (
    <div
      style={{
        width: size,
        height: size,
        background: getGradient(name || 'default'),
        fontSize: `${fontSize}px`,
      }}
      className={`rounded-lg flex items-center justify-center text-white font-bold shadow-sm select-none flex-shrink-0 ${className}`}
      aria-label={`${name} initial`}
    >
      {initial}
    </div>
  )
}
