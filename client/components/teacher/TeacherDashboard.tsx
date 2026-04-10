import { useState } from 'react'
import { TeacherEndedRow } from './TeacherEndedRow'
import { TeacherInProgressLine } from './TeacherInProgressLine'
import { TeacherStoreSummaryStub } from './TeacherStoreSummaryStub'

const PLACEHOLDER_ENDED = [
  { key: 'e1', storeId: 'Store #101', student: 'Alex Student' },
  { key: 'e2', storeId: 'Store #102', student: 'Jamie Student' },
  { key: 'e3', storeId: 'Store #103', student: 'Sam Student' },
]

const PLACEHOLDER_IN_PROGRESS = [
  { key: 'p1', storeId: 'Store #201', storeName: 'Lemonade stand' },
  { key: 'p2', storeId: 'Store #202', storeName: 'Cookie booth' },
]

export default function TeacherDashboard() {
  const [selectedEndedKey, setSelectedEndedKey] = useState<string | null>(null)

  const selectedEndedRow =
    selectedEndedKey != null
      ? (PLACEHOLDER_ENDED.find((row) => row.key === selectedEndedKey) ?? null)
      : null

  return (
    <div className="relative min-h-[calc(100vh-6rem)] px-4 pb-56 pt-6 md:pb-48">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-bold text-moe-cream md:text-2xl">
          Class overview
        </h1>

        <div className="grid gap-8 lg:grid-cols-[22rem,1fr]">
          <section aria-labelledby="ended-heading" className="min-w-0">
            <h2
              id="ended-heading"
              className="mb-3 text-sm font-bold uppercase tracking-wide text-moe-cream"
            >
              Ended
            </h2>
            <div className="overflow-hidden rounded-xl border border-moe-cream/25 bg-moe-cream/5">
              {PLACEHOLDER_ENDED.map((row) => (
                <TeacherEndedRow
                  key={row.key}
                  storeIdPlaceholder={row.storeId}
                  studentNamePlaceholder={row.student}
                  onOpenDetail={() => setSelectedEndedKey(row.key)}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="detail-heading" className="min-w-0">
            <h2
              id="detail-heading"
              className="mb-3 text-sm font-bold uppercase tracking-wide text-moe-cream"
            >
              Detail
            </h2>
            {selectedEndedRow == null ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Select an ended store to view the summary preview.
              </div>
            ) : (
              <TeacherStoreSummaryStub
                onBack={() => setSelectedEndedKey(null)}
                storeIdPlaceholder={selectedEndedRow.storeId}
                studentNamePlaceholder={selectedEndedRow.student}
              />
            )}
          </section>
        </div>
      </div>

      <aside
        className="fixed bottom-4 left-4 z-30 w-[min(100%-2rem,20rem)] rounded-xl border-2 border-moe-slate bg-moe-cream p-4 shadow-lg"
        aria-labelledby="in-progress-heading"
      >
        <h2
          id="in-progress-heading"
          className="mb-2 text-xs font-bold uppercase tracking-wide text-moe-slate"
        >
          In progress
        </h2>
        <div className="max-h-48 overflow-y-auto pr-1">
          {PLACEHOLDER_IN_PROGRESS.map((line) => (
            <TeacherInProgressLine
              key={line.key}
              storeIdPlaceholder={line.storeId}
              storeNamePlaceholder={line.storeName}
            />
          ))}
        </div>
      </aside>
    </div>
  )
}
