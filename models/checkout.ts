import type { Sale } from './sales'
import type { SaleItem } from './sale-items'

export interface CheckoutItem {
  productId: number
  quantity: number
}

export interface CheckoutRequest {
  storeId: number
  items: CheckoutItem[]
}

export interface CheckoutResponse {
  sale: Sale
  items: SaleItem[]
}
