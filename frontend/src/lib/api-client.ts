export type OpenRouterModel = {
  id: string
  name: string
  created?: number
  description?: string
  context_length?: number
  architecture?: {
    modality?: string
    tokenizer?: string
    instruct_type?: string | null
  }
  pricing?: {
    prompt?: string | number
    completion?: string | number
    image?: string | number
    request?: string | number
  }
  top_provider?: {
    context_length?: number
    max_completion_tokens?: number
    is_moderated?: boolean
  }
}

export type TechNewsArticle = {
  id: string
  title: string
  description?: string
  url: string
  publishedAt: string
  author?: string
  authorImage?: string
  tags?: string[]
  coverImage?: string | null
  source: 'HackerNews' | 'Dev.to' | 'OpenAI' | 'Anthropic'
}

/**
 * Fetch public AI models from OpenRouter (280+ models with real pricing)
 */
export async function fetchOpenRouterModels(): Promise<OpenRouterModel[]> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Accept': 'application/json',
      },
    })
    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`)
    const data = await res.json()
    return Array.isArray(data?.data) ? data.data : []
  } catch (error) {
    console.warn('Failed to fetch OpenRouter models:', error)
    return []
  }
}

/**
 * Fetch top tech articles from Dev.to API (free, no key required)
 */
export async function fetchDevToNews(tag = 'ai', perPage = 12): Promise<TechNewsArticle[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=${perPage}&top=7`, {
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) throw new Error(`Dev.to API error: ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map((item: any) => ({
      id: `devto-${item.id}`,
      title: item.title,
      description: item.description,
      url: item.url,
      publishedAt: item.published_at || new Date().toISOString(),
      author: item.user?.name || item.user?.username,
      authorImage: item.user?.profile_image,
      tags: Array.isArray(item.tag_list) ? item.tag_list : [],
      coverImage: item.cover_image || item.social_image,
      source: 'Dev.to' as const,
    }))
  } catch (error) {
    console.warn('Failed to fetch Dev.to news:', error)
    return []
  }
}

/**
 * Fetch top tech stories from Hacker News API (free, no key required)
 */
export async function fetchHackerNewsTopStories(limit = 10): Promise<TechNewsArticle[]> {
  try {
    const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    if (!topRes.ok) return []
    const ids: number[] = await topRes.json()
    const slice = ids.slice(0, limit)
    
    const stories = await Promise.all(
      slice.map(async (id) => {
        try {
          const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          if (!itemRes.ok) return null
          const item = await itemRes.json()
          if (!item || !item.title) return null
          const article: TechNewsArticle = {
            id: `hn-${item.id}`,
            title: item.title,
            description: item.text ? item.text.slice(0, 160) : `Discussion with ${item.score || 0} points and ${item.descendants || 0} comments.`,
            url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
            publishedAt: new Date((item.time || Date.now() / 1000) * 1000).toISOString(),
            author: item.by || 'HN Community',
            tags: ['tech', 'hackernews', 'discussion'],
            coverImage: null,
            source: 'HackerNews' as const,
          }
          return article
        } catch {
          return null
        }
      })
    )
    return stories.filter((s): s is TechNewsArticle => s !== null)
  } catch (error) {
    console.warn('Failed to fetch Hacker News stories:', error)
    return []
  }
}
