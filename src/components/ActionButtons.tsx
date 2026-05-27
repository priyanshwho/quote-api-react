import { Check, Copy, Heart, Link2, RefreshCw } from 'lucide-react'

interface ActionButtonsProps {
  isFavorite: boolean
  onGenerate: () => void
  onCopy: () => void
  onShare: () => void
  onFavoriteToggle: () => void
  copyLabel: string
}

const ActionButtons = ({ isFavorite, onGenerate, onCopy, onShare, onFavoriteToggle, copyLabel }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--surface)] shadow-[0_18px_40px_rgba(80,95,110,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(80,95,110,0.28)]"
      >
        <RefreshCw size={16} />
        Generate Another Quote
      </button>

      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-5 py-3 text-sm font-medium text-[var(--text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]"
      >
        {copyLabel === 'Copied' ? <Check size={16} /> : <Copy size={16} />}
        {copyLabel}
      </button>

      <button
        type="button"
        onClick={onShare}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-5 py-3 text-sm font-medium text-[var(--text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]"
      >
        <Link2 size={16} />
        Share
      </button>

      <button
        type="button"
        onClick={onFavoriteToggle}
        className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${isFavorite ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]' : 'border-[var(--line)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]'}`}
      >
        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        {isFavorite ? 'Saved' : 'Save'}
      </button>
    </div>
  )
}

export default ActionButtons