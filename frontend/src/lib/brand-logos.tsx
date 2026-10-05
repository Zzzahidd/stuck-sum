import { useState } from 'react'

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

// Known SimpleIcon slugs
const SIMPLE_ICON_MAP: Record<string, string> = {
  chatgpt: 'openai',
  openai: 'openai',
  claude: 'anthropic',
  anthropic: 'anthropic',
  gemini: 'googlegemini',
  perplexity: 'perplexity',
  cursor: 'cursor',
  github: 'github',
  vercel: 'vercel',
  figma: 'figma',
  notion: 'notion',
  slack: 'slack',
  spotify: 'spotify',
  linear: 'linear',
  canva: 'canva',
  framer: 'framer',
  adobe: 'adobe',
  dropbox: 'dropbox',
  grammarly: 'grammarly',
  zoom: 'zoom',
  loom: 'loom',
  mailchimp: 'mailchimp',
  hubspot: 'hubspot',
  stripe: 'stripe',
  wise: 'wise',
  supabase: 'supabase',
  neon: 'neon',
  postman: 'postman',
  datadog: 'datadog',
  sentry: 'sentry',
  cloudflare: 'cloudflare',
  '1password': '1password',
  midjourney: 'midjourney',
  elevenlabs: 'elevenlabs',
  deepseek: 'deepseek',
  posthog: 'posthog',
  airtable: 'airtable',
  zapier: 'zapier',
  resend: 'resend',
  docker: 'docker',
  raycast: 'raycast',
}

/**
 * Renders an official brand icon with graceful fallback to an initial badge
 */
export function BrandLogo({ slug = '', name, className = '', size = 44 }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false)
  const normalizedKey = (slug || name).toLowerCase().replace(/[^a-z0-9]/g, '')
  const iconSlug = SIMPLE_ICON_MAP[slug?.toLowerCase()] || SIMPLE_ICON_MAP[normalizedKey]

  const cleanedName = (name || '').replace(/^(OpenAI|Google|Meta|Anthropic|Microsoft):\s*/i, '').trim()
  const initial = cleanedName.charAt(0).toUpperCase() || 'A'
  const fontSize = Math.max(12, Math.round(size * 0.44))

  if (iconSlug && !imgError) {
    const iconSize = Math.max(16, Math.round(size * 0.65))
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-lg flex items-center justify-center bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] flex-shrink-0 overflow-hidden shadow-xs ${className}`}
        title={name}
      >
        <img
          src={`https://cdn.simpleicons.org/${iconSlug}`}
          alt={`${name} icon`}
          width={iconSize}
          height={iconSize}
          className="object-contain dark:brightness-110"
          style={{ maxWidth: `${iconSize}px`, maxHeight: `${iconSize}px` }}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        background: getGradient(name || 'default'),
        fontSize: `${fontSize}px`,
      }}
      className={`rounded-lg flex items-center justify-center text-white font-bold shadow-xs select-none flex-shrink-0 ${className}`}
      aria-label={`${name} initial`}
    >
      {initial}
    </div>
  )
}
