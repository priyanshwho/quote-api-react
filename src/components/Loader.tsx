const Loader = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_28px_80px_rgba(100,123,155,0.10)] sm:p-8">
        <div className="h-3 w-32 animate-pulse rounded-full bg-[var(--shimmer)]" />
        <div className="mt-8 space-y-4">
          <div className="h-6 w-full animate-pulse rounded-full bg-[var(--shimmer)]" />
          <div className="h-6 w-11/12 animate-pulse rounded-full bg-[var(--shimmer)]" />
          <div className="h-6 w-10/12 animate-pulse rounded-full bg-[var(--shimmer)]" />
          <div className="h-6 w-8/12 animate-pulse rounded-full bg-[var(--shimmer)]" />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-10 w-24 animate-pulse rounded-full bg-[var(--shimmer)]" />
          <div className="h-10 w-24 animate-pulse rounded-full bg-[var(--shimmer)]" />
          <div className="h-10 w-24 animate-pulse rounded-full bg-[var(--shimmer)]" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)]" />
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)]" />
      </div>
    </div>
  )
}

export default Loader