export type Category =
  | 'All'
  | 'AI'
  | 'Design'
  | 'Development'
  | 'Productivity'
  | 'Marketing'
  | 'Communication'
  | 'Finance'
  | 'Entertainment'
  | 'Cloud & Security'
  | 'Analytics & Data'
  | 'Other'

export type Plan = {
  id: string
  name: string
  monthlyPriceCents: number | null
  annualPriceCents?: number | null
  currency: 'USD'
  billingInterval: 'monthly' | 'annual' | 'both'
  availability: 'available' | 'unavailable'
  features?: string[]
}

export type Product = {
  id: string
  name: string
  slug: string
  companyName: string
  description: string
  category: Category
  logo: string
  websiteUrl: string
  pricingUrl: string
  source: string
  lastVerifiedAt: string
  plans: Plan[]
  tags?: string[]
  isLiveModel?: boolean
}

const plan = (
  id: string,
  name: string,
  cents: number | null,
  annual?: number | null,
  features?: string[],
): Plan => ({
  id,
  name,
  monthlyPriceCents: cents,
  annualPriceCents: annual ?? (cents ? cents * 12 : 0),
  currency: 'USD',
  billingInterval: annual ? 'both' : 'monthly',
  availability: 'available',
  features,
})

const prod = (
  id: string,
  name: string,
  companyName: string,
  description: string,
  category: Category,
  icon: string,
  plans: Plan[],
  tags: string[] = [],
  website?: string,
  pricing?: string,
): Product => ({
  id,
  name,
  slug: id,
  companyName,
  description,
  category,
  logo: `https://cdn.simpleicons.org/${icon}`,
  websiteUrl: website || `https://${id.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
  pricingUrl: pricing || `https://${id.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/pricing`,
  source: 'Official pricing page',
  lastVerifiedAt: '2026-09-20',
  plans,
  tags: [name.toLowerCase(), companyName.toLowerCase(), category.toLowerCase(), ...tags],
})

export const categories: Category[] = [
  'All',
  'AI',
  'Design',
  'Development',
  'Productivity',
  'Marketing',
  'Communication',
  'Finance',
  'Entertainment',
  'Cloud & Security',
  'Analytics & Data',
  'Other',
]

export const primaryCategories: Category[] = [
  'All',
  'AI',
  'Design',
  'Development',
  'Productivity',
  'Marketing',
]

export const moreCategories: Category[] = [
  'Communication',
  'Finance',
  'Entertainment',
  'Cloud & Security',
  'Analytics & Data',
  'Other',
]

