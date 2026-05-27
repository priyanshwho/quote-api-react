import { Heart, MoonStar, Search, SunMedium } from 'lucide-react'

interface NavbarProps {
  search: string
  onSearchChange: (value: string) => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  favoritesCount: number
  quoteCount: number
}

const Navbar = ({ search, onSearchChange, theme, onThemeToggle, favoritesCount, quoteCount }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:var(--surface)/0.82] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">QuoteCanvas</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">A calm quote journal</h1>
          </div>

          <button
            type="button"
            onClick={onThemeToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] shadow-[0_12px_32px_rgba(100,123,155,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)] lg:hidden"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 lg:max-w-3xl lg:flex-row lg:items-center lg:justify-end">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by author, keyword, or tag"
              className="h-12 w-full rounded-full border border-[var(--line)] bg-[var(--panel)] pl-11 pr-4 text-sm text-[var(--text)] outline-none transition duration-300 placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:bg-[var(--panel-strong)]"
            />
          </label>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--muted)] lg:flex">
              <Heart size={14} className="text-[var(--accent)]" />
              <span>{favoritesCount} saved</span>
              <span className="text-[var(--line-strong)]">•</span>
              <span>{quoteCount} quotes</span>
            </div>

            <button
              type="button"
              onClick={onThemeToggle}
              className="hidden h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 text-sm font-medium text-[var(--text)] shadow-[0_12px_32px_rgba(100,123,155,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)] lg:inline-flex"
            >
              {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar