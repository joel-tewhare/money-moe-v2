export interface StoreStockSummary {
  productId: number
  productName: string
  quantity: number
  retailCents: number | null
}
export interface StoreSummaryBestseller {
  productId: number
  productName: string
  quantitySold: number
  revenueCents: number
}
export interface StoreSummaryTopEarner {
  productId: number
  productName: string
  profitCents: number
  quantitySold: number
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
  bestseller: StoreSummaryBestseller | null
  topEarner: StoreSummaryTopEarner | null
}
