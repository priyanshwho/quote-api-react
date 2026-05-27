import { motion } from 'framer-motion'
import { Heart, Quote as QuoteIcon } from 'lucide-react'

import type { Quote } from '../types'

interface QuoteCardProps {
  quote: Quote
  onSelect?: (quote: Quote) => void
  onFavoriteToggle?: (quote: Quote) => void
  isFavorite?: boolean
  compact?: boolean
}

const QuoteCard = ({ quote, onSelect, onFavoriteToggle, isFavorite = false, compact = false }: QuoteCardProps) => {
  const cardContent = (
    <article
      className={`group relative h-full overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] shadow-[0_24px_70px_rgba(100,123,155,0.12)] transition duration-300 ${compact ? 'p-5 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(100,123,155,0.15)]' : 'p-6 sm:p-8'}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,208,236,0.3),transparent_55%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color:var(--surface)/0.85] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            <QuoteIcon size={12} className="text-[var(--accent)]" />
            Featured quote
          </div>

          {onFavoriteToggle ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onFavoriteToggle(quote)
              }}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 ${isFavorite ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]' : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent-soft)] hover:text-[var(--text)]'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          ) : null}
        </div>

        <div className="relative mt-2">
          <p className={`${compact ? 'text-lg leading-8' : 'text-2xl leading-[1.6] sm:text-3xl sm:leading-[1.55]'} font-[var(--font-serif)] tracking-[-0.02em] text-[var(--quote)]`}>
            “{quote.content}”
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-[var(--line)] bg-[color:var(--surface)/0.85] px-4 py-2 text-sm font-medium text-[var(--text)]">
            {quote.author}
          </div>
          {quote.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--ink)]"
            >
              {tag}
            </span>
          ))}
          {quote.tags.length === 0 ? (
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--muted)]">
              Untagged
            </span>
          ) : null}
        </div>

        {!compact ? (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <span>Category: {quote.tags[0] ?? 'General inspiration'}</span>
            <span>Quote #{quote.id}</span>
          </div>
        ) : null}
      </div>
    </article>
  )

  if (!onSelect) {
    return cardContent
  }

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(quote)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(quote)
        }
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="text-left outline-none"
    >
      {cardContent}
    </motion.article>
  )
}

export default QuoteCard