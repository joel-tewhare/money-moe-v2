export interface Store {
  id: number
  categoryId: number
  participantId: number
  startedAt: string
  endedAt: string | null
  totalRevenueCents: number
  totalCostCents: number
  profitCents: number
  createdAt: string
  updatedAt: string
}

export interface CreateStoreRequest {
  categoryId: number
  participantId: number
}

export interface TeacherClassStore {
  storeId: number
  endedAt: string | null
  studentName: string | null
  storeName: string | null
}