export const staticProducts: Product[] = [
  // --- AI Tools & LLMs ---
  prod('chatgpt', 'ChatGPT', 'OpenAI', 'Get help with writing, coding, analysis and more.', 'AI', 'openai', [
    plan('chatgpt-free', 'Free', 0, 0, ['Access to GPT-4o mini', 'Standard response speed']),
    plan('chatgpt-go', 'Go', 800, 9600, ['Lightweight priority tier', 'Fast generation']),
    plan('chatgpt-plus', 'Plus', 2000, 24000, ['GPT-4o & o1 reasoning models', 'DALL-E 3 image gen', 'Advanced voice mode']),
    plan('chatgpt-pro', 'Pro', 20000, 240000, ['Unlimited o1 reasoning', 'Operator access', 'Highest compute priority']),
    plan('chatgpt-team', 'Team', 2500, 30000, ['Admin workspace', 'Shared GPTs', 'No training on data']),
    plan('chatgpt-business', 'Business', 3000, 36000, ['Enterprise SLA', 'Dedicated support', 'Custom domain verification']),
  ], ['gpt', 'openai', 'llm', 'chat']),

  prod('claude', 'Claude', 'Anthropic', 'A thoughtful AI partner for coding, writing, and deep research.', 'AI', 'anthropic', [
    plan('claude-free', 'Free', 0, 0, ['Claude 3.5 Sonnet & Haiku access']),
    plan('claude-pro', 'Pro', 2000, 24000, ['5x more usage on Claude 3.5 Sonnet', 'Projects feature', 'Artifacts']),
    plan('claude-team', 'Team', 3000, 36000, ['Central billing', 'Admin controls', 'Higher message limits']),
    plan('claude-max', 'Max Enterprise', 10000, 120000, ['Dedicated capacity', 'Custom retention limits']),
  ], ['anthropic', 'sonnet', 'opus', 'haiku']),

  prod('gemini', 'Gemini', 'Google', 'Google AI for everyday work, deep analysis and creative projects.', 'AI', 'googlegemini', [
    plan('gemini-free', 'Free', 0, 0, ['Gemini 1.5 Flash access']),
    plan('gemini-advanced', 'Advanced', 1999, 23988, ['Gemini 1.5 Pro with 2M context', '2TB Google One cloud storage']),
    plan('gemini-ultra', 'AI Ultra', 24999, 299988, ['Full enterprise API credits', 'Workspace integration']),
  ], ['google', 'deepmind', 'llm']),

  prod('perplexity', 'Perplexity', 'Perplexity AI', 'AI powered conversational search engine with cited sources.', 'AI', 'perplexity', [
    plan('perplexity-free', 'Free', 0, 0, ['Standard search queries', 'Web sources']),
    plan('perplexity-pro', 'Pro', 2000, 24000, ['Unlimited Pro Search', 'Claude 3.5 & GPT-4o choice', '$5/mo API credits']),
    plan('perplexity-enterprise', 'Enterprise', 4000, 48000, ['SOC2 compliance', 'Internal knowledge search']),
  ], ['search', 'ai search', 'research']),

  prod('cursor', 'Cursor', 'Anysphere', 'The AI code editor. Built for pair programming and instant agent loops.', 'Development', 'cursor', [
    plan('cursor-hobby', 'Hobby', 0, 0, ['Basic autocompletion', '2-week Pro trial']),
    plan('cursor-pro', 'Pro', 2000, 24000, ['500 fast premium requests/mo', 'Unlimited slow requests', 'Composer & Agent']),
    plan('cursor-business', 'Business', 4000, 48000, ['Centralized billing', 'Privacy mode enforced', 'Admin controls']),
    plan('cursor-ultra', 'Ultra', 20000, 240000, ['Dedicated cluster capacity', 'Instant priority queues']),
  ], ['ide', 'vscode', 'ai coding', 'editor']),

  prod('github', 'GitHub', 'Microsoft', 'Collaborative software development, code hosting, and CI/CD automation.', 'Development', 'github', [
    plan('github-free', 'Free', 0, 0, ['Unlimited public & private repos', '2,000 Actions minutes/mo']),
    plan('github-copilot', 'Copilot Individual', 1000, 10000, ['AI pair programmer in any IDE']),
    plan('github-copilot-business', 'Copilot Business', 1900, 22800, ['Organization management', 'IP indemnification']),
    plan('github-team', 'Team', 400, 4800, ['Protected branches', '3,000 Actions mins', 'Draft PRs']),
    plan('github-enterprise', 'Enterprise', 2100, 25200, ['SAML SSO', '50,000 Actions mins', 'Audit log API']),
  ], ['git', 'code', 'cicd', 'copilot']),

  prod('vercel', 'Vercel', 'Vercel Inc.', 'Deploy and host your frontend and full-stack web applications with ease.', 'Development', 'vercel', [
    plan('vercel-hobby', 'Hobby', 0, 0, ['Non-commercial deployments', '100GB bandwidth']),
    plan('vercel-pro', 'Pro', 2000, 24000, ['1TB bandwidth', 'Serverless execution', 'Preview environments']),
    plan('vercel-enterprise', 'Enterprise', 30000, 360000, ['99.99% SLA', 'Multi-region failover', 'Dedicated support']),
  ], ['hosting', 'nextjs', 'serverless', 'deploy']),

  prod('figma', 'Figma', 'Figma Inc.', 'Collaborative interface design, wireframing and prototyping for modern teams.', 'Design', 'figma', [
    plan('figma-starter', 'Starter', 0, 0, ['3 Figma and 3 FigJam files', 'Unlimited personal drafts']),
    plan('figma-professional', 'Professional', 1500, 14400, ['Unlimited files', 'Team libraries', 'Dev Mode access']),
    plan('figma-organization', 'Organization', 4500, 54000, ['Design system analytics', 'Branching & merging', 'SSO']),
    plan('figma-enterprise', 'Enterprise', 7500, 90000, ['Dedicated workspaces', 'Advanced security', 'Config management']),
  ], ['design', 'ui', 'ux', 'prototyping', 'figjam']),

  prod('notion', 'Notion', 'Notion Labs', 'All-in-one connected workspace for your notes, docs, wikis, and tasks.', 'Productivity', 'notion', [
    plan('notion-free', 'Free', 0, 0, ['Unlimited blocks for individuals', '7 day page history']),
    plan('notion-plus', 'Plus', 1000, 9600, ['Unlimited blocks for teams', 'Unlimited file uploads', '30 day history']),
    plan('notion-business', 'Business', 1800, 18000, ['SAML SSO', 'Private teamspaces', '90 day history', 'PDF export']),
    plan('notion-ai-addon', 'Notion AI Add-on', 1000, 9600, ['Q&A over your workspace', 'Writing assistant']),
  ], ['wiki', 'docs', 'notes', 'knowledge base']),

  prod('slack', 'Slack', 'Salesforce', 'Team messaging, channels, audio huddles, and workflow integrations.', 'Communication', 'slack', [
    plan('slack-free', 'Free', 0, 0, ['90 days of message history', '1:1 huddles']),
    plan('slack-pro', 'Pro', 875, 8700, ['Unlimited message history', 'Group huddles', 'Slack Connect with partners']),
    plan('slack-business-plus', 'Business+', 1500, 15000, ['99.99% uptime SLA', 'SAML SSO', 'User provisioning']),
    plan('slack-enterprise', 'Enterprise Grid', 3200, 38400, ['Unlimited workspaces', 'DLP support', 'HIPAA compliance']),
  ], ['chat', 'messaging', 'teams', 'communication']),

  prod('spotify', 'Spotify', 'Spotify AB', 'Music, podcasts and focus audio for productive developer workflows.', 'Entertainment', 'spotify', [
    plan('spotify-free', 'Free', 0, 0, ['Ad-supported listening']),
    plan('spotify-individual', 'Individual Premium', 1199, 14388, ['Ad-free audio', 'Offline downloads', 'High fidelity sound']),
    plan('spotify-duo', 'Duo', 1699, 20388, ['2 Premium accounts under one roof']),
    plan('spotify-family', 'Family', 1999, 23988, ['Up to 6 accounts']),
  ], ['music', 'audio', 'podcast', 'entertainment']),

  prod('linear', 'Linear', 'Linear Orbit', 'Purpose-built issue tracking and project management for modern software teams.', 'Development', 'linear', [
    plan('linear-free', 'Free', 0, 0, ['Up to 250 active issues', 'Unlimited members']),
    plan('linear-standard', 'Standard', 1000, 9600, ['Unlimited issues', 'API access', 'GitHub/GitLab sync']),
    plan('linear-plus', 'Plus', 1600, 16800, ['SLA analytics', 'Customer requests', 'Private teams', 'Admin roles']),
  ], ['issues', 'jira alternative', 'scrum', 'agile']),

  prod('canva', 'Canva', 'Canva Pty Ltd', 'Visual design platform for presentations, social media, and team assets.', 'Design', 'canva', [
    plan('canva-free', 'Free', 0, 0, ['Basic templates', '5GB cloud storage']),
    plan('canva-pro', 'Pro', 1500, 12000, ['100M+ premium stock assets', 'Brand kits', 'Magic Studio AI']),
    plan('canva-teams', 'Teams', 3000, 30000, ['Shared brand controls', 'Workflows and approvals']),
  ], ['graphics', 'social media', 'templates']),

  prod('framer', 'Framer', 'Framer B.V.', 'Design and publish lightning-fast responsive websites without code.', 'Design', 'framer', [
    plan('framer-free', 'Free', 0, 0, ['Framer banner', 'framer.photos domain']),
    plan('framer-mini', 'Mini', 500, 6000, ['Custom domain', '1,000 visitors/mo']),
    plan('framer-basic', 'Basic', 1500, 18000, ['10,000 visitors/mo', '1 CMS collection']),
    plan('framer-pro', 'Pro', 3000, 36000, ['200,000 visitors/mo', 'Full staging & analytics']),
  ], ['website builder', 'nocode', 'web design']),

  prod('adobe', 'Adobe Creative Cloud', 'Adobe Systems', 'Industry standard creative tools for design, video, photos, and UI.', 'Design', 'adobe', [
    plan('adobe-single-app', 'Single App (Photoshop/Illustrator)', 2299, 27588, ['100GB cloud storage', 'Generative AI credits']),
    plan('adobe-all-apps', 'All Apps Suite', 5999, 71988, ['20+ creative desktop and mobile apps']),
    plan('adobe-teams', 'Creative Cloud for Teams', 8999, 107988, ['License reassignments', 'Asset sharing']),
  ], ['photoshop', 'illustrator', 'premiere', 'after effects']),

  prod('dropbox', 'Dropbox', 'Dropbox Inc.', 'Secure cloud storage, backup, and document collaboration.', 'Productivity', 'dropbox', [
    plan('dropbox-basic', 'Basic', 0, 0, ['2GB cloud storage']),
    plan('dropbox-plus', 'Plus', 1199, 11988, ['2TB storage', 'Unlimited file recovery 30 days']),
    plan('dropbox-professional', 'Professional', 1999, 19900, ['3TB storage', 'Document watermarking', 'Signatures']),
  ], ['cloud storage', 'backup', 'files']),

  prod('grammarly', 'Grammarly', 'Grammarly Inc.', 'AI writing assistance for grammar, tone, clarity, and style.', 'Productivity', 'grammarly', [
    plan('grammarly-free', 'Free', 0, 0, ['Basic grammar and spellcheck']),
    plan('grammarly-premium', 'Premium', 1200, 14400, ['Full sentence rewrites', 'Tone adjustments', 'Plagiarism detection']),
    plan('grammarly-business', 'Business', 1500, 18000, ['Team style guides', 'Admin dashboard', 'SSO']),
  ], ['writing', 'grammar', 'ai writing']),

  prod('zoom', 'Zoom', 'Zoom Video Communications', 'High definition video meetings, webinars, team chat, and phone.', 'Communication', 'zoom', [
    plan('zoom-basic', 'Basic', 0, 0, ['40 min meeting limits', 'Up to 100 participants']),
    plan('zoom-pro', 'Pro', 1599, 15990, ['Unlimited meeting duration', '5GB cloud recording']),
    plan('zoom-business', 'Business', 2199, 21990, ['Up to 300 participants', 'SSO', 'Custom branding']),
  ], ['video conferencing', 'calls', 'meetings']),

  prod('loom', 'Loom', 'Atlassian', 'Fast asynchronous video messaging and screen recording for teams.', 'Communication', 'loom', [
    plan('loom-starter', 'Starter', 0, 0, ['25 videos limit', '5 mins per video']),
    plan('loom-business', 'Business', 1500, 15000, ['Unlimited videos', 'Unlimited recording length', 'AI summaries & transcripts']),
    plan('loom-enterprise', 'Enterprise', 3000, 36000, ['SSO & SCIM', 'Advanced analytics', 'Custom data retention']),
  ], ['screen recorder', 'async video', 'demo']),

  prod('mailchimp', 'Mailchimp', 'Intuit', 'Email marketing automation, newsletters, and audience CRM.', 'Marketing', 'mailchimp', [
    plan('mailchimp-free', 'Free', 0, 0, ['500 contacts', '1,000 monthly sends']),
    plan('mailchimp-essentials', 'Essentials', 1300, 15600, ['5,000 sends', 'A/B testing', 'Automated journeys']),
    plan('mailchimp-standard', 'Standard', 2000, 24000, ['6,000 sends', 'Custom-coded templates', 'Predictive segmentation']),
  ], ['email marketing', 'newsletter', 'crm']),

  prod('hubspot', 'HubSpot', 'HubSpot Inc.', 'Inbound marketing, sales automation, customer service CRM.', 'Marketing', 'hubspot', [
    plan('hubspot-free', 'Free Tools', 0, 0, ['Contact management', 'Website forms', 'Live chat']),
    plan('hubspot-starter', 'Starter Suite', 2000, 18000, ['1,000 marketing contacts', 'Ad management', 'Payment links']),
    plan('hubspot-professional', 'Professional', 89000, 960000, ['Omnichannel automation', 'Custom reporting', 'A/B testing']),
  ], ['crm', 'inbound marketing', 'sales']),

  prod('stripe', 'Stripe', 'Stripe Inc.', 'Financial infrastructure, payment processing, and subscription billing API.', 'Finance', 'stripe', [
    plan('stripe-payg', 'Standard (2.9% + 30¢)', 0, 0, ['Global payments', 'Fraud prevention (Radar)', 'Checkout UI']),
    plan('stripe-billing', 'Billing Starter (0.7%)', 0, 0, ['Recurring subscriptions', 'Customer portal', 'Automated invoicing']),
    plan('stripe-billing-scale', 'Billing Scale (0.9%)', 0, 0, ['Revenue recognition', 'Tax automation', 'Custom quotes']),
  ], ['payments', 'billing', 'credit cards', 'checkout']),

  prod('wise', 'Wise', 'Wise Payments Ltd', 'International money transfers and multi-currency business banking.', 'Finance', 'wise', [
    plan('wise-standard', 'Standard Business', 0, 0, ['Real mid-market exchange rate', 'Batch payments API']),
    plan('wise-account-setup', 'Account Setup (One-time $31)', 0, 0, ['Local bank account details in 9+ currencies']),
  ], ['banking', 'international transfers', 'forex']),

  prod('supabase', 'Supabase', 'Supabase Inc.', 'Open-source Firebase alternative: Postgres database, Auth, Storage, Edge Functions.', 'Development', 'supabase', [
    plan('supabase-free', 'Free', 0, 0, ['500MB database', '50,000 monthly active users', '1GB storage']),
    plan('supabase-pro', 'Pro', 2500, 30000, ['8GB database included', '100,000 MAU', 'Daily backups', 'No project pausing']),
    plan('supabase-team', 'Team', 59900, 718800, ['SOC2 compliance', 'SLA', 'Priority support', 'Dedicated compute']),
  ], ['postgres', 'database', 'auth', 'backend', 'firebase alternative']),

  prod('neon', 'Neon', 'Neon Inc.', 'Serverless Postgres database with autoscaling, instant branching, and bottomless storage.', 'Development', 'neon', [
    plan('neon-free', 'Free Tier', 0, 0, ['0.5GB storage', 'Shared compute', 'Instant point-in-time restore']),
    plan('neon-launch', 'Launch', 1900, 22800, ['10GB storage included', 'Autoscaling compute to 4 vCPU']),
    plan('neon-scale', 'Scale', 6900, 82800, ['50GB storage included', 'Autoscaling to 8 vCPU', 'IP allowlisting']),
  ], ['postgres', 'serverless', 'database', 'branching']),

  prod('postman', 'Postman', 'Postman Inc.', 'Complete API development platform for designing, testing, and mocking REST/GraphQL APIs.', 'Development', 'postman', [
    plan('postman-free', 'Free', 0, 0, ['Up to 3 team members', 'Collection runner']),
    plan('postman-basic', 'Basic', 1400, 14400, ['Unlimited team size', '10 integrations']),
    plan('postman-professional', 'Professional', 2900, 34800, ['Private API network', 'Mock servers', 'Single Sign-On']),
  ], ['api', 'rest', 'graphql', 'testing']),

  prod('datadog', 'Datadog', 'Datadog Inc.', 'Cloud-scale monitoring, APM, log management, and security infrastructure analytics.', 'Cloud & Security', 'datadog', [
    plan('datadog-free', 'Free', 0, 0, ['Up to 5 hosts', '1-day metric retention']),
    plan('datadog-pro', 'Pro Infrastructure', 1500, 18000, ['15-month metric retention', 'Over 700 integrations']),
    plan('datadog-enterprise', 'Enterprise', 2300, 27600, ['Machine learning alerts', 'Live process monitoring', '24/7 support']),
  ], ['monitoring', 'apm', 'logs', 'metrics', 'observability']),

  prod('sentry', 'Sentry', 'Functional Software Inc.', 'Application performance monitoring, code tracing, and real-time error tracking.', 'Development', 'sentry', [
    plan('sentry-developer', 'Developer', 0, 0, ['5,000 errors/mo', '1 user', 'Performance monitoring']),
    plan('sentry-team', 'Team', 2900, 31200, ['50,000 errors/mo', 'Unlimited users', 'Alert integrations']),
    plan('sentry-business', 'Business', 8900, 96000, ['Metrics & Tracing', 'Session Replay', 'Cross-project insights']),
  ], ['errors', 'crash reporting', 'tracing', 'apm']),

  prod('cloudflare', 'Cloudflare', 'Cloudflare Inc.', 'Global CDN, DDoS protection, edge compute workers, and DNS security.', 'Cloud & Security', 'cloudflare', [
    plan('cloudflare-free', 'Free', 0, 0, ['Fast DNS', 'Unmetered DDoS mitigation', 'Free SSL certificate']),
    plan('cloudflare-pro', 'Pro', 2500, 24000, ['Web Application Firewall (WAF)', 'Lossless image optimization', 'HTTP/2 to origin']),
    plan('cloudflare-business', 'Business', 25000, 240000, ['Custom SSL upload', 'PCI DSS compliance', 'Priority routing']),
  ], ['cdn', 'dns', 'security', 'waf', 'workers']),

  prod('1password', '1Password', 'AgileBits Inc.', 'Encrypted enterprise password manager and secrets vault.', 'Cloud & Security', '1password', [
    plan('1password-individual', 'Individual', 299, 3588, ['Unlimited devices', '1GB document storage', 'Watchtower security']),
    plan('1password-families', 'Families', 499, 5988, ['Up to 5 family members', 'Shared vaults']),
    plan('1password-teams', 'Teams Starter', 1995, 23940, ['Up to 10 team members', 'Admin controls', 'Duo integration']),
    plan('1password-business', 'Business', 799, 9588, ['Custom roles', 'Activity logs', 'SAML SSO integration']),
  ], ['security', 'passwords', 'vault', 'credentials']),

  prod('midjourney', 'Midjourney', 'Midjourney Inc.', 'High quality generative AI image generation engine.', 'AI', 'midjourney', [
    plan('midjourney-basic', 'Basic Plan', 1000, 9600, ['3.3 hrs/mo fast GPU time (~200 gens)']),
    plan('midjourney-standard', 'Standard Plan', 3000, 28800, ['15 hrs/mo fast GPU time', 'Unlimited Relax GPU time']),
    plan('midjourney-pro', 'Pro Plan', 6000, 57600, ['30 hrs/mo fast GPU time', 'Stealth generation mode']),
    plan('midjourney-mega', 'Mega Plan', 12000, 115200, ['60 hrs/mo fast GPU time']),
  ], ['images', 'diffusion', 'generative ai', 'art']),

  prod('elevenlabs', 'ElevenLabs', 'ElevenLabs Inc.', 'Realistic generative AI voice synthesis, cloning, and dubbing.', 'AI', 'elevenlabs', [
    plan('elevenlabs-free', 'Free', 0, 0, ['10,000 characters/mo', 'Speech synthesis in 29 languages']),
    plan('elevenlabs-starter', 'Starter', 500, 5000, ['30,000 characters/mo', 'Instant voice cloning']),
    plan('elevenlabs-creator', 'Creator', 2200, 13200, ['100,000 characters/mo', 'Professional voice cloning', 'High quality 192kbps']),
    plan('elevenlabs-pro', 'Pro', 9900, 106800, ['500,000 characters/mo', 'Commercial rights', 'Usage analytics']),
  ], ['voice', 'tts', 'audio', 'voice clone']),

  prod('deepseek', 'DeepSeek', 'DeepSeek AI', 'State-of-the-art open reasoning and coding models at radical low costs.', 'AI', 'deepseek', [
    plan('deepseek-chat', 'DeepSeek-V3 API', 200, 2400, ['Input: $0.14/M tokens', 'Output: $0.28/M tokens']),
    plan('deepseek-reasoner', 'DeepSeek-R1 Reasoning', 550, 6600, ['Input: $0.55/M tokens', 'Output: $2.19/M tokens']),
    plan('deepseek-pro-sub', 'DeepSeek Pro Compute', 1500, 18000, ['Dedicated API rate limits', 'Priority concurrency']),
  ], ['r1', 'v3', 'reasoning', 'open source llm']),

  prod('posthog', 'PostHog', 'PostHog Inc.', 'Product analytics, session replay, feature flags, A/B testing and surveys.', 'Analytics & Data', 'posthog', [
    plan('posthog-free', 'Free Open Cloud', 0, 0, ['1M events/mo free', '5,000 session replays']),
    plan('posthog-boost', 'Teams / Pro', 4500, 54000, ['Volume tiered pricing', 'Group analytics', 'Custom destinations']),
    plan('posthog-enterprise', 'Enterprise', 45000, 540000, ['SAML SSO', 'Dedicated instance', 'Bespoke contracts']),
  ], ['analytics', 'product telemetry', 'session replay', 'feature flags']),

  prod('airtable', 'Airtable', 'Formagrid Inc.', 'Relational low-code database and application builder for connected workflows.', 'Productivity', 'airtable', [
    plan('airtable-free', 'Free', 0, 0, ['Unlimited bases', '1,000 records per base']),
    plan('airtable-team', 'Team', 2000, 24000, ['50,000 records per base', '20GB attachments', 'Extensions']),
    plan('airtable-business', 'Business', 4500, 54000, ['125,000 records per base', 'SAML SSO', 'Timeline view']),
  ], ['database', 'spreadsheet', 'lowcode', 'crm']),

  prod('zapier', 'Zapier', 'Zapier Inc.', 'Workflow automation platform connecting 6,000+ business apps without code.', 'Productivity', 'zapier', [
    plan('zapier-free', 'Free', 0, 0, ['100 tasks/mo', '5 single-step Zaps']),
    plan('zapier-starter', 'Starter', 1999, 23988, ['750 tasks/mo', 'Multi-step Zaps', '3 premium apps']),
    plan('zapier-professional', 'Professional', 4900, 58800, ['2,000 tasks/mo', 'Custom logic', 'Webhooks', 'Autoreplay']),
  ], ['automation', 'integrations', 'nocode', 'webhooks']),

  prod('resend', 'Resend', 'Resend Inc.', 'Modern developer-first transactional email API built with React Email.', 'Communication', 'resend', [
    plan('resend-free', 'Free', 0, 0, ['3,000 emails/mo', '100 emails/day limit', '1 domain']),
    plan('resend-pro', 'Pro', 2000, 24000, ['50,000 emails/mo', 'Dedicated IP available', 'Unlimited domains']),
    plan('resend-scale', 'Scale', 10000, 120000, ['250,000 emails/mo', 'Priority delivery', 'SLA']),
  ], ['email api', 'transactional', 'react email', 'sendgrid alternative']),

  prod('docker', 'Docker', 'Docker Inc.', 'Containerization platform and desktop engine for building, running and sharing applications.', 'Development', 'docker', [
    plan('docker-personal', 'Personal', 0, 0, ['Free for individuals and small businesses', 'Docker Desktop']),
    plan('docker-pro', 'Pro', 500, 6000, ['Unlimited private repos', '5,000 Docker Hub pulls/day']),
    plan('docker-team', 'Team', 900, 10800, ['Role-based access', 'Audit logs', 'Standard support']),
    plan('docker-business', 'Business', 2400, 28800, ['Hardened desktop', 'SSO', 'Image access management']),
  ], ['containers', 'devops', 'kubernetes', 'hub']),

  prod('raycast', 'Raycast', 'Raycast Technologies', 'Extensible keyboard launcher for Mac with AI extensions and quick scripts.', 'Productivity', 'raycast', [
    plan('raycast-free', 'Free', 0, 0, ['Core launcher', '1,000+ extensions', 'Custom window management']),
    plan('raycast-pro', 'Pro with AI', 800, 9600, ['Raycast AI with GPT-4o & Claude 3.5', 'Cloud sync', 'Custom themes']),
    plan('raycast-team', 'Team Pro', 1200, 14400, ['Shared snippets & quicklinks', 'Team AI prompts']),
  ], ['mac', 'launcher', 'spotlight alternative', 'shortcuts']),
]

