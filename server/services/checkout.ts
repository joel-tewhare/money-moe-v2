import * as dbProducts from '../db/products.js'
import * as dbSaleItems from '../db/sale-items.js'
import * as dbSales from '../db/sales.js'
import * as dbStores from '../db/stores.js'
import * as dbStoreStock from '../db/store-stock.js'
import db from '../db/connection.js'
import { SaleItem } from '@/models/sale-items.js'

export async function processCheckout(
  storeId: number,
  items: Array<{ productId: number; quantity: number }>,
) {
  if (items.length === 0) {
    throw new Error('Checkout requires at least one item')
  }

  return db.transaction(async (trx) => {
    const store = await dbStores.getStoreById(storeId, trx)
    if (!store) {
      throw new Error('Store not found')
    }

    const sale = await dbSales.createSale(storeId, trx)
    const saleItems: SaleItem[] = []

    for (const { productId, quantity } of items) {
      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0')
      }

      const product = await dbProducts.getProductById(productId, trx)
      if (!product) {
        throw new Error('Product not found')
      }

      const available = await dbStoreStock.getStockQuantity(
        storeId,
        productId,
        trx,
      )
      if (available < quantity) {
        throw new Error('Insufficient stock')
      }

      const retailCents = await dbStoreStock.getStoreStockRetailCents(
        storeId,
        productId,
        trx,
      )
      if (retailCents == null) {
        throw new Error('Retail price not set for product')
      }

      const lineTotalCents = retailCents * quantity
      const saleItem = await dbSaleItems.createSaleItem(
        sale.id,
        productId,
        quantity,
        retailCents,
        product.costCents,
        lineTotalCents,
        trx,
      )
      saleItems.push(saleItem)

      await dbStoreStock.decrementStock(storeId, productId, quantity, trx)
    }

    return { sale, items: saleItems }
  })
}
