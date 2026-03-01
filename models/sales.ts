export interface Sale {
  id: number
  storeId: number
  soldAt: string
  createdAt: string
  updatedAt: string
}

export interface CreateSaleRequest {
  storeId: number
}
