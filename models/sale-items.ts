export interface SaleItem {
  id: number
  saleId: number
  productId: number
  quantity: number
  retailCents: number
  costCents: number
  lineTotalCents: number
  createdAt: string
  updatedAt: string
}

export interface CreateSaleItemRequest {
  saleId: number
  productId: number
  quantity: number
}
