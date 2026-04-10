type Props = {
  storeIdPlaceholder: string
  storeNamePlaceholder: string
}

export function TeacherInProgressLine({
  storeIdPlaceholder,
  storeNamePlaceholder,
}: Props) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-moe-slate/40 py-2 text-sm last:border-b-0">
      <span className="shrink-0 font-mono tabular-nums text-moe-slate/80">
        {storeIdPlaceholder}
      </span>
      <span className="min-w-0 truncate text-moe-slate">{storeNamePlaceholder}</span>
    </div>
  )
}
