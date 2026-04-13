type Props = {
  storeId: string
  storeName: string
}

export function TeacherInProgressLine({ storeId, storeName }: Props) {
  return (
    <div
      className="flex cursor-default select-none items-baseline justify-between gap-3 border-b border-moe-slate/40 py-2 text-sm last:border-b-0"
      role="presentation"
    >
      <span className="shrink-0 font-mono tabular-nums text-moe-slate/80">
        {storeId}
      </span>
      <span className="min-w-0 flex-1 truncate text-moe-slate">{storeName}</span>
    </div>
  )
}
