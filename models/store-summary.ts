export interface StoreStockSummary {
  productId: number
  productName: string
  quantity: number
  retailCents: number | null
}

export interface StoreSummary {
  store: {
    id: number
    categoryId: number
    participantId: number
    startedAt: string
    endedAt: string | null
    totalRevenueCents: number
    totalCostCents: number
    profitCents: number
  }
  stock: StoreStockSummary[]
  totalRevenueCents: number
  totalCostCents: number
  profitCents: number
}
