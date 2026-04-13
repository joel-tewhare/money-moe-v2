import { cn } from '@/lib/utils'

type Props = {
  storeId: string
  studentName: string
  isSelected: boolean
  onOpenDetail: () => void
}

export function TeacherEndedRow({
  storeId,
  studentName,
  isSelected,
  onOpenDetail,
}: Props) {
  return (
    <button
      type="button"
      onClick={onOpenDetail}
      aria-pressed={isSelected}
      className={cn(
        'flex w-full items-center justify-between gap-4 border-b border-moe-cream/30 px-4 py-3.5 text-left transition-colors last:border-b-0',
        'hover:bg-moe-cream/10 active:bg-moe-cream/15',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-moe-cream',
        isSelected &&
          'bg-moe-cream/15 ring-1 ring-inset ring-moe-cream/35 hover:bg-moe-cream/15',
      )}
    >
      <span className="shrink-0 font-mono text-sm tabular-nums text-moe-cream/90">
        {storeId}
      </span>
      <span className="min-w-0 flex-1 truncate text-base font-medium text-moe-cream">
        {studentName}
      </span>
    </button>
  )
}
