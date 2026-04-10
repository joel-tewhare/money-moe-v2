type Props = {
  storeIdPlaceholder: string
  studentNamePlaceholder: string
  onOpenDetail: () => void
}

export function TeacherEndedRow({
  storeIdPlaceholder,
  studentNamePlaceholder,
  onOpenDetail,
}: Props) {
  return (
    <button
      type="button"
      onClick={onOpenDetail}
      className="flex w-full items-center justify-between gap-4 border-b border-moe-cream/30 px-4 py-4 text-left transition-colors hover:bg-moe-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moe-cream"
    >
      <span className="font-mono text-sm tabular-nums text-moe-cream/90">
        {storeIdPlaceholder}
      </span>
      <span className="min-w-0 flex-1 truncate text-base font-medium text-moe-cream">
        {studentNamePlaceholder}
      </span>
    </button>
  )
}
