import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getTeacherClassStores, getStoreSummary } from '@/client/apis/stores'
import { getApiErrorMessage } from '@/lib/utils'
import { TeacherEndedRow } from './TeacherEndedRow'
import { TeacherInProgressLine } from './TeacherInProgressLine'
import { TeacherStoreSummaryStub } from './TeacherStoreSummaryStub'

function formatStoreId(storeId: number | null) {
  return storeId != null ? `Store #${storeId}` : 'Unknown store'
}

function getCleanedName(value: string | null, fallback: string) {
  if (value == null) return fallback

  const cleaned = value.trim()
  return cleaned.length > 0 ? cleaned : fallback
}

export default function TeacherDashboard() {
  const [searchParams] = useSearchParams()
  const classCode = searchParams.get('classCode')?.trim() ?? ''

  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null)
  const endedListRef = useRef<HTMLDivElement>(null)
  const endedListScrollTopRef = useRef(0)

  const clearDetailSelection = () => {
    setSelectedStoreId(null)
    requestAnimationFrame(() => {
      const el = endedListRef.current
      if (el) el.scrollTop = endedListScrollTopRef.current
    })
  }

  const {
    data: classStores,
    isPending: isClassStoresPending,
    isError: isClassStoresError,
    error: classStoresError,
  } = useQuery({
    queryKey: ['teacherClassStores', classCode],
    queryFn: () => getTeacherClassStores(classCode),
    enabled: classCode.length > 0,
  })

  const endedStores = (classStores ?? []).filter(
    (store) => store.endedAt != null,
  )
  const inProgressStores = (classStores ?? []).filter(
    (store) => store.endedAt == null,
  )

  const selectedEndedStore =
    selectedStoreId != null
      ? (endedStores.find((store) => store.storeId === selectedStoreId) ?? null)
      : null

  const {
    data: selectedStoreSummary,
    isPending: isSelectedSummaryPending,
    isError: isSelectedSummaryError,
  } = useQuery({
    queryKey: ['storeSummary', selectedEndedStore?.storeId],
    queryFn: () => getStoreSummary(selectedEndedStore!.storeId),
    enabled: selectedEndedStore != null,
  })

  const classStoresErrorMessage = getApiErrorMessage(
    classStoresError,
    'Class stores could not be loaded.',
  )

  return (
    <div className="relative min-h-[calc(100vh-6rem)] px-4 pb-52 pt-6 sm:pb-48 md:pb-44">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-xl font-bold text-moe-cream md:text-2xl">
          Class overview
        </h1>
        {classCode ? (
          <p className="mb-6 text-sm text-moe-cream/80">
            Class code: {classCode}
          </p>
        ) : (
          <p className="mb-6 text-sm text-moe-cream/80">
            Enter a class code on the teacher dashboard screen to load class
            stores.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem),minmax(0,1fr)] lg:items-start lg:gap-10">
          <section aria-labelledby="ended-heading" className="min-w-0 lg:sticky lg:top-4 lg:self-start">
            <h2
              id="ended-heading"
              className="mb-3 text-sm font-bold uppercase tracking-wide text-moe-cream"
            >
              Ended
            </h2>
            <div
              ref={endedListRef}
              onScroll={(event) => {
                endedListScrollTopRef.current = event.currentTarget.scrollTop
              }}
              className="max-h-[min(40vh,22rem)] overflow-y-auto overscroll-y-contain rounded-xl border border-moe-cream/25 bg-moe-cream/5 lg:max-h-[calc(100vh-11rem)]"
            >
              {!classCode ? (
                <div className="px-4 py-6 text-sm text-moe-cream/80">
                  No class code selected.
                </div>
              ) : isClassStoresPending ? (
                <div className="px-4 py-6 text-sm text-moe-cream/80">
                  Loading ended stores...
                </div>
              ) : isClassStoresError ? (
                <div className="px-4 py-6 text-sm text-moe-cream/80">
                  {classStoresErrorMessage}
                </div>
              ) : endedStores.length === 0 ? (
                <div className="px-4 py-6 text-sm text-moe-cream/80">
                  No ended stores yet.
                </div>
              ) : (
                endedStores.map((store) => (
                  <TeacherEndedRow
                    key={store.storeId}
                    storeId={formatStoreId(store.storeId)}
                    studentName={getCleanedName(
                      store.studentName,
                      'Unknown student',
                    )}
                    isSelected={selectedStoreId === store.storeId}
                    onOpenDetail={() => setSelectedStoreId(store.storeId)}
                  />
                ))
              )}
            </div>
          </section>

          <section
            aria-labelledby="detail-heading"
            className="flex min-w-0 min-h-0 flex-col lg:min-h-[calc(100vh-11rem)]"
          >
            <h2
              id="detail-heading"
              className="mb-3 text-sm font-bold uppercase tracking-wide text-moe-cream"
            >
              Detail
            </h2>
            {!classCode ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Enter a class code to load store details.
              </div>
            ) : isClassStoresPending ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Loading class data...
              </div>
            ) : isClassStoresError ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                {classStoresErrorMessage}
              </div>
            ) : selectedEndedStore == null ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Select an ended store to view the summary.
              </div>
            ) : isSelectedSummaryPending ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Loading store summary...
              </div>
            ) : isSelectedSummaryError || selectedStoreSummary == null ? (
              <div className="rounded-xl border border-moe-cream/25 bg-moe-cream/5 px-4 py-10 text-center text-moe-cream/80">
                Store summary could not be loaded.
              </div>
            ) : (
              <div className="flex min-h-[14rem] flex-1 flex-col lg:min-h-0">
                <TeacherStoreSummaryStub
                  onBack={clearDetailSelection}
                  storeIdLabel={formatStoreId(selectedEndedStore.storeId)}
                  studentName={getCleanedName(
                    selectedEndedStore.studentName,
                    'Unknown student',
                  )}
                  storeSummary={selectedStoreSummary}
                />
              </div>
            )}
          </section>
        </div>
      </div>

      <aside
        className="fixed bottom-3 left-3 z-30 w-[min(100%-1.5rem,17.5rem)] rounded-lg border border-moe-slate/70 bg-moe-cream/95 p-3 shadow-md backdrop-blur-sm"
        aria-labelledby="in-progress-heading"
      >
        <h2
          id="in-progress-heading"
          className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-moe-slate/90"
        >
          In progress
        </h2>
        <div className="max-h-40 overflow-y-auto overscroll-y-contain pr-0.5 text-sm">
          {!classCode ? (
            <p className="py-2 text-sm text-moe-slate/80">
              No class code selected.
            </p>
          ) : isClassStoresPending ? (
            <p className="py-2 text-sm text-moe-slate/80">
              Loading in-progress stores...
            </p>
          ) : isClassStoresError ? (
            <p className="py-2 text-sm text-moe-slate/80">
              {classStoresErrorMessage}
            </p>
          ) : inProgressStores.length === 0 ? (
            <p className="py-2 text-sm text-moe-slate/80">
              No in-progress stores.
            </p>
          ) : (
            inProgressStores.map((store) => (
              <TeacherInProgressLine
                key={store.storeId}
                storeId={formatStoreId(store.storeId)}
                storeName={getCleanedName(store.storeName, 'Unknown store')}
              />
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
