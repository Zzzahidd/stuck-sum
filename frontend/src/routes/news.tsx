import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import { fetchDevToNews, fetchHackerNewsTopStories } from '../lib/api-client'
import type { TechNewsArticle } from '../lib/api-client'

export const Route = createFileRoute('/news')({
  component: NewsPage,
})

export function NewsPage() {
  const [news, setNews] = useState<TechNewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'devtools' | 'hackernews'>('all')

  const loadNews = async () => {
    setLoading(true)
    try {
      const [devtoAi, devtoTools, hn] = await Promise.all([
        fetchDevToNews('ai', 8),
        fetchDevToNews('saas', 8),
        fetchHackerNewsTopStories(8),
      ])

      const combined = [...devtoAi, ...devtoTools, ...hn]
      // Sort by publish date descending
      combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      setNews(combined)
    } catch (err) {
      console.warn('Failed to load tech news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const filteredNews = news.filter((item) => {
    if (activeTab === 'all') return true
    if (activeTab === 'hackernews') return item.source === 'HackerNews'
    if (activeTab === 'ai') return item.tags?.includes('ai') || item.title.toLowerCase().includes('ai')
    if (activeTab === 'devtools') return item.tags?.includes('saas') || item.tags?.includes('development')
    return true
  })

  return (
    <main className="max-w-[1400px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Tech News & Model Releases
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mt-2">
            Real-time updates, releases, and discussions across AI models, developer tools, and SaaS ecosystems.
          </p>
        </div>

        <button
          type="button"
          className="btn-secondary !w-auto !px-4 !h-10 text-sm"
          onClick={loadNews}
          disabled={loading}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh Feed
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pb-6 border-b border-[var(--color-border-default)] mb-8 overflow-x-auto scrollbar-none">
        <button
          type="button"
          className={`filter-pill ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Updates
        </button>
        <button
          type="button"
          className={`filter-pill ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          AI & LLM News
        </button>
        <button
          type="button"
          className={`filter-pill ${activeTab === 'devtools' ? 'active' : ''}`}
          onClick={() => setActiveTab('devtools')}
        >
          SaaS & Dev Tools
        </button>
        <button
          type="button"
          className={`filter-pill ${activeTab === 'hackernews' ? 'active' : ''}`}
          onClick={() => setActiveTab('hackernews')}
        >
          Hacker News Top
        </button>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <RefreshCw size={32} className="mx-auto text-[var(--color-brand-primary)] animate-spin mb-4" />
          <p className="text-[var(--color-text-secondary)]">Fetching latest stories from Hacker News & Dev.to...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="p-6 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="category-badge">
                    {article.source}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {new Date(article.publishedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {article.coverImage && (
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-[var(--color-surface-control)]">
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <h2 className="text-lg font-bold text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors mb-2 line-clamp-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>

                {article.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4">
                    {article.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between mt-4">
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  {article.author ? `by ${article.author}` : 'Community'}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-primary)] hover:underline"
                >
                  Read Story <ExternalLink size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
