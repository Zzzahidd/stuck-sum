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

function OpenAIIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#10A37F]"
      aria-label="ChatGPT logo"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1639a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6859zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4593a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

/**
 * Renders an official brand icon with graceful fallback to an initial badge
 */
export function BrandLogo({ slug = '', name, className = '', size = 44 }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false)
  const normalizedKey = (slug || name).toLowerCase().replace(/[^a-z0-9]/g, '')
  const iconSlug = SIMPLE_ICON_MAP[slug?.toLowerCase()] || SIMPLE_ICON_MAP[normalizedKey]

  const isChatGPT =
    slug?.toLowerCase() === 'chatgpt' ||
    normalizedKey === 'chatgpt' ||
    slug?.toLowerCase() === 'openai' ||
    normalizedKey === 'openai' ||
    name?.toLowerCase().includes('chatgpt')

  if (isChatGPT) {
    const iconSize = Math.max(16, Math.round(size * 0.65))
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-lg flex items-center justify-center bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] flex-shrink-0 overflow-hidden shadow-xs ${className}`}
        title="ChatGPT"
      >
        <OpenAIIcon size={iconSize} />
      </div>
    )
  }

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
