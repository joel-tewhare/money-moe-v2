import * as dbSaleItems from '../db/sale-items.js'
import * as dbSales from '../db/sales.js'
import * as dbStoreStock from '../db/store-stock.js'
import * as dbProducts from '../db/products.js'
import db from '../db/connection.js'

export async function createSaleItemWithStockDecrement(
  saleId: number,
  productId: number,
  quantity: number
) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0')
  }
  return db.transaction(async (trx) => {
    const storeId = await dbSales.getSaleStoreId(saleId, trx)
    if (!storeId) {
      throw new Error('Sale not found')
    }
    const available = await dbStoreStock.getStockQuantity(storeId, productId, trx)
    if (available < quantity) {
      throw new Error('Insufficient stock')
    }
    const product = await dbProducts.getProductById(productId, trx)
    if (!product) {
      throw new Error('Product not found')
    }
    const retailCents = product.retailCents
    const costCents = product.costCents
    const lineTotalCents = retailCents * quantity
    const saleItem = await dbSaleItems.createSaleItem(
      saleId,
      productId,
      quantity,
      retailCents,
      costCents,
      lineTotalCents,
      trx
    )
    await dbStoreStock.decrementStock(storeId, productId, quantity, trx)
    return saleItem
  })
}
