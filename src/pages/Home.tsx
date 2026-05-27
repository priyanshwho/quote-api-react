import { AnimatePresence, motion } from 'framer-motion'
import { BookOpenText, Quote as QuoteIcon, RefreshCcw, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import ActionButtons from '../components/ActionButtons'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import QuoteCard from '../components/QuoteCard'
import TextRotate from '../components/TextRotate'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useQuotes } from '../hooks/useQuotes'
import { useTheme } from '../hooks/useTheme'
import type { Quote } from '../types'
import { buildShareText, getDailyQuote, getRandomQuote, matchesQuote } from '../utils/quotes'

const FAVORITES_KEY = 'quotecanvas-favorites'
const HISTORY_KEY = 'quotecanvas-history'
const ROTATING_WORDS = ['calm typography', 'soft blues', 'handcrafted layouts', 'slow inspiration']

const Home = () => {
  const { quotes, loading, error, refresh } = useQuotes()
  const { theme, toggleTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [currentQuoteId, setCurrentQuoteId] = useState<number | null>(null)
  const [copyLabel, setCopyLabel] = useState('Copy')
  const [favorites, setFavorites] = useLocalStorage<number[]>(FAVORITES_KEY, [])
  const [history, setHistory] = useLocalStorage<number[]>(HISTORY_KEY, [])

  const filteredQuotes = quotes.filter((quote) => matchesQuote(quote, search))

  const currentQuote = filteredQuotes.find((quote) => quote.id === currentQuoteId) ?? quotes.find((quote) => quote.id === currentQuoteId) ?? filteredQuotes[0] ?? quotes[0] ?? null
  const dailyQuote = getDailyQuote(quotes)
  const favoriteQuotes = quotes.filter((quote) => favorites.includes(quote.id))
  const historyQuotes = history
    .map((quoteId) => quotes.find((quote) => quote.id === quoteId))
    .filter((quote): quote is Quote => Boolean(quote))
    .slice(0, 6)

  useEffect(() => {
    if (quotes.length > 0 && currentQuoteId === null) {
      const startingQuote = getRandomQuote(quotes)

      if (startingQuote) {
        setCurrentQuoteId(startingQuote.id)
      }
    }
  }, [currentQuoteId, quotes])

  useEffect(() => {
    if (!currentQuote) {
      return
    }

    setHistory((existingHistory) => {
      const updatedHistory = [currentQuote.id, ...existingHistory.filter((quoteId) => quoteId !== currentQuote.id)]

      return updatedHistory.slice(0, 8)
    })
  }, [currentQuote, setHistory])

  useEffect(() => {
    setCopyLabel('Copy')
  }, [currentQuoteId])

  const currentIsFavorite = Boolean(currentQuote && favorites.includes(currentQuote.id))

  const generateAnotherQuote = () => {
    const quotePool = filteredQuotes.length > 0 ? filteredQuotes : quotes
    const nextQuote = getRandomQuote(quotePool, currentQuote?.id)

    if (nextQuote) {
      setCurrentQuoteId(nextQuote.id)
    }
  }

  const toggleFavorite = (quote: Quote) => {
    setFavorites((existingFavorites) =>
      existingFavorites.includes(quote.id)
        ? existingFavorites.filter((favoriteId) => favoriteId !== quote.id)
        : [quote.id, ...existingFavorites],
    )
  }

  const handleSelectQuote = (quote: Quote) => {
    setCurrentQuoteId(quote.id)
  }

  const handleCopy = async () => {
    if (!currentQuote) {
      return
    }

    await window.navigator.clipboard.writeText(`"${currentQuote.content}" — ${currentQuote.author}`)
    setCopyLabel('Copied')
  }

  const handleShare = async () => {
    if (!currentQuote) {
      return
    }

    const sharePayload = {
      title: 'QuoteCanvas',
      text: buildShareText(currentQuote),
    }

    if (navigator.share) {
      await navigator.share(sharePayload)
      return
    }

    await window.navigator.clipboard.writeText(sharePayload.text)
    setCopyLabel('Copied')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onThemeToggle={toggleTheme}
        favoritesCount={favorites.length}
        quoteCount={quotes.length}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,var(--surface)_0%,var(--panel)_100%)] px-5 py-6 shadow-[0_30px_90px_rgba(100,123,155,0.10)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,208,236,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(210,224,239,0.36),transparent_38%)] opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_50%)]" />

          <div className="relative space-y-8">
            <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color:var(--surface)/0.8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)] shadow-[0_14px_40px_rgba(100,123,155,0.08)]">
                  <Sparkles size={14} className="text-[var(--accent)]" />
                  Editorial inspiration board
                </div>

                <div className="max-w-3xl space-y-4">
                  <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-5xl lg:text-6xl">
                    Quotes that feel like a quiet page in a handwritten journal.
                  </h2>
                  <p className="max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
                    Search by author or idea, rotate through the collection, and save the lines that deserve to stay close.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface)/0.75] p-5 shadow-[0_22px_60px_rgba(100,123,155,0.10)] backdrop-blur-md sm:p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Daily quote</p>
                <div className="mt-4 space-y-4">
                  <p className="font-[var(--font-serif)] text-2xl leading-9 tracking-[-0.02em] text-[var(--quote)] sm:text-3xl">
                    {dailyQuote ? `“${dailyQuote.content}”` : 'Loading a fresh line for the day.'}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{dailyQuote?.author ?? 'QuoteCanvas'}</p>
                      <p className="text-sm text-[var(--muted)]">A fixed daily anchor from the collection.</p>
                    </div>
                    <QuoteIcon className="text-[var(--accent)]" size={22} />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <TextRotate words={ROTATING_WORDS} />
              <span>Curated from the freeapi collection.</span>
            </div>

            {loading ? <Loader /> : null}

            {!loading && error ? (
              <div className="rounded-[1.75rem] border border-[color:var(--danger)/0.24] bg-[color:var(--danger-soft)/0.5] p-6 text-[var(--text)]">
                <p className="text-lg font-semibold">We could not load the quotes right now.</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    void refresh()
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--surface)]"
                >
                  <RefreshCcw size={15} />
                  Try again
                </button>
              </div>
            ) : null}

            {!loading && !error && currentQuote ? (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuote.id}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <QuoteCard
                      quote={currentQuote}
                      isFavorite={currentIsFavorite}
                      onFavoriteToggle={toggleFavorite}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="space-y-4 rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface)/0.75] p-5 shadow-[0_18px_60px_rgba(100,123,155,0.08)] backdrop-blur-md">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Actions</p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">Move through the journal</p>
                  </div>

                  <ActionButtons
                    isFavorite={currentIsFavorite}
                    onGenerate={generateAnotherQuote}
                    onCopy={() => {
                      void handleCopy()
                    }}
                    onShare={() => {
                      void handleShare()
                    }}
                    onFavoriteToggle={() => {
                      if (currentQuote) {
                        toggleFavorite(currentQuote)
                      }
                    }}
                    copyLabel={copyLabel}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Favorites</p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">{favorites.length}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">Saved passages stored locally.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">History</p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">{historyQuotes.length}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">Recently visited quotes.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {!loading && !error ? (
          <>
            <section className="mt-8 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Library</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">Quotes that match your search</h3>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  {filteredQuotes.length} result{filteredQuotes.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredQuotes.slice(0, 9).map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    compact
                    onSelect={handleSelectQuote}
                    isFavorite={favorites.includes(quote.id)}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface)/0.72] p-5 shadow-[0_18px_60px_rgba(100,123,155,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <BookOpenText size={16} />
                  <p className="text-xs uppercase tracking-[0.3em]">Favorites</p>
                </div>
                <div className="mt-4 space-y-3">
                  {favoriteQuotes.length > 0 ? (
                    favoriteQuotes.slice(0, 4).map((quote) => (
                      <button
                        key={quote.id}
                        type="button"
                        onClick={() => handleSelectQuote(quote)}
                        className="w-full rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel)] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]"
                      >
                        <p className="font-[var(--font-serif)] text-lg leading-8 text-[var(--quote)]">“{quote.content}”</p>
                        <p className="mt-3 text-sm font-medium text-[var(--text)]">{quote.author}</p>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-[1.4rem] border border-dashed border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]">
                      No favorites yet. Save a quote to build your board.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface)/0.72] p-5 shadow-[0_18px_60px_rgba(100,123,155,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <RefreshCcw size={16} />
                  <p className="text-xs uppercase tracking-[0.3em]">History</p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {historyQuotes.length > 0 ? (
                    historyQuotes.map((quote) => (
                      <button
                        key={quote.id}
                        type="button"
                        onClick={() => handleSelectQuote(quote)}
                        className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel)] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]"
                      >
                        <p className="text-sm font-medium text-[var(--text)]">{quote.author}</p>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                          {quote.content.length > 120 ? `${quote.content.slice(0, 120)}...` : quote.content}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-[1.4rem] border border-dashed border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)] sm:col-span-2">
                      Your recent quote trail will appear here.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  )
}

export default Home