/**
 * Transforms OpenRouter models into rich StackSum products with realistic subscription equivalents
 */
export function convertOpenRouterModelToProduct(model: any): Product {
  const promptPricePerMillion = parseFloat(String(model.pricing?.prompt || '0')) * 1000000
  const completionPricePerMillion = parseFloat(String(model.pricing?.completion || '0')) * 1000000
  
  // Calculate reasonable developer monthly subscription equivalent
  const avgTokenRatePerMil = (promptPricePerMillion + completionPricePerMillion * 2) / 3
  let starterPriceCents = Math.max(0, Math.round(avgTokenRatePerMil * 50)) // 500k tokens
  let proPriceCents = Math.max(1000, Math.round(avgTokenRatePerMil * 300)) // 3M tokens
  let teamPriceCents = Math.max(3000, Math.round(avgTokenRatePerMil * 1500)) // 15M tokens

  if (promptPricePerMillion === 0 && completionPricePerMillion === 0) {
    starterPriceCents = 0
    proPriceCents = 0
    teamPriceCents = 0
  }

  const cleanName = model.name || model.id.split('/').pop() || model.id
  const provider = model.id.includes('/') ? model.id.split('/')[0] : 'AI'
  const isFree = promptPricePerMillion === 0 && completionPricePerMillion === 0

  return {
    id: `model-${model.id.replace(/[^a-zA-Z0-9-]/g, '-')}`,
    name: cleanName,
    slug: `model-${model.id.replace(/[^a-zA-Z0-9-]/g, '-')}`,
    companyName: provider.charAt(0).toUpperCase() + provider.slice(1),
    description: model.description || `High performance AI model with ${model.context_length ? (model.context_length / 1000).toFixed(0) + 'k' : 'standard'} context window.`,
    category: 'AI',
    logo: `https://cdn.simpleicons.org/${provider.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    websiteUrl: `https://openrouter.ai/models/${model.id}`,
    pricingUrl: `https://openrouter.ai/models/${model.id}`,
    source: 'OpenRouter Model API',
    lastVerifiedAt: '2026-09-21',
    isLiveModel: true,
    tags: ['ai', 'model', 'llm', provider.toLowerCase(), model.id.toLowerCase()],
    plans: isFree
      ? [
          plan(`free-${model.id}`, 'Free Public Tier', 0, 0, ['Community rate limits', `${model.context_length || '32k'} context`]),
          plan(`supporter-${model.id}`, 'Supporter Tier', 1000, 12000, ['Higher rate limits', 'Zero downtime SLA']),
        ]
      : [
          plan(`starter-${model.id}`, 'Standard Usage', starterPriceCents, starterPriceCents * 12, [`$${promptPricePerMillion.toFixed(2)}/M in, $${completionPricePerMillion.toFixed(2)}/M out`]),
          plan(`pro-${model.id}`, 'Pro Developer', proPriceCents, proPriceCents * 12, ['High throughput access', `${model.context_length ? (model.context_length / 1000).toFixed(0) + 'k' : '32k'} context`]),
          plan(`team-${model.id}`, 'Team Scale', teamPriceCents, teamPriceCents * 12, ['Dedicated concurrent streams', 'Priority routing']),
        ],
  }
}

/**
 * Returns complete combined catalog (Static SaaS + Live Models if available)
 */
export function getAllProducts(liveModels: any[] = []): Product[] {
  if (!liveModels || liveModels.length === 0) {
    return staticProducts
  }
  const dynamicProducts = liveModels.map(convertOpenRouterModelToProduct)
  // Deduplicate by name/id
  const seen = new Set<string>()
  const result: Product[] = []
  
  for (const item of staticProducts) {
    seen.add(item.id.toLowerCase())
    result.push(item)
  }
  for (const item of dynamicProducts) {
    if (!seen.has(item.id.toLowerCase())) {
      seen.add(item.id.toLowerCase())
      result.push(item)
    }
  }
  return result
}

export const products = staticProducts
